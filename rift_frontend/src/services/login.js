import axios from 'axios'
const url = 'http://localhost:3002/api/login'

const authenticate = async (credentials) => {
    const response = await axios.post(url, credentials)
    return response.data
}

const object = { authenticate }

export default object