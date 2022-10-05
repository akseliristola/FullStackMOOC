
const App = () => {
  const Header=(props)=>{return( <div><p>{props.course}</p></div>)}
  const Contnent=(props)=>{return <div><p>{props.part} {props.exercises}</p></div>}
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
      <Contnent part={part1} exercises={exercises1}/>
      <Contnent part={part2} exercises={exercises2}/>
      <Contnent part={part3} exercises={exercises3}/>
      <Total a={exercises1} b={exercises2} c={exercises3}/>

    </div>
  )
}

export default App