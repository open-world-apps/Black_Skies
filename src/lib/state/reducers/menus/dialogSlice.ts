import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface DialogState {
  open: boolean;
}

const initialState: DialogState = {
  open: false,
};

export const dialogAsync = createAsyncThunk('dialog/open', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    openDlg: state => {
      state.open = true;
    },
    closeDlg: state => {
      state.open = false;
    },
    dlgGateKeeper: (state, action: PayloadAction<boolean>) => {
      state.open = action.payload;
    },
  },
});

export const selectMenuState = (state: RootState) => state.menu.open;

export const { openDlg, closeDlg, dlgGateKeeper } = dialogSlice.actions;

export default dialogSlice.reducer;
