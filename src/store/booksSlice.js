import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Async thunk for searching books
export const searchBooks = createAsyncThunk(
  'books/searchBooks',
  async (searchTerm, { rejectWithValue }) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    try {
      const response = await axios.get(`${backendUrl}/api/books/recommend/`, {
        params: { search: searchTerm },
      });
      return response.data;
    } catch (err) {
      console.error('Error fetching book:', err);
      return rejectWithValue('Failed to fetch books. Please try again.');
    }
  }
);

const booksSlice = createSlice({
  name: 'books',
  initialState: {
    searchResults: [],
    currentIndex: 0, // Tracks which book in the array is currently displayed
    loading: false,
    error: null,
  },
  reducers: {
    // Cycles to the next book in the recommendations list
    nextBook: (state) => {
      if (state.searchResults.length > 0) {
        state.currentIndex = (state.currentIndex + 1) % state.searchResults.length;
      }
    },
    // Reset index manually if needed
    resetStack: (state) => {
      state.currentIndex = 0;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(searchBooks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBooks.fulfilled, (state, action) => {
        state.loading = false;
        // Handles both if the response is directly an array or nested under a `data` key (e.g., action.payload.data)
        state.searchResults = Array.isArray(action.payload)
          ? action.payload
          : action.payload?.data || [];
        state.currentIndex = 0; // Reset index on new search results
      })
      .addCase(searchBooks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch books. Please try again.';
      });
  },
});

export const { nextBook, resetStack } = booksSlice.actions;
export default booksSlice.reducer;