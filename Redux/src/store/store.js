// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import goalsReducer from '../features/goalsSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalsReducer,
  },
});

export default store;
