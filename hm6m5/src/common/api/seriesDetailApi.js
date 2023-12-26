import axios from 'axios';
import { APIKey } from '../../common/api/MovieApiKey';

const seriesDetailApi = axios.create({
  baseURL: 'http://www.omdbapi.com',
});

export const fetchSeriesDetails = async (imdbID) => {
  try {
    const response = await seriesDetailApi.get(`?i=${imdbID}&apikey=${APIKey}&plot=full&type=series`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
