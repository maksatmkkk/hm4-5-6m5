import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard';
import SeriesCard from '../SeriesCard';
import { useDispatch, useSelector } from 'react-redux';
import { getMovies } from '../../store/slices/movieSlice';
import { getTVSeries } from '../../store/slices/seriesSlice';
import '../MovieListing/movieListing.scss';

const MovieListing = () => {
  const dispatch = useDispatch();
  const [activeCategory, setActiveCategory] = useState('movies');

  const { movies, status: movieStatus } = useSelector((state) => state.movie || { movies: [], status: 'loading' });
  const { shows, status: seriesStatus } = useSelector((state) => state.series || { shows: [], status: 'loading' });
  const { searchResults, status: searchStatus } = useSelector((state) => state.search || { searchResults: [], status: 'loading' });

  useEffect(() => {
    if (activeCategory === 'movies') {
      dispatch(getMovies());
    } else {
      dispatch(getTVSeries());
    }
  }, [dispatch, activeCategory]);

  const isSearchResultsForMovies = searchStatus === 'success' && Array.isArray(searchResults) && searchResults.length > 0 && activeCategory === 'movies';
  const isSearchResultsForSeries = searchStatus === 'success' && Array.isArray(searchResults) && searchResults.length > 0 && activeCategory === 'series';

  return (
    <div className='movieListing'>
      <div className="section-buttons">
        <h2 onClick={() => setActiveCategory('movies')}>Movies</h2>
        <h2 onClick={() => setActiveCategory('series')}>Shows</h2>
      </div>
      <div className="content">
        {activeCategory === 'movies' && (
          <>
            {isSearchResultsForMovies && (
              <div className="movie-container">
                {searchResults
                  .slice() 
                  .sort((a, b) => a.Title.localeCompare(b.Title))
                  .map((movie) => (
                    <MovieCard key={movie.imdbID} movie={movie} />
                  ))}
              </div>
            )}
            {movieStatus === 'loading' && <p>Loading movies...</p>}
            {movieStatus === 'error' && <p>Error loading movies.</p>}
            {movieStatus === 'success' && !isSearchResultsForMovies && movies.Search && Array.isArray(movies.Search) && (
              <div className="movie-container">
                {movies.Search.map((movie) => (
                  <MovieCard key={movie.imdbID} movie={movie} />
                ))}
              </div>
            )}
          </>
        )}

        {activeCategory === 'series' && (
          <>
            {seriesStatus === 'loading' && <p>Loading shows...</p>}
            {seriesStatus === 'error' && <p>Error loading shows.</p>}
            {isSearchResultsForSeries && (
              <div className="movie-container">
                {searchResults.map((show) => (
                  <SeriesCard key={show.imdbID} series={show} />
                ))}
              </div>
            )}
            {seriesStatus === 'success' && !isSearchResultsForSeries && shows && Array.isArray(shows) && shows.length > 0 && (
              <div className="movie-container">
                {shows.map((show) => (
                  <SeriesCard key={show.imdbID} series={show} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieListing;