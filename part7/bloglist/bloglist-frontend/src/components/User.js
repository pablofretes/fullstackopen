import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  if (!user) {
    return null
  }

  console.log(user)
  console.log(user.blogs)

  return (
    <div>
      {user.name}
      {user.blogs.map((blog) => {
        return (
          <li key={blog.id}><Link to={`/blogs/${blog.id}`}>{blog.title}</Link></li>
        )
      })}
    </div>
  )
}

export default User