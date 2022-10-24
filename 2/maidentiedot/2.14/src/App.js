import { useState,useEffect} from 'react'
import axios from 'axios'
const api_key = process.env.REACT_APP_API_KEY


const WeatherInfo=(props)=>{
return(
<div>
  <h2>Weather in {props.selectedCountries.at(0).capital}</h2>
  <div>tempature {props.weatherdata.main.temp} Celcius</div>
  <img src={'http://openweathermap.org/img/wn/'+props.weatherdata.weather[0].icon+'@2x.png'}/>
  <div>wind {props.weatherdata.wind.speed} m/s</div>
</div>)}



const Filter=(props)=>(
<div>filter countries<input value={props.newFilter} type="text" onChange={props.handleNewFilterChange} /></div>)


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
        
        setCountries(response.data)
        console.log(countrydata)
      })}
  const hook2= () =>{
    axios
    .get('http://api.openweathermap.org/data/2.5/weather?q=finland&APPID=cf39b36fee3da65b9fbfed9907b881d6&units=metric')
    .then(response=>{
      setWeatherData(response.data)

    })}
  
  useEffect(hook, [])
  useEffect(hook2,[])




  const[newFilter,setNewFilter]=useState('')

  const [countrydata, setCountries] = useState([])

  const selectedCountries=countrydata.filter(n=>n.name.common.toLowerCase().includes(newFilter.toLowerCase()))

  const[weatherdata,setWeatherData]=useState([])
  const handleNewFilterChange =(event)=>{

    setNewFilter(event.target.value)
  }

  if (selectedCountries.length==1){
    if (weatherdata.name.toLowerCase() != selectedCountries.at(0).name.common.toLowerCase()){axios
      .get('http://api.openweathermap.org/data/2.5/weather?q='+selectedCountries.at(0).name.common+'&APPID='+api_key+'&units=metric')
      .then(response=>{
        console.log(response.data)
        setWeatherData(response.data)
        console.log(response.data)})}
  
    return(
    <div>
    <Filter newFilter={newFilter} handleNewFilterChange={handleNewFilterChange}/>
    <CountryInfo selectedCountries={selectedCountries}/>
    <WeatherInfo selectedCountries={selectedCountries} weatherdata={weatherdata}/>

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