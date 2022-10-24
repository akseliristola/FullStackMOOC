import { useState } from 'react'

const Filter=(props)=>(<div>filter shown with<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)
const PersonForm=(props)=>(<form onSubmit={props.addNote}>
  <div>name: <input value={props.newName} onChange={props.handleNewNameChange}/>   </div>  
  <div>number: <input value={props.newNumber} onChange={props.handleNewNumberChange}/>   </div>  
<button type="submit" >add</button>
</form>)
const Persons=(props)=>(<div>{props.persons.filter(n=>n.name.toLowerCase().includes(props.newFilter.toLowerCase())).map((n,i)=><p key={i}>{n.name+" "+ n.number}</p>)}</div>)


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])
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
      const noteObject = {
        name:newName
      }
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
      <Persons persons={persons} newFilter={newFilter}/>
       
    </div>
  )

}

export default App