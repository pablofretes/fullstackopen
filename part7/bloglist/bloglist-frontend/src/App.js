import React, { useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Toggable from './components/Toggable'
import BlogForm from './components/BlogForm'
import { useDispatch, useSelector } from 'react-redux'
import { initBlogs } from './reducers/blogsReducer'
import { existingLogin, logoutUser } from './reducers/loginReducer'
import { Link, Switch, Route, useRouteMatch, useHistory } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import Container from '@material-ui/core/Container'
import { initUsers } from './reducers/usersReducer'
import Notification from './components/Notification'
import IndividualBlog from './components/IndividualBlog'
import { AppBar, Button } from '@material-ui/core'
import ToolBar from '@material-ui/core/Toolbar'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(existingLogin())
  }, [dispatch])

  useEffect(() => {
    dispatch(initUsers())
  }, [dispatch])

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.login)
  const users = useSelector(state => state.users)
  const notification = useSelector(state => state.notification)

  const blogsList = () => (
    <div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => (b.likes - a.likes)) && blogs.map(blog =>
        <Blog key={blog.id} blog={blog}/>
      )}
    </div>
  )

  const blogForm = () => (
    <Toggable buttonLabel="Create new Blog">
      <BlogForm />
    </Toggable>
  )

  const handleLogout = () => {
    dispatch(logoutUser())
    history.push('/')
  }

  const matchUser = useRouteMatch('/users/:id')
  const user = matchUser ? users.find(u => u.id === matchUser.params.id) : null

  const matchBlog = useRouteMatch('/blogs/:id')
  const blog = matchBlog ? blogs.find(b => b.id === matchBlog.params.id) : null

  return (
    <Container>
      <div>
        <Notification notification={notification} />
      </div>
      <AppBar position='static'>
        <ToolBar>
          <Button color='inherit' component={Link} to='/'>
            Home
          </Button>
          <Button color='inherit' component={Link} to='/users'>
            Users
          </Button>
          {loggedUser === null ? (
            <Button color='inherit' component={Link} to='/login'>
              Login
            </Button>
          ) : (
            <div>
              <em>{loggedUser.username} logged in</em>
              <Button color='inherit' onClick={handleLogout}>Logout</Button>
            </div>
          )}
        </ToolBar>
      </AppBar>
      <Switch>
        <Route path='/users/:id'>
          <User user={user}/>
        </Route>
        <Route path='/blogs/:id'>
          <IndividualBlog blog={blog} />
        </Route>
        <Route path='/users'>
          <Users users={users}/>
        </Route>
        <Route path='/' >
          {loggedUser === null ?(
            <LoginForm /> )
            : (
              <div>
                {blogForm()}
                {blogsList()}
              </div>)
          }
        </Route>
      </Switch>
    </Container>
  )
}

export default App