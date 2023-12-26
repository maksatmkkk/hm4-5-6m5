import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: {
    searchResults: [],
    status: "loading",
    searchQuery: "",
  },
  reducers: {
    setSearchResults: (state, action) => {
      state.searchResults = action.payload;
      state.status = "success";
    },
    setSearchStatus: (state, action) => {
      state.status = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearSearchResults: (state) => {
      state.searchResults = [];
      state.status = "loading";
    },
  },
});

export const {
  setSearchResults,
  setSearchStatus,
  setSearchQuery,
  clearSearchResults,
} = searchSlice.actions;

export default searchSlice.reducer;
