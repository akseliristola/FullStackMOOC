import axios from 'axios'
import { useState } from "react"
import blogService from '../services/blogs'


const Blog = ({blog}) => {
  const [show,changeShow]=useState(false)
  const [likes,setLikes]=useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }    

  const handleLike=async()=>{
    try{
    const newObject={
      likes:likes+1
    }
    setLikes(likes+1)
    await axios.put(`/api/blogs/${blog.id}`,newObject)}
    catch(error){console.log(error)}
  }



  if (show){
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={()=>changeShow(false)}>hide</button><br/>
        {blog.url} <br/>
        likes {likes} <button onClick={handleLike}>like</button> <br/>
        {blog.author}
      </div>
    )}
  else{
    return(
    <div style={blogStyle}>
      {blog.title} <button onClick={()=>changeShow(true)}>view</button>
    </div>
    )}
}
export default Blog