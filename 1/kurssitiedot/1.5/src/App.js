
const App = () => {
  const Part=(props) => {return(<div><p>{props.name} {props.course}</p></div>)}
  const Header=(props)=>{return( <div><p>{props.course}</p></div>)}
  const Contnent=(props)=>{return <div><p><Part name={props.parts[0].name} course={props.parts[0].exercises}/><Part name={props.parts[1].name} course={props.parts[1].exercises}/><Part name={props.parts[2].name} course={props.parts[2].exercises}/></p></div>}
  const Total=(props)=>{return <div><p>{props.parts[0].exercises+props.parts[1].exercises+props.parts[2].exercises}</p></div>}

  const course = {
    name:'Half Stack application development',
    parts: [
    {name:'Fundamentals of React',
    exercises:10},
    {name: 'Using props to pass data',
    exercises: 7},
    {name:'State of a component',
    exercises:14}]}

  return (
    <div>
      <Header course={course.name}/>
      <Contnent parts={course.parts} />
      <Total parts={course.parts}/>

    </div>
  )
}

export default App