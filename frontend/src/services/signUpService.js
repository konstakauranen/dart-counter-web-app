import axios from "axios"
const baseUrl = '/api/login/register'

const SignUp = async credentials => {
    const response = await axios.post(baseUrl, credentials)
    return response.data
}

export default { SignUp }