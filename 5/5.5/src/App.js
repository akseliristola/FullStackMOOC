import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'



const App = () => {
  const [blogs, setBlogs] = useState([])
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const [user, setUser] = useState(null)
  const [errorMessage,setErrorMessage]=useState("")

  const [loginVisible, setLoginVisible] = useState(false)
  const[title,setTitle]=useState("")
  const[author,setAuthor]=useState("")
  const[url,setUrl]=useState("")


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleUsernameChange = (event) => {
    setusername(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setpassword(event.target.value)
  }
  const handleTitleChange = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthorChange = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrlChange = (event) => {
    setUrl(event.target.value)
  }


  const handleLogin = async (event) => {
    event.preventDefault()
    
    try {
      const user = await loginService.login({
        username, password
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      blogService.setToken(user.token)
 
      setusername('')
      setpassword('')
      setErrorMessage('login succesful!')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    } catch (exception) {
      setusername('')
      setpassword('')
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 3000)
    }
  }
  const handleNewBlog= async(event) => {
    event.preventDefault()
    try{
    await blogService.create({title:title,author:author,url:url})
    setErrorMessage("new blog!!!")
    await blogService.getAll().then(blogs =>setBlogs(blogs))
    console.log(blogs)
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

  
  const loginForm =()=>{

    return(
    <div>
      <h2>log in the application</h2>
      <form onSubmit={handleLogin}>
      username: <input value={username} onChange={handleUsernameChange} name="username"/><br/>
      password: <input type="password" value={password} onChange={handlePasswordChange} name="password" /><br/>
      <button type="submit">login</button><br/>
      </form>
    </div>)}
 
  const userinfo= () =>{
    const hideWhenVisible = { display: loginVisible ? 'none' : '' }
    const showWhenVisible = { display: loginVisible ? '' : 'none' }
    return(
    <div>
      {user.name} logged in <button onClick={()=>window.localStorage.removeItem('loggedNoteappUser')}>log out</button>
      <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)}>new note</button>
        </div>
      <div style={showWhenVisible}>
      <h2>create new</h2>
      <form onSubmit={handleNewBlog}>
      title: <input value={title} onChange={handleTitleChange} name="title"/><br/>
      author: <input value={author} onChange={handleAuthorChange} name="author"/><br/>
      url: <input value={url} onChange={handleUrlChange} name="url"/><br/>
      <button type="submit">create</button>
      </form>
      <button onClick={() => setLoginVisible(false)}>cancel</button>
      
      </div>
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />)}

    </div>
  )}

  return (
  <div>
  <h2>blogs</h2>
  {errorMessage}
  {user === null ?
  loginForm() :
  userinfo()}
  </div>
  )
}

export default App
