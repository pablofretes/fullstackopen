import React, { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, likeHandler, deleteHandler }) => {

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 5,
    paddingBottom: 10,
    border: 'solid',
    borderWidth: 3,
    marginBottom: 5
  }

  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  const showLikesAndUrl = () => {
    return (
      <div>
        <div className='likes-container' data-cy='like-container'>
          {blog.likes} <button className='like-button' data-cy='like-button' onClick={() => likeHandler(blog.id, blog.likes, blog.author, blog.title, blog.url)}>Like</button>
        </div>
        <p>
          {blog.url}
        </p>
        <p>
          {blog.user.username}
        </p>
        <button className='delete-button' data-cy='delete-button' onClick={() => deleteHandler(blog.id, blog.title, blog.author)}>Delete</button>
      </div>
    )
  }

  return (
    <div style={blogStyle} data-cy='blogs'>
      {blog.title} By <strong>{blog.author}</strong>
      <div>
        <button className='visibility-button' data-cy='visibility-button' onClick={toggleVisibility}>{visibility ? 'hide' : 'view'}</button>
        {visibility ? (
          <div data-cy='show-likes'>
            {showLikesAndUrl()}
          </div>
        ) : ('')
        }
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired
}

export default Blog
