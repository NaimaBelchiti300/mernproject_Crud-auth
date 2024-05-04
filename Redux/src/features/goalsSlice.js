// goalsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.get('http://localhost:4000/api/goals', config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const addGoal = createAsyncThunk('goals/addGoal', async (newGoal, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.post('http://localhost:4000/api/goals', { text: newGoal }, config);
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const updateGoal = createAsyncThunk('goals/updateGoal', async ({ id, text }, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const response = await axios.put(`http://localhost:4000/api/goals/${id}`, { text }, config);
    return { id, text: response.data.text };
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

// Async thunk for deleting a goal
export const deleteGoal = createAsyncThunk('goals/deleteGoal', async (id, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.token;
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    await axios.delete(`http://localhost:4000/api/goals/${id}`, config);
    return id;
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

const goalsSlice = createSlice({
  name: 'goals',
  initialState: {
    goals: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGoals.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchGoals.fulfilled, (state, action) => {
        state.loading = false;
        state.goals = action.payload;
        state.error = null;
      })
      .addCase(fetchGoals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload ? action.payload.message : 'Failed to fetch goals';
      })
      .addCase(addGoal.fulfilled, (state, action) => {
        state.goals.push(action.payload);
      })
      .addCase(updateGoal.fulfilled, (state, action) => {
        const { id, text } = action.payload;
        state.goals = state.goals.map((goal) =>
          goal._id === id ? { ...goal, text } : goal
        );
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        const deletedGoalId = action.payload;
        state.goals = state.goals.filter((goal) => goal._id !== deletedGoalId);
      });
  },
});

export const selectGoals = (state) => state.goals.goals;
export const selectLoading = (state) => state.goals.loading;
export const selectError = (state) => state.goals.error;

export default goalsSlice.reducer;
