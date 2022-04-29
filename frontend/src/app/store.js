import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../context/auth/authSlice'
import ticketReducer from '../context/tickets/ticketSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    tickets: ticketReducer,
  },
});
