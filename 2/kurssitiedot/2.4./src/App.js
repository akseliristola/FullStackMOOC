const Course=(props) =>  {

  return(
    <div>
    {props.courses.map((n,c)=>
    <div key={c}>
    <h3>{n.name}</h3>
    <div>{n.parts.map((o,i)=> <div key={i}>{o.name+o.exercises}</div>)}</div>
    <h4>total of {n.parts.reduce((a,b)=> a+b.exercises,0)} exercises</h4>
    </div>)}
    </div>)}

  const App = () => {
    const courses = [
      {
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
            name: 'Redux',
            exercises: 11,
            id: 4
          }
        ]
      }, 
      {
        name: 'Node.js',
        id: 2,
        parts: [
          {
            name: 'Routing',
            exercises: 3,
            id: 1
          },
          {
            name: 'Middlewares',
            exercises: 7,
            id: 2
          }
        ]
      }
    ]

  
  return (
    <div>
      <h2>Web development curriculum</h2>
      <Course courses={courses} />
    </div>
  )
  }

export default App