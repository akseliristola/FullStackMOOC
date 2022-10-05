import { useState } from 'react'
const Button= (props) => (
  <button onClick={props.handleclick}>{props.text}</button>
)
const Statistics = (props) => {
  const all=props.bad+props.good+props.neutral
  if (all>0){
  return(
  <div>
    <h2>statistics</h2>
    <div>good {props.good}</div>
    <div>neutral {props.neutral}</div>
    <div>bad {props.bad}</div>
    <div>all {all}</div>
    <div>average {(props.good-props.bad)/all}</div>
    <div>positive {props.good/all}</div>

  </div>)}
  else{return(
  <div>
  <h2>statistics</h2>
  <div>No feedback given</div>
  </div>)}
  
  }

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
      <Statistics good={good} neutral={neutral} bad={bad}/>

    </div>
  )
}
export default App