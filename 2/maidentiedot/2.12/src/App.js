import { useState,useEffect} from 'react'
import axios from 'axios'

const Filter=(props)=>(<div>filter countries<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)



const Countries=(props)=>{

  if (props.selectedCountries.length==1){return(
    <div>
    <div>{props.selectedCountries.map( (n,i)=><h2 key={i}>{n.name.common}</h2>)}</div>
    <div>{props.selectedCountries.map( (n,i)=><div key={i}>capital {n.capital}</div>)}</div>
    <div>{props.selectedCountries.map( (n,i)=><div key={i}>area {n.area}</div>)}</div>
    <h3>languages:</h3>
    <ul>{Object.values(props.selectedCountries.at(0).languages).map((n,i)=><li key={i}>{n}</li>)}  </ul>
    {console.log(props.selectedCountries.at(0).languages)}
    {console.log(Object.values(props.selectedCountries.at(0).languages))}

    <div>{props.selectedCountries.map( (n,i) => <img key={i} src={n.flags.png}></img> )}</div>
    </div>)}

  else if (props.selectedCountries.length<11){ return(<div>{props.countrydata.filter(n=>n.name.common.toLowerCase().includes(props.newFilter.toLowerCase())).map( (n,i) => <p key={i}> {n.name.common} </p>)}</div>)}
  
  else {return(<div>Too many matches, spesify another filter</div>)}}

    


const App = () => {

  const hook = () => {
    console.log('start')
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }
  useEffect(hook, [])
  const[newFilter,setNewFilter]=useState('')


  const [countrydata, setPersons] = useState([])

  const selectedCountries=countrydata.filter(n=>n.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  
  const handleNewFilterChange =(event)=>{
    console.log(countrydata)
    setNewFilter(event.target.value)
  }





 
  return (
    <div>
      <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
      <Countries countrydata={countrydata} newFilter={newFilter} selectedCountries={selectedCountries}/> 
    </div>
  )

}

export default App