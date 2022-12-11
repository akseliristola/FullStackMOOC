import axios from 'axios'
import { useState } from 'react'
import blogService from '../services/blogs'


const Blog = ({ blog,blogs,setBlogs,user }) => {
  const [show,changeShow]=useState(false)
  const [likes,setLikes]=useState(blog.likes)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLike=async() => {
    try{
      const newObject={
        likes:likes+1
      }
      setLikes(likes+1)
      await axios.put(`/api/blogs/${blog.id}`,newObject)}
    catch(error){console.log(error)}
  }

  const handleDelete=async() => {
    try{
      if (window.confirm(`Do you want to delete this blog by ${blog.author}?`)){
        blogService.remove(blog)
        await setBlogs(blogs.filter(n => n!==blog))}
    }
    catch(error){console.log(error)}
  }

  if (show && blog.user.username===user.username){

    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={() => changeShow(false)}>hide</button><br/>
        {blog.url} <br/>
        likes {likes} <button onClick={handleLike}>like</button> <br/>
        {blog.author}<br/>
        <button onClick={handleDelete}>remove</button>
      </div>
    )}
  else if(show){
    return(
      <div style={blogStyle} className="kaikki">
        {blog.title} <button onClick={() => changeShow(false)}>hide</button><br/>
        {blog.url} <br/>
        <div className='likediv'>likes {likes} <button onClick={handleLike} className="likebutton">like</button> <br/> </div>
        {blog.author}<br/>
      </div>)
  }
  else{
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={() => changeShow(true)}>view</button>
      </div>
    )}
}
export default Blog