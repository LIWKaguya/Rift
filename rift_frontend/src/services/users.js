import axios from 'axios'
const url = 'http://localhost:3002/api/users'

const register = async (newCredentials) => {
    const response = await axios.post(url, newCredentials)
    return response.data
}

const object = { register }

export default object

