import { createSlice } from "@reduxjs/toolkit";

// favoriteSlice.js
const initialState = {
  count: 0,
  isFavorite: false,
};

const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    incrementFavoriteCount: (state) => {
      state.count += 1;
      state.isFavorite = true;
    },
    decrementFavoriteCount: (state) => {
      state.count -= 1;
      state.isFavorite = false;
    },
    clearFavoriteCount: (state) => {
      state.count = 0;
      state.isFavorite = false;
    },
  },
});

export const {
  incrementFavoriteCount,
  decrementFavoriteCount,
  clearFavoriteCount,
} = favoriteSlice.actions;
export default favoriteSlice.reducer;
