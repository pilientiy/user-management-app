import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Оголосіть інтерфейс User
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
}

interface UsersState {
  users: User[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: 'idle',
  error: null,
};

// Асинхронний thunk для отримання користувачів
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await axios.get<User[]>('https://jsonplaceholder.typicode.com/users');
  return response.data;
});

// Асинхронний thunk для додавання нового користувача
export const addUser = createAsyncThunk(
  'users/addUser',
  async (user: Omit<User, 'id'>) => {
    const response = await axios.post<User>('https://jsonplaceholder.typicode.com/users', user);
    return response.data;
  }
);

// Асинхронний thunk для видалення користувача
export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (userId: number) => {
    await axios.delete(`https://jsonplaceholder.typicode.com/users/${userId}`);
    return userId;
  }
);

const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch users';
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.users.push(action.payload);
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user.id !== action.payload);
      });
  },
});

export default userSlice.reducer;
