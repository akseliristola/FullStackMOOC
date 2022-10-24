import axios from 'axios'
const baseurl='http://localhost:3001/persons'
const getAll = () => {
    return axios.get(baseurl)
  }
  const create = newObject => {
    return axios.post(baseurl, newObject)}
    
  const remove=id=>{
    return axios.delete(baseurl+'/'+id)
  }

export default {getAll,create,remove}