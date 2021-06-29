import React from 'react'
import { useDispatch } from 'react-redux'
import { createNewBlog } from '../reducers/blogsReducer'
import { TextField, Button } from '@material-ui/core'
import '../App.css'

const BlogForm = () => {

  const dispatch = useDispatch()

  const newBlogHandler = async (event) => {
    event.preventDefault()

    const contentTitle = event.target.title.value
    event.target.title.value = ''
    const contentAuthor = event.target.author.value
    event.target.author.value = ''
    const contentUrl = event.target.url.value
    event.target.url.value = ''
    const content = {
      title: contentTitle,
      author: contentAuthor,
      url: contentUrl
    }
    dispatch(createNewBlog(content))
  }

  const handleNewBlog = () => (
    <form onSubmit={newBlogHandler}>
  Title
      <TextField
        id="title"
        data-cy='title'
        type="text"
        name="title">
      </TextField><br></br>
  Author
      <TextField
        id="author"
        data-cy='author'
        type="text"
        name="author">
      </TextField><br></br>
  Url
      <TextField
        id="url"
        data-cy='url'
        type="text"
        name="url">
      </TextField><br></br>
      <Button type="submit" data-cy='create-button'>Create</Button>
    </form>
  )

  return (
    <div>{handleNewBlog()}</div>
  )
}

export default BlogForm