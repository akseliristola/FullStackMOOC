import { useState } from 'react'



const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas' }]) 
  const [newName, setNewName] = useState('')
  const handleNewNameChange = (event) => {
    console.log(event.target.value)
    console.log(persons)
    setNewName(event.target.value)  }


    const addNote = (event) => {
      event.preventDefault()
      const noteObject = {
        name:newName
      }
      setPersons(persons.concat({name:newName}))
      setNewName('')
    }



  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addNote}>
         name: <input value={newName} onChange={handleNewNameChange}/>        
      
       <button type="submit" >add</button>
       </form>
       <h2>Numbers</h2>
       <div>{persons.map(n=><p>{n.name}</p>)}</div>
    </div>
  )

}

export default App