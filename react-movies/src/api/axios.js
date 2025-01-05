import axios from 'axios';

// Set up a base URL for all API requests
const api = axios.create({
  baseURL: 'http://localhost:8080/api', 
  timeout: 10000, //Set a timeout for the requests
});

// Function to fetch movies
export const fetchMovies = async () => {
  try {
    const response = await api.get('/movies');
    return response.data;
  } catch (error) {
    console.error('Error fetching movies:', error);
    throw error; 
  }
};

// Function to fetch actors
export const fetchActors = async () => {
  try {
    const response = await api.get('/actors');
    return response.data; 
  } catch (error) {
    console.error('Error fetching actors:', error);
    throw error; 
  }
};
