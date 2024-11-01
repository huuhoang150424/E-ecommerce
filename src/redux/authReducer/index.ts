import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAuth } from '../action/auth'

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string
}

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User | null;
  loading: boolean;
  error: boolean;
  message: string;
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null,
  loading: false,
  error: false,
  message: '',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(loginAuth.fulfilled, (state, action: PayloadAction<{ accessToken: string; message: string; user: User }>) => {
        state.isAuthenticated = true;
        state.loading = false;
        state.token = action.payload.accessToken;
        state.message = action.payload.message;
        state.user = action.payload.user;
      })
      .addCase(loginAuth.rejected, (state) => {
        state.loading = false;
        state.error = true;
        //state.message = action.payload.message;
      });
  },
});

export const { logout } = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectMessage = (state: { auth: AuthState }) => state.auth.message;

export default authSlice.reducer;
