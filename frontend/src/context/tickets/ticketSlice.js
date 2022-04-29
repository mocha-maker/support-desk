import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ticketService from './ticketService'


const initialState = {
  tickets: [],
  ticket: {},
  // Statuses and messages from server
  isError: false, 
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create a new ticket
export const createTicket = createAsyncThunk('ticket/createTicket',
  async (ticketData, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await ticketService.createTicket(ticketData, token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all user's tickets
export const getTickets = createAsyncThunk('ticket/getTickets',
  async (_, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await ticketService.getTickets(token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get a single ticket
export const getTicket = createAsyncThunk('ticket/getTicket',
  async (ticketId, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await ticketService.getTicket(ticketId,token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const ticketSlice = createSlice ({
  name: 'ticket',
  initialState,
  reducers: {
    // Reset auth state after function calls
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    }
  },
  extraReducers: (builder) => {
    // add cases / actions

    builder
      .addCase(createTicket.pending || getTickets.pending || getTicket.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getTickets.rejected || createTicket.rejected || getTicket.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createTicket.fulfilled, (state) => {
        state.isLoading = false
        state.isSuccess = true
      })
      .addCase(getTickets.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.tickets = action.payload
      })
      .addCase(getTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
  }
})

export const {reset} = ticketSlice.actions
export default ticketSlice.reducer