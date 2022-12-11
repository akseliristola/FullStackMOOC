import { useState } from "react"

const Blog = ({blog}) => {
  const [show,changeShow]=useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (show){
    return(
      <div style={blogStyle}>
        {blog.title} <button onClick={()=>changeShow(false)}>hide</button><br/>
        {blog.url} <br/>
        likes {blog.likes} <button onClick={()=>blog.likes+=1}>like</button>  <br/>
        {blog.author}
      </div>
    )
  }
  else{
    return(
    <div style={blogStyle}>
      {blog.title} <button onClick={()=>changeShow(true)}>view</button>
    </div>
    )}
}

export default Blog