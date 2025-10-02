import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface CharState {
  activeChar: string;
}

const initialState: CharState = {
  activeChar: '',
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
  },
});

export const selectAuthState = (state: RootState) => state.char.activeChar;

export const { setActiveChar } = charSlice.actions;

export default charSlice.reducer;
