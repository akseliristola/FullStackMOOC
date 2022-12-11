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

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
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
        username, password,
      })

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      ) 
      setUser(user)
      setusername('')
      setpassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }


  const loginForm =()=>(
    <div>
      <h2>log in the application</h2>
      <form onSubmit={handleLogin}>
      <input value={username} onChange={handleUsernameChange} name="username"/><br/>
      <input type="password" value={password}onChange={handlePasswordChange} name="password" /><br/>
      <button type="submit">login</button>
      </form>
    </div>)
  
  const userinfo= () =>(
    <div>
      {user.name} logged in <button onClick={()=>window.localStorage.removeItem('loggedNoteappUser')}>log out</button>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )


  return (
  <div>
  {user === null ?
  loginForm() :
  userinfo()}
  </div>
  )
}

export default App
