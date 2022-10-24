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
  const update = (id, newObject) => {
    return axios.put(`${baseurl}/${id}`, newObject)
  }
export default {getAll,create,remove,update}