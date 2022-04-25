require('dotenv').config()

const PORT = process.env.PORT 
const URI = process.env.NODE_ENV === 'test' ? process.env.TEST_URI : process.env.REAL_URI

module.exports = {
	PORT, URI
}