import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [update, setUpdate] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [update])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const userLog = JSON.parse(loggedUserJSON)
      console.log(userLog)
      setUser(userLog)
      blogService.setToken(userLog.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const userLog = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(userLog))
      blogService.setToken(userLog.token)
      setUser(userLog)
      console.log(userLog)
      setUsername('')
      setPassword('')
    } catch (exception) {
      console.log(username, password)
      setErrorMessage('Username or Password are incorrect')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      window.localStorage.clear()
    }
  }

  const loginForm = () => (
    <Toggable buttonLabel="Login">
      <LoginForm
        username={username}
        password={password}
        handleChangeUsername={({ target }) => setUsername(target.value)}
        handleChangePassword={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Toggable>
  )

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => (b.likes - a.likes)) && blogs.map(blog =>
        <Blog key={blog.id} blog={blog} likeHandler={likeUpdate} deleteHandler={deleteHelper}/>
      )}
    </div>
  )

  const newBlog = async (newBlogObject) => {
    const response = await blogService.create(newBlogObject)
    setBlogs(blogs.concat(response))
    setErrorMessage('A new Blog has been created')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const blogForm = () => (
    <Toggable buttonLabel="Create new Blog">
      <BlogForm
        newBlog={newBlog}
        blogService={blogService}
        setBlogs={setBlogs}
        blogs={blogs}
        setErrorMessage={setErrorMessage}
      />
    </Toggable>
  )

  const handleLogout = () => {
    const logout = window.localStorage.removeItem('loggedBlogAppUser')
    if(logout) {
      setUser(null)
    }
  }

  const likeUpdate = async (id, likes, author, title, url) => {

    await blogService.update(id, {
      likes: likes + 1,
      author: author,
      title: title,
      url: url
    })

    setUpdate(Number(Math.random() * 99999999999).toFixed(0))
  }

  const deleteHelper = async (id, title, author) => {
    const result = window.confirm(`Delete Blog ${title} by ${author}?`)

    if(result) {
      await blogService.deleteBlog(id)
    }
    setUpdate(Number(Math.random() * 99999999999).toFixed(0))
  }

  return (
    <div>
      <div data-cy='error-message'>
        {errorMessage}
      </div>
      {user === null ?
        loginForm():
        <div>
          {blogForm()}
          {blogsList()}
          <h1>{user.name} logged-in <br></br> {user.blogs} </h1>
          <button onClick={handleLogout}>Logout</button><br></br>
        </div>}
    </div>
  )
}

export default App