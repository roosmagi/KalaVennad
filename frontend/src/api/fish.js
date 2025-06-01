import axios from 'axios';

const API_URL = 'http://localhost:3002';

const token = () => localStorage.getItem('token');

export const getAllFishes = () => {
  return axios.get(`${API_URL}/fishes`);
};

export const getFishById = (id) => {
  return axios.get(`${API_URL}/fish/${id}`);
};

export const addFish = (formData) => {
  return axios.post(`${API_URL}/add-fish`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      Authorization: `Bearer ${token()}`,
    },
  });
};
