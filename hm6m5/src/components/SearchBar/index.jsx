import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import api from '../../common/api/movieApi';
import { APIKey } from '../../common/api/MovieApiKey';
import { setSearchResults, clearSearchResults } from '../../store/slices/searchSlice';
import '../SearchBar/search.scss'

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchQueryLocal, setSearchQueryLocal] = useState('');
  const activeCategory = useSelector((state) => state.movie.activeCategory);

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        if (searchQueryLocal.trim() !== '') {
          const searchType = activeCategory === 'movies' ? 'movie' : 'series';
          const response = await api.get(`?apikey=${APIKey}&s=${searchQueryLocal}&type=${searchType}`);
          dispatch(setSearchResults(response.data.Search || []));
        } else {
          dispatch(clearSearchResults());
        }
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    };

    fetchSearchResults();
  }, [dispatch, searchQueryLocal, activeCategory]);

  const handleSearchChange = (e) => {
    setSearchQueryLocal(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchQueryLocal}
        onChange={handleSearchChange}
        placeholder="Поиск..."
      />
    </div>
  );
};

export default SearchBar;