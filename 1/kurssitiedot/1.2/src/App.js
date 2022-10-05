
const App = () => {
  const Part=(props) => {return(<div><p>{props.name} {props.course}</p></div>)}
  const Header=(props)=>{return( <div><p>{props.course}</p></div>)}
  const Contnent=(props)=>{return <div><p><Part name={props.part1} course={props.exercises1}/><Part name={props.part2} course={props.exercises2}/><Part name={props.part3} course={props.exercises3}/></p></div>}
  const Total=(props)=>{return <div><p>{props.a+props.b+props.c}</p></div>}

  const course1 = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course1}/>
      <Contnent part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3}/>
      <Total a={exercises1} b={exercises2} c={exercises3}/>

    </div>
  )
}

export default App