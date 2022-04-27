const blogsRouter = require('express').Router()

const middleware = require('../utils/middleware')
const Blog = require('../models/blog')

blogsRouter.get('/', async(_, res) => {
	const blogs = await Blog.find({}).populate('user', {username : 1, name : 1})

	res.json(blogs)
})

blogsRouter.get('/:id', async (req, res) => {
	const blog = await Blog.findById(req.params.id).populate('user', {username : 1, name : 1})
	if(blog) {
		res.json(blog.toJSON())
	} else {
		res.status(404).end()
	}
})

blogsRouter.post('/', middleware.userExtractor, async (req, res) => {
	const { user } = req
	const { title, content } = req.body

	const blog = new Blog({
		title,
		content, 
		likes: 0,
		user: user,
		comments: []
	})

	const savedBlog = await blog.save()
	user.blogs = user.blogs.concat(savedBlog._id)
	await user.save()

	res.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (req, res) => {
	const { user } = req
	const blog = await Blog.findById(req.params.id)
	if(blog.user.toString() == user.id) {
		await blog.remove()
		return res.status(204).json({
			'notification' : 'suscessfully deleted'
		})
	}
	return res.status(403).json({
		error: 'user is not allowed'
	})
})

blogsRouter.put('/:id', middleware.userExtractor, async (req, res) => {
	const { content, likes,  title, comments } = req.body
	const { user } = req
	const blog = await Blog.findById(req.params.id)
	if(blog.user.toString() == user.id) {
		const updatedBlog =  {
			content,
			likes,
			title,
			comments,
			user
		}
		const newBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {new: true})
		res.status(200).json(newBlog)
	}
	return res.status(403).json({
		error: 'user is not allowed'
	})
})

blogsRouter.put('/:id/likes', async (req, res) => {
	const { content, likes,  title, comments, user } = req.body
	const updatedBlog = {
		content,
		likes: likes+1,
		title,
		comments,
		user
	}
	const newBlog = await Blog.findByIdAndUpdate(req.params.id, updatedBlog, {new: true})
	console.log(newBlog)
	res.status(200).json(newBlog)
})

module.exports = blogsRouter