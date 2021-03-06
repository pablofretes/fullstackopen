const jwt = require('jsonwebtoken')
const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    response.json(blogs)
})
  
blogsRouter.post('/', async (request, response) => {
    const body = request.body
    const token = request.token
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id){
      return response.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(decodedToken.id)
  
    /*if(!body.title){
      return response.status(400).json({ error: 'title missing' })
    }
  
    if(!body.author){
      return response.status(400).json({ error: 'author missing' })
    }
  
    if(!body.url){
      return response.status(400).json({ error: 'url missing' })
    }*/

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
      user: user._id
    })
  
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.json(savedBlog)
})

blogsRouter.delete('/:id', async (request, response) => {
  const blogToDelete = await Blog.findById(request.params.id)
  const token = request.token 
  const decodedToken = jwt.verify(token, process.env.SECRET)
  
  if(!token || !decodedToken.id){
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  if(blogToDelete.user.toString() === decodedToken.id){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(blogToUpdate)
})

module.exports = blogsRouter