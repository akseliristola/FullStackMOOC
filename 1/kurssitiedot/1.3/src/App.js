
const App = () => {
  const Part=(props) => {return(<div><p>{props.name} {props.course}</p></div>)}
  const Header=(props)=>{return( <div><p>{props.course}</p></div>)}
  const Contnent=(props)=>{return <div><p><Part name={props.part1.name} course={props.part1.exercises}/><Part name={props.part2.name} course={props.part2.exercises}/><Part name={props.part3.name} course={props.part3.exercises}/></p></div>}
  const Total=(props)=>{return <div><p>{props.a+props.b+props.c}</p></div>}

  const course1 = 'Half Stack application development'
  const part1 = {
    name:'Fundamentals of React',
    exercises:10}
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7}
  const part3 = {
    name:'State of a component',
    exercises:14}

  return (
    <div>
      <Header course={course1}/>
      <Contnent part1={part1}  part2={part2} part3={part3} />
      <Total a={part1.exercises} b={part2.exercises} c={part3.exercises}/>

    </div>
  )
}

export default App