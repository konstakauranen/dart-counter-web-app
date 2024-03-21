import axios from "axios"
const baseUrl = 'http://localhost:8800/api/login/'

const login = async (credentials, endpoint) => {
    const url = `${baseUrl}${endpoint}`
    const response = await axios.post(url, credentials)
    return response.data
}

export default { login }