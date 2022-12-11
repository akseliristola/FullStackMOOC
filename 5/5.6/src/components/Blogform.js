import { useState } from "react"
const BlogForm = ({ hideWhenVisible,setLoginVisible,showWhenVisible,setErrorMessage,blogService,setBlogs}) => {

  const handleNewBlog= async(event) => {
    event.preventDefault()
    try{
    await blogService.create({title:title,author:author,url:url})
    setErrorMessage("new blog!!!")
    await blogService.getAll().then(blogs =>setBlogs(blogs))
    setTitle('')
    setAuthor('')
    setUrl('')
    setLoginVisible(false)
    setTimeout(() => {
      setErrorMessage(null)
    }, 3000)}
    catch(error){
      setErrorMessage("blog cant be added")
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }}


  const[title,setTitle]=useState("")
  const[author,setAuthor]=useState("")
  const[url,setUrl]=useState("") 

  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }

  return (
      <div>
        <div style={showWhenVisible}>
            <h2>Create new blog</h2>
            <form onSubmit={handleNewBlog}>
                title: <input value={title} onChange={handleTitleChange} name="title"/><br/>
                author: <input value={author} onChange={handleAuthorChange} name="author"/><br/>
                url: <input value={url} onChange={handleUrlChange} name="url"/><br/>
                <button type="submit">create</button>
             </form>
             <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
        <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>show</button>

        </div>
        </div>
    )
  }
  
  export default BlogForm
