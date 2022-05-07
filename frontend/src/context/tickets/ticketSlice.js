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

// Close a ticket
export const closeTicket = createAsyncThunk('ticket/close',
  async (ticketId, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await ticketService.closeTicket(ticketId, token)

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

export const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    // Reset state after function calls
    reset: (state) => {
      state.isLoading = false
      state.isError = false
      state.isSuccess = false
      state.message = ''
    },
    clear: (state) => {
      state.tickets = []
      state.ticket = {}
    },
  },
  extraReducers: (builder) => {
    // add cases / actions

    builder
      .addCase(
        createTicket.pending ||
          getTickets.pending ||
          getTicket.pending ||
          closeTicket.pending,
        (state) => {
          state.isLoading = true
        }
      )
      .addCase(
        getTickets.rejected ||
          createTicket.rejected ||
          getTicket.rejected ||
          closeTicket.rejected,
        (state, action) => {
          state.isLoading = false
          state.isError = true
          state.message = action.payload
        }
      )
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
      .addCase(closeTicket.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.ticket = action.payload
      })
  },
})

export const { reset, clear } = ticketSlice.actions
export default ticketSlice.reducer