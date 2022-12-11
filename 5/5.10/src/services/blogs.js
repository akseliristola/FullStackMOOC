import axios from 'axios'
const baseUrl = '/api/blogs/'

let token=null

const setToken = newToken => {
  token =`bearer ${newToken}`
}


const getAll = () => {
  let request = axios.get(baseUrl)

  return request.then(response => response.data)
}

const create = async newObject => {
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(baseUrl, newObject, config)
  return response.data
}

const put = async newObject=>{
  await axios.put(baseUrl+newObject.id,newObject)
}
const remove= async newObject=>{
  const config = {
    headers: { Authorization: token },
  }
  await axios.delete(baseUrl+newObject.id,config)
}

export default { getAll,setToken,create,token,put,remove}