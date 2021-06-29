import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { likeBlog, deleteBlog, initBlogs, commentBlog } from '../reducers/blogsReducer'
import { notificationGreen, notificationRed } from '../reducers/notificationReducer'
import { TextField, Button } from '@material-ui/core'
import List from '@material-ui/core/List'
import Container from '@material-ui/core/Container'
import '../App.css'

const IndividualBlog = ({ blog }) => {
  const dispatch = useDispatch()
  const history = useHistory()
  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  const likeHandler = (blog) => {
    dispatch(likeBlog(blog))
    dispatch(notificationGreen(`You have liked ${blog.title}`, 5))
  }

  const deleteHandler = async () => {
    const result = window.confirm(`Are you sure you want to delete the blog ${blog.title} by ${blog.author} ?`)
    if(result){
      try {
        await dispatch(deleteBlog(blog))
        dispatch(notificationGreen(`Successfully deleted blog ${blog.title}`, 5))
        history.push('/')
      } catch (err) {
        dispatch(notificationRed('You cant delete this blog', 5))
        dispatch(notificationRed(err, 5))
        return undefined
      }
    }
  }

  const commentHandler = (event) => {
    event.preventDefault()
    const contentComment = event.target.comment.value
    event.target.comment.value = ''
    const content = {
      comment: contentComment
    }
    dispatch(commentBlog(content, blog))
  }

  const blogStyle = {
    borderRadius: 15,
    padding: 5,
    border: 'groove',
    backgroundColor: '#3f51b5',
    width: 475,
    margin: 15
  }

  return (
    <Container>
      <Container style={blogStyle} className='likes-container' data-cy='like-container' maxwidth="sm">
        <p>{blog.title} by <strong>{blog.author}</strong></p>
        <a href={blog.url}>{blog.url}</a> <br></br>
        <p>{blog.user.username}</p><br></br>
        <button className='like-button' data-cy='like-button' onClick={() => likeHandler(blog)}>{blog.likes}</button>
        <em>Like</em>
        <button className='delete-button' data-cy='delete-button' onClick={() => deleteHandler(blog)}>Delete</button><br></br>
      </Container>
      <br></br>
      <h2>Comments</h2>
      <form onSubmit={commentHandler}>
        <TextField id='comment' name='comment' placeholder='Add a comment'></TextField>
        <Button type='submit'>Comment</Button>
      </form>
      <List>
        {console.log(blog.comments)}
        {blog.comments.map(comment =>
          <li key={comment.id}>{comment.comment}</li>
        )}
      </List>
    </Container>
  )
}

export default IndividualBlog