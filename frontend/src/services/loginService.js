import axios from "axios"
const baseUrl = '/api/login/'

const login = async (credentials, endpoint) => {
    const url = `${baseUrl}${endpoint}`
    const response = await axios.post(url, credentials)
    return response.data
}

export default { login }