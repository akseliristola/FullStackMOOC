import { useState,useEffect} from 'react'
import axios from 'axios'

const Filter=(props)=>(<div>filter countries<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)
const CountryInfo=(props)=> {return(<div>
  <div>{props.selectedCountries.at(0).name.common}</div>

  <div>capital {props.selectedCountries.at(0).capital}</div>

  <div>area {props.selectedCountries.at(0).area}</div>

  <h3>languages:</h3>
  <ul>{Object.values(props.selectedCountries.at(0).languages).map((n,i)=><li key={i}>{n}</li>)}  </ul>
  <img src={props.selectedCountries.at(0).flags.png}/>
  </div>)
  }



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

  
  if (selectedCountries.length==1){return(
    <div>
    <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
    <CountryInfo selectedCountries={selectedCountries}/>
    </div>)}

  else if (selectedCountries.length<11){return(
    <div>      
    <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
    {selectedCountries.map( 
    (n,i) => 
    <div key={i}>
    <div> {n.name.common}</div>
    <button onClick={()=>setNewFilter(n.name.common)}>show</button>
    </div>)}
    </div>
    
    
    )}
    else {return(
       <div>
       <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
       <div>Too many matches, specify another filter</div>
       </div>
       )}}


  



export default App