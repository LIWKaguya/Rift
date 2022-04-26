const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async(_, res) => {
	const users = await User.find({}).populate('blogs', {content : 1, likes : 1, comments: 1})

	res.json(users)
})

usersRouter.post('/', async (req, res) => {
	const {username, name, password} = req.body

	const existed = await User.findOne({ username })
	if(existed) {
		return res.status(400).json({
			error: 'username must be unique'
		})
	}

	const saltRounds = 11
	const passwordHash = await bcrypt.hash(password, saltRounds)

	const user = new User({
		username, 
		name,
		passwordHash
	})

	const savedUser = await user.save()

	res.status(201).json(savedUser)
})

module.exports = usersRouter