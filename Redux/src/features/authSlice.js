// authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const loginUser = createAsyncThunk('auth/loginUser', async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const loginResponse = await axios.post('http://localhost:4000/api/users/login', userData, config);
  
      localStorage.setItem('token', loginResponse.data.token);
  
      const authConfig = {
        headers: {
          Authorization: `Bearer ${loginResponse.data.token}`,
        },
      };
      const meResponse = await axios.get('http://localhost:4000/api/users/me', authConfig);
  
      const user = meResponse.data;
  
      return {
        token: loginResponse.data.token,
        user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  

export const registerUser = createAsyncThunk('auth/registerUser', async (userData, thunkAPI) => {
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const registerResponse = await axios.post('http://localhost:4000/api/users', userData, config);
  
      const authConfig = {
        headers: {
          Authorization: `Bearer ${registerResponse.data.token}`,
        },
      };
      const meResponse = await axios.get('http://localhost:4000/api/users/me', authConfig);
  
      const user = meResponse.data;
  
      return {
        token: registerResponse.data.token,
        user,
      };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  });
  

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    token: localStorage.getItem('token') || null,
    user: null,
    loading: false,
    error: null,
  },
  reducers: {
    logoutUser: (state) => {
      localStorage.removeItem('token');
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.token = action.payload.token;
        state.user = action.payload.user;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to login';
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to register';
      });
  },
});

export const { logoutUser } = authSlice.actions;
export const selectToken = (state) => state.auth.token;
export const selectUser = (state) => state.auth.user;
export const selectLoading = (state) => state.auth.loading;
export const selectError = (state) => state.auth.error;

export default authSlice.reducer;
