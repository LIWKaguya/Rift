const mongoose = require('mongoose')

const todoSchema = new mongoose.Schema({
    task: {
        type: String,
        required: true
    },
    important: {
        type: String,
        required: true
    },
    date: Date 
})

todoSchema.set('toJSON', {
    transform: (_, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports = mongoose.model('Todo', todoSchema)