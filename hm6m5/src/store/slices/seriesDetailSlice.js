import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchSeriesDetails } from "../../common/api/seriesDetailApi";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchSeriesDetailsData = createAsyncThunk(
  "seriesDetail/fetchSeriesDetails",
  async (imdbID, { rejectWithValue }) => {
    try {
      if (!imdbID) {
        console.error("imdbID is undefined");
        return rejectWithValue("imdbID is undefined");
      }

      const response = await fetchSeriesDetails(imdbID);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const seriesDetailSlice = createSlice({
  name: "seriesDetail",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSeriesDetailsData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSeriesDetailsData.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchSeriesDetailsData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default seriesDetailSlice.reducer;
