import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from '../../common/api/movieApi';
import { APIKey } from '../../common/api/MovieApiKey';

export const getTVSeries = createAsyncThunk('series/getTVSeries', async () => {
  try {
    const response = await api.get(`?apikey=${APIKey}&s=${"Sweet home"}&type=series`);
    return response.data;
  } catch (error) {
    console.error("Error fetching TV series:", error);
    throw error; 
  }
});

const initialState = {
  shows: [],
  status: "loading",
};

const seriesSlice = createSlice({
  name: "series",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(
      getTVSeries.pending,
      (state) => {
        state.status = "loading";
      }
    );
    builder.addCase(
      getTVSeries.rejected,
      (state) => {
        state.status = "error";
        state.shows = [];
      }
    );
    builder.addCase(
      getTVSeries.fulfilled,
      (state, action) => {
        console.log("Fetched TV series:", action.payload);
        state.status = "success";
        state.shows = action.payload.Search || []; // Обновлено поле для хранения результатов
      }
    );
  },
});

export default seriesSlice.reducer;
export const {} = seriesSlice.actions;
