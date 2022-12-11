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
      console.log(user.name)
      setUser(user.name)
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
      {user} logged in
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
