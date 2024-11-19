import { setToken } from '../utils/auth'
import axios from './interceptors'

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/users`

//Sign up a user
export const signup = async (formData) => {
    const { data } = await axios.post(`${BASE_URL}/signup/`, formData)

    //Set token to local storage
    if(data.token) {
        setToken(data.token)
    }
    return data
}

//Sign up a user
export const signin = async (formData) => {
    const { data } = await axios.post(`${BASE_URL}/signin/`, formData)

    //Set token to local storage
    if(data.token) {
        setToken(data.token)
    }
    return data
}