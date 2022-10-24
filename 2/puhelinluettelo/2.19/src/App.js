import { useState,useEffect} from 'react'
import phonebookservice from './services/phonebook'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const Filter=(props)=>(<div>filter shown with<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)

const PersonForm=(props)=>(<form onSubmit={props.addNote}>
  <div>name: <input value={props.newName} onChange={props.handleNewNameChange}/>   </div>  
  <div>number: <input value={props.newNumber} onChange={props.handleNewNumberChange}/>   </div>  
<button type="submit" >add</button>
</form>)

const Person=(props)=>(<div>{props.persons
  .filter(n=>n.name.toLowerCase().includes(props.newFilter.toLowerCase()))
  .map( n => <p key={n.id}> {n.name+" "+ n.number} <button type="button"onClick={()=>props.removePerson(n.id)}>delete</button></p>)}</div>)



const App = () => {

 
  useEffect(() => {
    phonebookservice
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
      
  }, [])


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber,setNewNumber]=useState('')

  const[newFilter,setNewFilter]=useState('')
  
  const [errorMessage, setErrorMessage] = useState(null)


  const handleNewFilterChange =(event)=>{
    setNewFilter(event.target.value)
  }

  const handleNewNumberChange=(event) =>{
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    console.log(persons)
    setNewName(event.target.value)  }


    const addNote = (event) => {
      event.preventDefault()
 
      if (persons.map(n=>n.name).includes(newName)){
        if (window.confirm(newName+" is already added to the phonebook, replace the old number with a new one?")){
          const newPerson=persons.find(n=>n.name==newName)
          newPerson.number=newNumber

              phonebookservice.update(newPerson.id,newPerson).
          then(n=>setErrorMessage(`changed ${newName} number to ${newNumber}`))
          setNewName('')
          setNewNumber('')
          setTimeout(() => {
            setErrorMessage(null)
          }, 2000)
        }}


        
      else
        phonebookservice
        .create({name:newName,number:newNumber,id:persons.length+1})
        .then(person=>{
        setPersons(persons.concat(person.data))
        setErrorMessage(`added ${newName}`)

        setNewName('')
        setNewNumber('')
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      })
     }


      const removePerson= (id) => {
      const removed=persons.filter(n=>n.id==id).at(0).name
      if (window.confirm("Delete "+removed+" ?")){
      
      phonebookservice
      .remove(id)
      .then(n=>{
        setPersons(persons.filter(o=> o.id!=id))
        setErrorMessage(`removed ${removed}`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 2000)
      
      })
     }}

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage}/>
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addNote={addNote} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}/>
      <h2>Numbers</h2>
      <Person persons={persons} newFilter={newFilter} removePerson={removePerson}/>

       
    </div>
  )

}

export default App