const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const bcrypt = require('bcryptjs')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

let token

beforeEach( async () => {
	await Blog.deleteMany({})
	await Blog.insertMany(helper.initialBlogs)

	await User.deleteMany({})
  
	const passwordHash = await bcrypt.hash('password3', 10)
	const user = new User({ username: 'username3', passwordHash })

	await user.save()

	const response = await api
		.post('/api/login')
		.send({ username: 'username3', password: 'password3' })

	token = response.body.token
})

test('blogs are returned as json', async () => {
	await api.get('/api/blogs').expect(200).expect('Content-Type', /application\/json/)
})

test('those are identified by field id', async () => {
	const response = await api
		.get('/api/blogs')
		.expect(200)
		.expect('Content-Type', /application\/json/)

	expect(response.body[0].id).toBeDefined()
})

test('a blog can be deleted', async () => {
	const aBlogAtStart = (await helper.blogsInDB())[0]

	console.log(aBlogAtStart.id)
	console.log(token)

	await api
		.delete(`/api/blogs/${aBlogAtStart.id}`)
		.set('Authorization', `using ${token}`)
		.expect(204)

	const blogsAtEnd = await helper.blogsInDB()

	console.log(blogsAtEnd)

	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

	const titles = blogsAtEnd.map(b => b.title)
	expect(titles).not.toContain(aBlogAtStart.title)
})

test('a blog can be edited', async () => {
	const aBlogAtStart = (await helper.blogsInDB())[0]
	const editedBlog = {
		...aBlogAtStart,
		likes: 99
	}

	await api
		.put(`/api/blogs/${aBlogAtStart.id}`)
		.set('Authorization', `using ${token}`)
		.send(editedBlog)
		.expect(200)

	const blogsAtEnd = await helper.blogsInDB()
	const aBlogAtEnd = blogsAtEnd.find(b => b.id === aBlogAtStart.id)
	expect(aBlogAtEnd.likes).toBe(99)
})

test('succeeds if content valid', async () => {
	const newBlog = {
		title: 'I test this third',	
		content: 'Believe me',
	}
  
	await api
		.post('/api/blogs')
		.send(newBlog)
		.set('Authorization', `bearer ${token}`)
		.expect(201)
		.expect('Content-Type', /application\/json/)
  
	const blogsAtEnd = await helper.blogsInDB()
	expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

	const titles = blogsAtEnd.map(b => b.title)
	expect(titles).toContain('Benefits of Scrumban')
})

afterAll(() => {
	mongoose.connection.close()
})