import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  // Statuses and messages from server
  isError: false, 
  isSuccess: false,
  isLoading: false,
  message: '',
}

export const authSlice = createSlice ({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Used add cases / functions
  }
})

export default authSlice.reducer