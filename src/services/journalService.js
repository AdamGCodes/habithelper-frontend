import axios from './interceptors';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/journals`

//!---Index
export const index = () => {
    return axios.get(BASE_URL)
}

//!---Show
export const show = (id) => {
    return axios.get(`${BASE_URL}/${id}/`)
}

//!---Create
export const create = (formData) => {
    return axios.post(BASE_URL, formData)
}

//!---Update
export const update = (id, formData) => {
    return axios.put(`${BASE_URL}/${id}/`, formData)
}

//!---Delete
export const deleteJournal = (id) => {
    return axios.delete(`${BASE_URL}/${id}/`)
}