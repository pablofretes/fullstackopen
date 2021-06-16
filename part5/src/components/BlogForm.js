import React, { useState } from 'react'

const BlogForm = ({ newBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const newBlogHandler = async (event) => {
    event.preventDefault()

    newBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })

    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  const handleNewBlog = () => (
    <form onSubmit={newBlogHandler}>
            Title<input id="title" data-cy='title' type="text" name="Title" value={newTitle} onChange={({ target }) => setNewTitle(target.value)}></input><br></br>
            Author<input id="author" data-cy='author' type="text" name="Author" value={newAuthor} onChange={({ target }) => setNewAuthor(target.value)}></input><br></br>
            Url<input id="url" data-cy='url' type="text" name="Url" value={newUrl} onChange={({ target }) => setNewUrl(target.value)}></input><br></br>
      <button type="submit" data-cy='create-button'>Create</button>
    </form>
  )

  return (
    <div>{handleNewBlog()}</div>
  )
}

export default BlogForm