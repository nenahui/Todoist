import { userLogin } from '@/features/Auth/authThunks';
import type { User } from '@/types';
import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  user: User | null;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(userLogin.fulfilled, (state, { payload: apiUser }) => {
        state.user = apiUser;
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state) => {
        state.isLoading = false;
      });
  },
  selectors: {
    selectAuthUser: (state) => state.user,
    selectAuthLoading: (state) => state.isLoading,
  },
});

export const { selectAuthLoading, selectAuthUser } = authSlice.selectors;
