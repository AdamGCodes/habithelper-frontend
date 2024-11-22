import axios from './interceptors';

const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/journals`

//!---Index
export const index = () => {
    return axios.get(BASE_URL)
}

//!---Show
export const show = (journalId) => {
    //Path = /journals/:journalId
    return axios.get(`${BASE_URL}/${journalId}/`)
}

//!---Create
export const create = (formData) => {
    return axios.post(`${BASE_URL}/`, formData)
}

//!---Update
export const update = (journalId, formData) => {
    //Path = /journals/:journalId
    return axios.put(`${BASE_URL}/${journalId}/`, formData)
}

//!---Delete
export const deleteJournal = (journalId) => {
    //Path = /journals/:journalId
    return axios.delete(`${BASE_URL}/${journalId}/`)
}