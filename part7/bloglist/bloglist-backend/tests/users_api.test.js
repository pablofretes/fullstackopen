const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const { testEnvironment } = require('../jest.config')
const api = supertest(app)
const helper = require('./test_helper')
const bcrypt = require('bcrypt')
const User = require('../models/user')
const Blog = require('../models/blog')

describe('when there is initially one user in db', () => {
    beforeEach(async () => {
        User.deleteMany({})

        const passwordHash = await bcrypt.hash('passwordSecret', 10)
        const user = new User({ username: 'rootName', passwordHash })
        await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'someUsername',
            name: 'someName',
            password: 'somePassword'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)
        const usernames = usersAtEnd.map(users => users.username)
        expect(usernames).toContain(newUser.username)
    })

    test('creation fails with proper statuscode and message if username already taken', async () => {
        const usersAtStart = await helper.usersInDb()
    
        const newUser = {
          username: 'root',
          name: 'someOtherName',
          password: 'someOtherPassword',
        }
    
        const result = await api
          .post('/api/users')
          .send(newUser)
          .expect(400)
          .expect('Content-Type', /application\/json/)
    
        expect(result.body.validation).toContain('username must be unique')
    
        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
      })
})

afterAll(() => {
    mongoose.connection.close()
})