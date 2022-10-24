const Course=(props) =>  {

    return(
      <div>
      {props.courses.map((n,c)=>
      <div key={c}>
      <h3>{n.name} </h3>
      <div>{n.parts.map((o,i)=> <div key={i}>{o.name+" "+o.exercises}</div>)}</div>
      <h4>total of {n.parts.reduce((a,b)=> a+b.exercises,0)} exercises</h4>
      </div>)}
      </div>)}
export default Course