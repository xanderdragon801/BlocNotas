import axios from 'axios';

const BASE_URL = "https://backend-blocnotas-production.up.railway.app";

export const api = axios.create({ baseURL: `${BASE_URL}/api` });

export const fetchNotes = async () => (await api.get('/notes')).data;
export const createNote = async (payload) => (await api.post('/notes', payload)).data;
export const updateNote = async (id, payload) => (await api.put(`/notes/${id}`, payload)).data;
export const deleteNote = async (id) => api.delete(`/notes/${id}`);