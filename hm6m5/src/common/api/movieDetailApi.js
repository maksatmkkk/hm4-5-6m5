// movieDetailApi.js

import axios from 'axios';
import { APIKey } from '../../common/api/MovieApiKey';

const movieDetailApi = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

export const fetchMovieDetails = async (imdbID) => {
  try {
    const response = await movieDetailApi.get(`?i=${imdbID}&apikey=${APIKey}&plot=full&type=movie`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
