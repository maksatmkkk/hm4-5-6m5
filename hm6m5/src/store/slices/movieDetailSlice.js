import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { APIKey } from "../../common/api/MovieApiKey";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchMovieDetails = createAsyncThunk(
  "movieDetail/fetchMovieDetails",
  async (imdbID, { rejectWithValue }) => {
    try {
      const response = await axios.get(`http://www.omdbapi.com?i=${imdbID}&apikey=${APIKey}&plot=full&type=movie`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const movieDetailSlice = createSlice({
  name: "movieDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovieDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMovieDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default movieDetailSlice.reducer;
