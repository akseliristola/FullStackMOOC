import { render, renderHook } from '@testing-library/react'
import { useState } from 'react'
const Button=(props)=>(
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
const votes=[0,0,0,0,0,0,0]
const copy=[...votes]

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const [selected, setSelected] = useState(anecdotes[Math.floor(Math.random() * 7)])



 
  return (
  <div>
    <h2>anecdote of the day</h2>
    <div>{selected}</div>
    <div>has {copy[anecdotes.indexOf(selected)]} votes</div>
    <Button handleClick={()=>copy[anecdotes.indexOf(selected)]+=1} text="vote"></Button>
    <Button handleClick={()=>setSelected(anecdotes[Math.floor(Math.random() * 7)])} text="next anecdote"/>
    <h2>anecdote with most votes</h2>
    <div>{anecdotes[copy.indexOf(Math.max(...copy))]}</div>
  </div>
  )
}

export default App