const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { testEnvironment } = require('../jest.config')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

beforeEach(async () => {
    await User.deleteMany({})

    const testUser = {
        username: 'testUsername',
        name: 'testName',
        password: 'testPassword',
    }
    await api.post('/api/users')
        .send(testUser)
        .expect('Content-type', /application\/json/)

    await Blog.deleteMany({})
    
    const newBlogObjects = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = newBlogObjects.map(blog => blog.save())
    await Promise.all(promiseArray)
})

describe('Testing database', () => {

    test('obtain every blog', async () => {
        const blogs = await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-type', /application\/json/)
    
        expect(blogs.body).toHaveLength(helper.initialBlogs.length)
    })

    test('when a blog is posted, the length of the blogs database should increase by 1', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword'
        }

        const login = await api.post('/api/login')
            .send(newLogin)
            .expect('Content-type', /application\/json/)

        const newBlog = {
            title: 'newTitle',
            author: 'newAuthor',
            url: 'newLink',
            likes: 1
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const response = await helper.blogsInDb()
        const title = response.map(blog => blog.title)
    
        expect(response).toHaveLength(helper.initialBlogs.length + 1)
        expect(title).toContain('newTitle')
    })
})

describe('Testing properties', () => {


    test('id is called id, and not called _id', async () => {
        const blogs = await api.get('/api/blogs')

        const blogsIds = blogs.body.map(r => r.id)
        const firstBlogsId = blogsIds[0]
    
        expect(firstBlogsId).toBeDefined()
    }) 

    test('when property likes from a blog is missing, it should have value 0', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword'
        }

        const login = await api.post('/api/login')
            .send(newLogin)
            .expect('Content-type', /application\/json/)

        const newBlog = {
            title: 'newTitle',
            author: 'newAuthor',
            url: 'newLink'
        }

        const response = await api
            .post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(200)
            .expect('Content-type', /application\/json/)

        expect(response.body.likes).toBe(0)
    })

    test('when property title is missing, expect status code 400', async () => {
        const newBlog = {
            author: 'newAuthor',
            url: 'newLink',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length)
    })

    test('when property url is missing, expect status code 400', async () => {
        const newBlog = {
            title: 'newTitle',
            author: 'newAuthor',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
        
        const response = await helper.blogsInDb()
        expect(response).toHaveLength(helper.initialBlogs.length)
    })

    test('deleting a blog', async () => {
        const newLogin = {
            username: 'testUsername',
            password: 'testPassword'
        }

        const login = await api.post('/api/login')
            .send(newLogin)
            .expect('Content-type', /application\/json/)
        
        const newBlog = {
            title: 'testDelete',
            author: 'authorTestDelete',
            url: 'urlTestDelete',
            likes: 6
        }
        await api.post('/api/blogs')
            .send(newBlog)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const blogs = await helper.blogsInDb()

        await api
            .delete(`/api/blogs/${blogs[2].id}`)
            .set('Authorization', `bearer ${login.body.token}`)
            .expect(204)

        const blogsAfterDeleting = await helper.blogsInDb()
        const blogTitle = blogsAfterDeleting.map(blog => blog.title)
        expect(blogTitle).not.toContain(blogs[2].title)
        expect(blogsAfterDeleting).toHaveLength(helper.initialBlogs.length)
    })

    test('updating a blog', async () => {
        const blogs = await helper.blogsInDb()
        const blogToUpdate = blogs[0]

        await api
            .put(`/api/blogs/${blogToUpdate.id}`).send({ likes: 15 })
        
        const blogsAfterUpdating = await helper.blogsInDb()
        expect(blogsAfterUpdating[0].likes).toBe(15)
    })
})

afterAll(() => {
    mongoose.connection.close()
})