import { useState,useEffect} from 'react'
import axios from 'axios'

const Filter=(props)=>(<div>filter shown with<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)

const PersonForm=(props)=>(<form onSubmit={props.addNote}>
  <div>name: <input value={props.newName} onChange={props.handleNewNameChange}/>   </div>  
  <div>number: <input value={props.newNumber} onChange={props.handleNewNumberChange}/>   </div>  
<button type="submit" >add</button>
</form>)

const Person=(props)=>(<div>{props.persons.filter(n=>n.name.toLowerCase().includes(props.newFilter.toLowerCase())).map( n => <p key={n.id}> {n.name+" "+ n.number} </p>)}</div>)

const App = () => {

  const hook = () => {
    console.log('start')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])


  const [persons, setPersons] = useState([])

  const [newName, setNewName] = useState('')

  const [newNumber,setNewNumber]=useState('')

  const[newFilter,setNewFilter]=useState('')
  
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
 
      if (persons.map(n=>n.name).includes(newName))
        alert(newName+" is already added to phonebook")
      
      else
        setPersons(persons.concat({name:newName,number:newNumber}))
        setNewName('')
        setNewNumber('')
     }
  

 
  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
      <h2>add a new</h2>
      <PersonForm addNote={addNote} newName={newName} handleNewNameChange={handleNewNameChange} newNumber={newNumber} handleNewNumberChange={handleNewNumberChange}/>
      <h2>Numbers</h2>
      <Person persons={persons} newFilter={newFilter}/>

       
    </div>
  )

}

export default App