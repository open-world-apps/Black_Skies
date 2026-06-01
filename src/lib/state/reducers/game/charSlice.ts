import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CharState {
  activeChar: string;
  callsign: string;
}

const initialState: CharState = {
  activeChar: '',
  callsign: '',
};

export const charAsync = createAsyncThunk('game/character', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const charSlice = createSlice({
  name: 'char',
  initialState,
  reducers: {
    setActiveChar: (state, action: PayloadAction<string>) => {
      state.activeChar = action.payload;
    },
    setCallSign: (state, action: PayloadAction<string>) => {
      state.callsign = action.payload;
    },
  },
});

export const selectAuthState = (state: RootState) => state.char.activeChar;
export const selectCallsign = (state: RootState) => state.char.callsign;

export const { setActiveChar, setCallSign } = charSlice.actions;

export default charSlice.reducer;
