import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import BlogForm from './components/Blogform'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const[username,setusername]=useState("")
  const[password,setpassword]=useState("")
  const [user, setUser] = useState(null)
  const [errorMessage,setErrorMessage]=useState("")


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(( function( a , b){
        if(a.likes < b.likes) return 1;
        if(a.likes > b.likes) return -1;
        return 0;
    })))
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
  
  const loginForm =()=>(
    <div>
      <h2>log in the application</h2>
      <form onSubmit={handleLogin}>
      username: <input value={username} onChange={handleUsernameChange} name="username"/><br/>
      password: <input type="password" value={password} onChange={handlePasswordChange} name="password" /><br/>
      <button type="submit">login</button><br/>
      </form>
    </div>)
 
  const Userinfo= (props) =>{
    return(
    <div>
      {props.name} logged in <button onClick={()=>window.localStorage.removeItem('loggedNoteappUser')}>log out</button>
      <BlogForm 
      setErrorMessage={setErrorMessage}  
      blogService={blogService} setBlogs={setBlogs}
      />
      { blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>)}
    </div>
  )}

  return (
  <div>
  <h2>blogs</h2>
  {errorMessage}
  {user === null ?
  loginForm() :
  <Userinfo name={user.name}/>}
  </div>
  )
}

export default App
