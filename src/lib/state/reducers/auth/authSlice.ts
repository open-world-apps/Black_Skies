import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
};

export const authAsync = createAsyncThunk('auth/authenticate', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authed: state => {
      state.isLoggedIn = true;
    },
    deauthed: state => {
      state.isLoggedIn = false;
    },
  },
});

export const selectAuthState = (state: RootState) => state.auth.isLoggedIn;

export const { authed, deauthed } = authSlice.actions;

export default authSlice.reducer;
