const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
	title: String,
	content: {
		type: String,
		required: true
	},
	likes: {
		type: Number,
		default: 0
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	}, 
	comments : [ 
		{
			type: String 
		}
	]
})

blogSchema.set('toJSON', {
	transform: (_, returnedObject) => {
		returnedObject.id = returnedObject._id.toString()
		delete returnedObject._id
		delete returnedObject.__v
	}
})

module.exports = mongoose.model('Blog', blogSchema)