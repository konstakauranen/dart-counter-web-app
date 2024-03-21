import axios from 'axios'
const baseUrl = 'http://localhost:8800/api/matches'

let token = null

const setToken = newToken => {
    token = `Bearer ${newToken}`
}

const getMatches = async () => {
    const matches = await axios.get(baseUrl, {
        headers: {
            Authorization: token,
        }
    })

    return matches.data
}

const createMatch = async matchData => {
    console.log(matchData)
    return axios.post(baseUrl, matchData, {
        headers: {
            Authorization: token, 
        }
    })
}

export default { setToken, getMatches, createMatch }

