import axios from 'axios'
const url = 'http://localhost:3002/api'

const getAll =  async () => {
    const response =  await axios.get(`${url}/blogs`)
    return response.data
}

const object = { getAll }

export default object