import React, { useEffect, useState } from 'react';
import '../MovieCard/movie.scss';
import { FaHeart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { addSeriesToFavorites, removeSeriesFromFavorites, getFavorites } from '../../firebase/firestoreApi';

const SeriesCard = ({ series }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const { Title, Year, Poster, imdbID } = series;

  useEffect(() => {
    const checkIsFavorite = async () => {
      try {
        const userId = 'FavoriteSeries';
        const favorites = await getFavorites(userId);
        setIsFavorite(favorites.some((s) => s.imdbID === imdbID));
  
        const localStorageKey = `isFavorite_${imdbID}`;
        const isFavoriteFromStorage = localStorage.getItem(localStorageKey);
        if (isFavoriteFromStorage) {
          setIsFavorite(isFavoriteFromStorage === 'true');
        }
      } catch (error) {
        console.error('Error checking if series is favorite:', error);
      }
    };
  
    checkIsFavorite();
  }, [imdbID]);
  
  

  const handleToggleFavorite = async () => {
    const userId = 'FavoriteSeries';
    try {
      if (isFavorite) {
        await removeSeriesFromFavorites(userId, series);
      } else {
        await addSeriesToFavorites(userId, series);
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
      <Link to={`/series/${imdbID}`} className='custom-link'>
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

export default SeriesCard;
