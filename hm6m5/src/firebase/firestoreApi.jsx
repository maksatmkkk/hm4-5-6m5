import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import app from './firebaseApi';

export const addMovieToFavorites = async (FavoriteMovies, movie) => {
  try {
    const favoritesRef = doc(getFirestore(app), 'favorites', FavoriteMovies);

    const favoritesSnapshot = await getDoc(favoritesRef);
    const favoritesData = favoritesSnapshot.data() || { movies: [] };

    const moviesArray = favoritesData.movies || [];

    if (!moviesArray.some((m) => m.imdbID === movie.imdbID)) {
      const updatedFavorites = {
        movies: [...moviesArray, movie],
      };

      await setDoc(favoritesRef, updatedFavorites);
      return updatedFavorites.movies;
    }

    return moviesArray;
  } catch (error) {
    console.error('Error adding movie to favorites:', error);
    throw error;
  }
};

export const addSeriesToFavorites = async (FavoriteSeries, series) => {
  try {
    const favoritesRef = doc(getFirestore(app), 'favorites', FavoriteSeries);

    const favoritesSnapshot = await getDoc(favoritesRef);
    const favoritesData = favoritesSnapshot.data() || { series: [] };

    const seriesArray = favoritesData.series || [];

    if (!seriesArray.some((s) => s.imdbID === series.imdbID)) {
      const updatedFavorites = {
        series: [...seriesArray, series],
      };

      await setDoc(favoritesRef, updatedFavorites);
      return updatedFavorites.series;
    }

    return seriesArray;
  } catch (error) {
    console.error('Error adding series to favorites:', error);
    throw error;
  }
};

export const getFavorites = async (userId) => {
  try {
    const favoritesRef = doc(getFirestore(app), 'favorites', userId);
    const favoritesSnapshot = await getDoc(favoritesRef);

    if (favoritesSnapshot.exists()) {
      const favoritesData = favoritesSnapshot.data();
      return favoritesData.movies || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error('Error getting favorites:', error);
    throw error;
  }
};

export const removeSeriesFromFavorites = async (FavoriteSeries, series) => {
  try {
    const favoritesRef = doc(getFirestore(app), 'favorites', FavoriteSeries);

    const favoritesSnapshot = await getDoc(favoritesRef);
    const favoritesData = favoritesSnapshot.data() || { series: [] };

    const seriesArray = favoritesData.series || [];

    const seriesIndex = seriesArray.findIndex((s) => s.imdbID === series.imdbID);

    if (seriesIndex !== -1) {
      const updatedSeriesArray = [
        ...seriesArray.slice(0, seriesIndex),
        ...seriesArray.slice(seriesIndex + 1),
      ];

      await setDoc(favoritesRef, { series: updatedSeriesArray });
      return updatedSeriesArray;
    }

    return seriesArray;
  } catch (error) {
    console.error('Error removing series from favorites:', error);
    throw error;
  }
};


export const removeMovieFromFavorites = async (FavoriteMovies, movie) => {
  try {
    const favoritesRef = doc(getFirestore(app), 'favorites', FavoriteMovies);

    const favoritesSnapshot = await getDoc(favoritesRef);
    const favoritesData = favoritesSnapshot.data() || { movies: [] };

    const moviesArray = favoritesData.movies || [];

    const movieIndex = moviesArray.findIndex((m) => m.imdbID === movie.imdbID);

    if (movieIndex !== -1) {
      const updatedMoviesArray = [
        ...moviesArray.slice(0, movieIndex),
        ...moviesArray.slice(movieIndex + 1),
      ];

      await setDoc(favoritesRef, { movies: updatedMoviesArray });
      return updatedMoviesArray;
    }

    return moviesArray;
  } catch (error) {
    console.error('Error removing movie from favorites:', error);
    throw error;
  }
};



