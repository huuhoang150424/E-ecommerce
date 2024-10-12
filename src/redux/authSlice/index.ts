import { createSlice, PayloadAction } from '@reduxjs/toolkit';
//import { login } from '../action/auth'

interface User {
  id: number;
  name: string;
  email: string;
}

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User | null;
  loading: boolean;
  error: boolean;
  success: boolean;
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null,
  loading: false,
  error: false,
  success: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = '';
      state.success = false;
    },
    upDateAuth: (state, action: PayloadAction<{ userD: User; token: string }>) => {
      state.user = action.payload.userD;
      state.isAuthenticated = true;
      state.token = action.payload.token;
    },
    testAuth: (state) => {
      state.isAuthenticated=true
    }
  },
  // extraReducers: (builder) => {
  //     builder
  //         .addCase(login.pending, (state) => {
  //             state.loading = true;
  //         })
  //         .addCase(login.fulfilled, (state, action: PayloadAction<{ token: string; message: string; other: User }>) => {
  //             state.success = true;
  //             state.isAuthenticated = true;
  //             state.loading = false;
  //             state.token = action.payload.token;
  //             state.message = action.payload.message;
  //             state.user = action.payload.other;
  //         })
  //         .addCase(login.rejected, (state, action: PayloadAction<{ message: string }>) => {
  //             state.loading = false;
  //             state.error = true;
  //             state.message = action.payload.message;
  //         })
  // },
});

export const { logout, upDateAuth,testAuth } = authSlice.actions;

// Các selector để lấy trạng thái từ store
export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectSuccess = (state: { auth: AuthState }) => state.auth.success;

export default authSlice.reducer;
