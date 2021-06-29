import blogService from '../services/blogs'

const blogsReducer = (state = [], action) => {
  console.log('state is', state)
  console.log('action is', action)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const id = action.data.id
    const blogToBeLiked = state.find(b => b.id === id)
    const changedBlog = {
      ...blogToBeLiked,
      likes: blogToBeLiked.likes + 1
    }
    return state.map(blog => blog.id === id ? changedBlog : blog)
  }
  case 'DELETE': {
    const id = action.data
    return state.blogs.filter(blog => blog.id !== id)
  }
  case 'COMMENT': {
    return state.map(blog => blog.id !== action.data.id ? blog : action.data)
  }
  default: return state
  }
}

export const createNewBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)

    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    const likedBlog = await blogService.update(blog.id, { ...blog, likes: blog.likes + 1 })
    dispatch({
      type: 'LIKE',
      data: likedBlog
    })
  }
}

export const initBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    await blogService.deleteBlog(blog.id)
    dispatch({
      type: 'DELETE_BLOG',
      data: blog.id
    })
  }
}

export const commentBlog = (content, blog) => {
  return async dispatch => {
    const newComment = await blogService.postComment(blog.id, content)
    dispatch({
      type: 'COMMENT',
      data: newComment
    })
  }
}

export default blogsReducer