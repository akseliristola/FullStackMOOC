import { useState } from 'react'
const StatisticLine = (props) =>(
  <div>{props.text} {props.value}</div>
)

const Button= (props) => (
  <button onClick={props.handleclick}>{props.text}</button>
)
const Statistics = (props) => {
  const all=props.bad+props.good+props.neutral
  if (all>0){
  return(
  <div>
    <h2>statistics</h2>
    <StatisticLine text="good" value={props.good}/>
    <StatisticLine text="neutral" value={props.neutral}/>
    <StatisticLine text="bad" value={props.bad}/>
    <StatisticLine text="all" value={all}/>
    <StatisticLine text="average" value={(props.good-props.bad)/all}/>
    <StatisticLine text="positive" value={props.good/all}/>
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