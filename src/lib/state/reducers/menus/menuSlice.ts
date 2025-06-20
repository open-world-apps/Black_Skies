import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface MenuState {
  open: boolean;
}

const initialState: MenuState = {
  open: false,
};

export const menuAsync = createAsyncThunk('menu/open', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    open: state => {
      state.open = true;
    },
    close: state => {
      state.open = false;
    },
    gateKeeper: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const selectMenuState = (state: RootState) => state.menu.open;

export const { open, close, gateKeeper } = menuSlice.actions;

export default menuSlice.reducer;
