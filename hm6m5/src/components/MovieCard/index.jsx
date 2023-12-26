import React, { useEffect, useState } from 'react';
import '../MovieCard/movie.scss';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addMovieToFavorites, removeMovieFromFavorites, getFavorites } from '../../firebase/firestoreApi';

const MovieCard = ({ movie }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { Title, Year, Poster, imdbID } = movie;

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const userId = 'FavoriteMovie';
        const favorites = await getFavorites(userId);
        setIsFavorite(favorites.some((m) => m.imdbID === imdbID));
  
        const localStorageKey = `isFavorite_${imdbID}`;
        const isFavoriteFromStorage = localStorage.getItem(localStorageKey);
        if (isFavoriteFromStorage) {
          setIsFavorite(isFavoriteFromStorage === 'true');
        }
      } catch (error) {
        console.error('Error checking if movie is favorite:', error);
      }
    };
  
    checkIsFavorite();
  }, [imdbID]);
  
  

  const handleToggleFavorite = async () => {
    const userId = 'FavoriteMovies';
    try {
      if (isFavorite) {
        await removeMovieFromFavorites(userId, movie);
      } else {
        await addMovieToFavorites(userId, movie);
      }
  
      setIsFavorite(!isFavorite);
  
      const localStorageKey = `isFavorite_${imdbID}`;
      localStorage.setItem(localStorageKey, String(!isFavorite));
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };
  

  return (
    <div className='movieCard'>
      <Link to={`/movie/${imdbID}`} className='custom-link'>
        <img src={Poster} alt={Title} />
        <div className='title-year'>
          <p>{Title}</p>
          <p>{Year}</p>
        </div>
      </Link>
      <div className='favorite-div'>
        <FaHeart
          className={`favorite ${isFavorite ? 'active' : ''}`}
          onClick={handleToggleFavorite}
        />
      </div>
    </div>
  );
};

export default MovieCard;
