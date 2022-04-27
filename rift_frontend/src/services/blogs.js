import axios from 'axios'
const url = 'http://localhost:3002/api'

// eslint-disable-next-line no-unused-vars
let token = null

const setToken = (newToken) => {
    token = `using ${newToken}`
}

const getAll =  async () => {
    const response =  await axios.get(`${url}/blogs`)
    return response.data
}

const object = { getAll, setToken }

export default object