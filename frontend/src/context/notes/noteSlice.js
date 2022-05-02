import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import noteService from './noteService'

const initialState = {
  notes: [],
  // Statuses and messages from server
  isError: false, 
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create a new note
export const createNote = createAsyncThunk('notes/createNote',
  async ({ ticketId, noteContent }, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await noteService.createNote(ticketId, noteContent, token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get all notes for a ticket
export const getNotes = createAsyncThunk('notes/getNotes',
  async (ticketId, thunkAPI) => {
    try {
      // fetch user token to access private route
      const token = thunkAPI.getState().auth.user.token

      return await noteService.getNotes(ticketId, token)

    } catch (error) {
      const message = (error.response && error.response.data && error.response.data.message)
        || error.message || error.toString()
      
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const noteSlice = createSlice ({
  name: 'note',
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
      .addCase(createNote.pending || getNotes.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getNotes.rejected || createNote.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(createNote.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes.push(action.payload)
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.notes = action.payload
      })
  }
})

export const {reset} = noteSlice.actions
export default noteSlice.reducer