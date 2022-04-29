const Blog = require('../models/blog')

const initialBlogs = [
	{
		title: 'Test this first',
		content: 'I test this first'
	},
	{
		title: 'Test this second',
		content: 'I test this second'
	}
]

const nonExistingId = async () => {
	const blog = new Blog({
		title: 'Test this third',
		content: 'I test this third'
	})
	await blog.save()
	await blog.remove()
	return blog._id.toString()
} 

const blogsInDB = async () => {
	const blogs = await Blog.find({})
	return blogs.map(b => b.toJSON())
}

module.exports = {
	initialBlogs, nonExistingId, blogsInDB
}