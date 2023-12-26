import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchMovieDetails } from "../../store/slices/movieDetailSlice";
import "../movieDetail/movieDetail.scss";

const MovieDetail = () => {
  const { movieId } = useParams();
  const dispatch = useDispatch();
  const movieDetails = useSelector((state) => state.movieDetail);

  useEffect(() => {
    dispatch(fetchMovieDetails(movieId));
  }, [dispatch, movieId]);

  return (
    <div className="movie-detail-container">
      {movieDetails && movieDetails.loading && <p>Loading...</p>}
      {movieDetails && movieDetails.error && <p>Error: {movieDetails.error}</p>}
      {movieDetails && movieDetails.data && Object.keys(movieDetails.data).length > 0 && (
        <div className="movieDetail-main">

          <div className="movieLeft-container">
          <div className="movieDetail-left">
          <div className="title">{movieDetails.data.Title}</div>
          <div className="rating">
            <span>
              IMDB Rating <li className="star"></li>
              {movieDetails.data.imdbRating}
            </span>
            <span >
              IMDB Votes <li className="thumps-up"></li>
              {movieDetails.data.imdbVotes}
            </span>
            <span >
              Runtime <li className="film"></li>
              {movieDetails.data.Runtime}
            </span>
            <span>
              Year <li className="calendar"></li>
              {movieDetails.data.Year}
            </span>
          </div>
          </div>

          <div className="plot">{movieDetails.data.Plot}</div>

          <div className="info">
            <div>
              <span>Director</span>
              <span>{movieDetails.data.Director}</span>
            </div>
            <div>
              <span>Stars</span>
              <span>{movieDetails.data.Actors}</span>
            </div>
            <div>
              <span>Generes</span>
              <span>{movieDetails.data.Genre}</span>
            </div>
            <div>
              <span>Languages</span>
              <span>{movieDetails.data.Language}</span>
            </div>
            <div>
              <span>Awards</span>
              <span>{movieDetails.data.Awards}</span>
            </div>
          </div>
          </div>

          <div className="movieDetail-right">
            <img src={movieDetails.data.Poster} alt={movieDetails.data.Title} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
