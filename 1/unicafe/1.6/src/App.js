import { useState } from 'react'
const Button= (props) => (
  <button onClick={props.handleclick}>{props.text}</button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <div>
      <Button handleclick={()=>{setGood(good+1)}} text="good"/>
      <Button handleclick={()=>{setNeutral(neutral+1)}} text="neutral"/>
      <Button handleclick={()=>{setBad(bad+1)}} text="bad"/>
      </div>
      <h2>statistics</h2>
      <div>good {good}</div>
      <div>neutral {neutral}</div>
      <div>bad {bad}</div>
    </div>
  )
}
export default App