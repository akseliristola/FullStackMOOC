import axios from 'axios'
const baseurl='http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseurl)
  }
  
  const create = newObject => {
    return axios.post(baseurl, newObject)}


export default {getAll,create}