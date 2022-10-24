const Course=(props) =>  {

  return(
    <div>
      <h2>{props.course.name}</h2>
      <div>
        {props.course.parts.map((n,i)=><div key={i}>{n.name+" "+n.exercises}</div>)}
      </div>
      <div>total of {props.course.parts.reduce((a,b)=> a+b.exercises,0)} exercises</div>
      </div>
      
  )

}
const App = function () {
	const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name:"State of a component",
        exercises:11,
        id:4
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App