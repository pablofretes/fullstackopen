const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
    {
        title: 'Blog Number 0',
        author: 'Best Blogger',
        url: 'someLink',
        likes: 5
    },
    {
        title: 'Blog Number 1',
        author: 'Second Best Blogger',
        url: 'someOtherLink',
        likes: 3
    }
]

const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())  
}

const usersInDb = async () => {
    const users = await User.find({})
    return users.map(user => user.toJSON())
}

module.exports = {
    initialBlogs, 
    blogsInDb,
    usersInDb
}