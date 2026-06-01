import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface AuthState {
  isLoggedIn: boolean;
  userId?: string;
  callsign?: string;
  activeChar?: string;
  roles: string[];
  isAdmin: boolean;
}

const initialState: AuthState = {
  isLoggedIn: false,
  isAdmin: false,
  roles: ['Guest'],
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
    setUserId: (state, action: PayloadAction<string>) => {
      state.userId = action.payload;
    },
    setActiveChar: (state, action: PayloadAction<string>) => {
      state.activeChar = action.payload;
    },
    setCallsign: (state, action: PayloadAction<string>) => {
      state.callsign = action.payload;
    },
    grantAdmin: state => {
      state.isAdmin = true;
    },
    revokeAdminPrivileges: state => {
      state.isAdmin = false;
    },
  },
});

export const selectAuthState = (state: RootState) => state.auth.isLoggedIn;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectRoles = (state: RootState) => state.auth.roles;
export const selectAdminState = (state: RootState) => state.auth.isAdmin;
export const selectCallsign = (state: RootState) => state.auth.callsign;
export const selectActiveChar = (state: RootState) => state.auth.activeChar;

export const {
  authed,
  deauthed,
  setUserId,
  grantAdmin,
  revokeAdminPrivileges,
  setActiveChar,
  setCallsign,
} = authSlice.actions;

export default authSlice.reducer;
