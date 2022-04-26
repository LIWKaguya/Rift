const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const getToken = (req) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('using ')) {
		return authorization.substring(6)
	}
	return null
}

blogsRouter.get('/', async(_, res) => {
	const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})

	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id)

	if(blog) {
		res.json(blog.toJSON())
	} else {
		res.status(404).end()
	}
})

blogsRouter.post('/', async (req, res) => {
	const { content } = req.body
    
	const token = getToken(req)
	console.log(token)
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if(!token || !decodedToken.id) {
		return res.status(401).json({
			error: 'token missing or invalid'
		})
	}

	const user = await User.findById(decodedToken.id)

	const blog = new Blog({
		content, 
		likes: 0,
		user: user._id,
		comments: []
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', async (req, res) => {
	await Blog.findByIdAndRemove(req.params.id)
	res.status(204).end()
})

blogsRouter.put('/:id', async (req, res) => {
	const { content } = req.body
	const foundBlog = await Blog.findById(req.params.id)
	const blog = {
		...foundBlog,
		content
	}

	const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true})
	res.json(updatedBlog)
})

module.exports = blogsRouter