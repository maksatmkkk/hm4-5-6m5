import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchSeriesDetailsData } from "../../store/slices/seriesDetailSlice";

const SeriesDetail = () => {
  const { seriesId } = useParams();
  const dispatch = useDispatch();
  const seriesDetails = useSelector((state) => state.seriesDetail);

  useEffect(() => {
    dispatch(fetchSeriesDetailsData(seriesId));
  }, [dispatch, seriesId]);


  return (
    <div>
      {seriesDetails && seriesDetails.loading && <p>Loading...</p>}
      {seriesDetails && seriesDetails.error && <p>Error: {seriesDetails.error}</p>}
      {seriesDetails && seriesDetails.data && Object.keys(seriesDetails.data).length > 0 && (
        <div>
          <h1>{seriesDetails.data.Title}</h1>
          <img src={seriesDetails.data.Poster} alt={seriesDetails.data.Title} />
          <p>Year: {seriesDetails.data.Year}</p>
          <p>Plot: {seriesDetails.data.Plot}</p>
        </div>
      )}
    </div>
  );
};

export default SeriesDetail;
