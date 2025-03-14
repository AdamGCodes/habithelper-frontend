import axios from './interceptors';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/timers`

//!---Index
export const index = () => {
    return axios.get(BASE_URL)
}

//!---Show
export const show = (timerId) => {
    //Path = /timers/:timerId
    return axios.get(`${BASE_URL}/${timerId}/`)
}

//!---Create
export const create = async (formData) => {
    return await axios.post(`${BASE_URL}/`, formData)
}

//!---Update
export const update = async (timerId, formData) => {
    //Path = /timer/:timerId
    return await axios.put(`${BASE_URL}/${timerId}/`, formData)
}

//!---Delete
export const deleteTimer = (timerId) => {
    //Path = /timer/:timerId
    return axios.delete(`${BASE_URL}/${timerId}/`)
}