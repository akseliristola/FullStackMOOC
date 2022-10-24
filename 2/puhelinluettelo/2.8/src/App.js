import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',number:"040-1231244"}]) 
  const [newName, setNewName] = useState('')

  const [newNumber,setNewNumber]=useState('')
  
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
      <form onSubmit={addNote}>
         <div>name: <input value={newName} onChange={handleNewNameChange}/>   </div>  
         <div>number: <input value={newNumber} onChange={handleNewNumberChange}/>   </div>  
      
       <button type="submit" >add</button>
       </form>
       <h2>Numbers</h2>
       <div>{persons.map(n=><p>{n.name+" "+ n.number}</p>)}</div>
    </div>
  )

}

export default App