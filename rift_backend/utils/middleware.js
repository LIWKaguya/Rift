const User = require('../models/user')
const logger = require('./logger')
const jwt = require('jsonwebtoken')

const requestLogger = (req, _, next) => {
	logger.info('Method:', req.method)
	logger.info('Path:  ', req.path)
	logger.info('Body:  ', req.body)
	logger.info('---')
	next()
}

const unknownEndpoint = (_, res) => {
	res.status(404).send({ error: 'unknown endpoint' })
}
  
const errorHandler = (err, _, res, next) => {
	logger.error(err.message)
  
	if (err.name === 'CastError') {
		return res.status(400).send({ error: 'malformatted id' })
	} else if (err.name === 'ValidationError') {
		return res.status(400).json({ error: err.message })
	} else if (err.name === 'JsonWebTokenError') {
		return res.status(401).json({
			error: 'invalid token'
		})
	}
  
	next(err)
}

const tokenExtractor = (req, _, next) => {
	const authorization = req.get('authorization')
	if (authorization && authorization.toLowerCase().startsWith('using ')) {
		req.token = authorization.substring(6)
	}
	next()
}

const userExtractor = async (req, res, next) => {
	const { token } = req
	const decodedToken = jwt.verify(token, process.env.SECRET)
	if(!token || !decodedToken.id) {
		return res.status(401).json({
			error: 'token missing or invalid'
		})
	}
	req.user = await User.findById(decodedToken.id)
	next()
}

module.exports = {
	requestLogger,  unknownEndpoint, errorHandler, tokenExtractor, userExtractor
}