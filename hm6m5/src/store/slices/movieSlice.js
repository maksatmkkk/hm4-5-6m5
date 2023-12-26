import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../common/api/movieApi';
import { APIKey } from '../../common/api/MovieApiKey';

export const getMovies = createAsyncThunk('movies/getMovies', async () => {
  try {
    const response = await api.get(`?apikey=${APIKey}&s=${"Spider Man"}&type=movie`);
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error; 
  }
});

const initialState = {
  movies: [],
  movieInfo: {},
  status: "loading",
};

const movieSlice = createSlice({
  name: "movie",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getMovies.pending,
      (state) => {
        state.status = "loading";
      }
    );
    builder.addCase(
      getMovies.rejected,
      (state) => {
        state.status = "error";
        state.movies = [];
      }
    );
    builder.addCase(
      getMovies.fulfilled,
      (state, action) => {
        console.log("Fetched movies:", action.payload);
        state.status = "success";
        state.movies = action.payload;
      }
    );
  },
});

export default movieSlice.reducer;
export const {} = movieSlice.actions;