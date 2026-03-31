import axios from "axios";
const API = "https://movies-app-2oli.onrender.com/api";

// GENERO
export const getGeneros = () => axios.get(`${API}/genero`);
export const createGenero = (data) => axios.post(`${API}/genero`, data);
export const updateGenero = (id, data) => axios.put(`${API}/genero/${id}`, data);
export const deleteGenero = (id) => axios.delete(`${API}/genero/${id}`);

// DIRECTORES
export const getDirectores = () => axios.get(`${API}/director`);
export const createDirectores = (data) =>  axios.post(`${API}/director`, data);
export const updateDirectores = (id, data) => axios.put(`${API}/director/${id}`, data);
export const deleteDirectores = (id) => axios.delete(`${API}/director/${id}`);
// PRODUCTORAS
export const getProductoras = () => axios.get(`${API}/productora`);
export const createProductoras = (data) =>  axios.post(`${API}/productora`, data);
export const updateProductoras = (id, data) => axios.put(`${API}/productora/${id}`, data);
export const deleteProductoras = (id) => axios.delete(`${API}/productora/${id}`);
// TIPOS
export const getTipos = () => axios.get(`${API}/tipo`);
export const createTipos = (data) =>  axios.post(`${API}/tipo`, data);
export const updateTipos = (id, data) => axios.put(`${API}/tipo/${id}`, data);
export const deleteTipos = (id) => axios.delete(`${API}/tipo/${id}`);

// MEDIA / PELÍCULAS
export const getMedia = () => axios.get(`${API}/media`);
export const getMediaById = (id) => axios.get(`${API}/media/${id}`);
export const createMedia = (data) => axios.post(`${API}/media`, data);
export const updateMedia = (id, data) => axios.put(`${API}/media/${id}`, data);
export const deleteMedia = (id) => axios.delete(`${API}/media/${id}`);