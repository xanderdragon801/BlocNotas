import axios from 'axios';
import Constants from 'expo-constants';

const BASE_URL =
  Constants.expoConfig?.extra?.BACKEND_URL ||
  Constants.easConfig?.extra?.BACKEND_URL ||
  'http://localhost:4000';

export const api = axios.create({ baseURL: `${BASE_URL}/api` });

export const fetchNotes = async () => (await api.get('/notes')).data;
export const createNote = async (payload) => (await api.post('/notes', payload)).data;
export const updateNote = async (id, payload) => (await api.put(`/notes/${id}`, payload)).data;
export const deleteNote = async (id) => api.delete(`/notes/${id}`);
