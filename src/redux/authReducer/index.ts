import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { loginAuth } from '../action/auth'

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string;
  phone: number;
  gender: string;
  address: string[];
  birth_date: any | "";
}

interface AuthState {
  isAuthenticated: boolean;
  token: string;
  user: User | null;
  loading: boolean;
  error: boolean;
  message: string;
  success: boolean
}

const initialState: AuthState = {
  isAuthenticated: false,
  token: '',
  user: null,
  loading: false,
  error: false,
  message: '',
  success: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState
    },
    updateToken: (state,action)=>{
      state.token=action.payload.token;
    },
    resetAuthState: (state)=>{
      state.message='';
      state.loading=false;
      state.error=false;
    },
    updateAuth: (state, action:  PayloadAction<{ data: User }>) => {
      console.log(action.payload.data);
      state.user = {
        ...state.user, 
        ...action.payload.data
      };
    },
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
      .addCase(loginAuth.rejected, (state,action:any) => {
        state.loading = false;
        state.error = true;
        state.message =action.payload.data.non_field_errors[0];
      });
  },
});

export const { logout,updateToken ,resetAuthState,updateAuth} = authSlice.actions;

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated;
export const selectToken = (state: { auth: AuthState }) => state.auth.token;
export const selectUser = (state: { auth: AuthState }) => state.auth.user;
export const selectLoading = (state: { auth: AuthState }) => state.auth.loading;
export const selectError = (state: { auth: AuthState }) => state.auth.error;
export const selectMessage = (state: { auth: AuthState }) => state.auth.message;
export const selectSuccess = (state: { auth: AuthState }) => state.auth.success;

export default authSlice.reducer;
