import { useState } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'

const BlogForm = ({ setErrorMessage,setBlogs } ) => {

  const handleNewBlog= async(event) => {
    event.preventDefault()
    try{
      await blogService.create( { title:title,url:url } )
      setErrorMessage('new blog!!!')
      await blogService.getAll().then(blogs => setBlogs(blogs))
      setTitle('')
      setAuthor('')
      setUrl('')
      setLoginVisible(false)
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)}
    catch(error){
      setErrorMessage('blog cant be added')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }}


  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const [loginVisible, setLoginVisible] = useState(false)
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }


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
        <form onSubmit={handleNewBlog} className="blogform">
                title: <input value={title} onChange={handleTitleChange} name="title" className='titleclass'/><br/>
                author: <input value={author} onChange={handleAuthorChange} name="author" className='authorclass'/><br/>
                url: <input value={url} onChange={handleUrlChange} name="url" className='urlclass'/><br/>
          <button type="submit" className="formbutton">create</button>
        </form>
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>show</button>
      </div></div>)}
BlogForm.propTypes={
  setErrorMessage:PropTypes.func.isRequired,
  setBlogs:PropTypes.func.isRequired
}
export default BlogForm
