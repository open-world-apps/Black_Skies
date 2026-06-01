import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { ModalKind, Toast } from '@/lib/types/types';

export interface UIState {
  theme: 'light' | 'dark';
  activeModal: ModalKind | null;
  menuOpen: boolean;
  sidebarCollapsed: boolean;
  soundEnabled: boolean;
  toastQueue: Toast[];
}

const initialState: UIState = {
  theme: 'dark',
  activeModal: null,
  menuOpen: false,
  sidebarCollapsed: true,
  soundEnabled: true,
  toastQueue: [],
};

export const uiAsync = createAsyncThunk('ui/open', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    openDlg: (state, action: PayloadAction<ModalKind>) => {
      state.activeModal = action.payload;
    },
    closeDlg: state => {
      state.activeModal = null;
    },
    lightMode: state => {
      state.theme = 'light';
    },
    darkMode: state => {
      state.theme = 'dark';
    },
    openMenu: state => {
      state.menuOpen = true;
    },
    closeMenu: state => {
      state.menuOpen = false;
    },
    enableSound: state => {
      state.soundEnabled = true;
    },
    disableSound: state => {
      state.soundEnabled = false;
    },
    addToast: (state, action: PayloadAction<Toast>) => {
      state.toastQueue.push(action.payload);
    },
    expireToast: state => {
      state.toastQueue.shift();
    },
    deleteToast: (state, action: PayloadAction<string>) => {
      const toDelete = state.toastQueue.filter(i => i.id == action.payload)[0];
      const idx = state.toastQueue.indexOf(toDelete);

      state.toastQueue.splice(idx, 1);
    },
  },
});

export const selectActiveModal = (state: RootState) => state.ui.activeModal;
export const selectTheme = (state: RootState) => state.ui.theme;
export const selectMenuOpen = (state: RootState) => state.ui.menuOpen;
export const selectSidebarCollapsed = (state: RootState) =>
  state.ui.sidebarCollapsed;
export const selectSoundEnabled = (state: RootState) => state.ui.soundEnabled;
export const selectToastQueue = (state: RootState) => state.ui.toastQueue;

export const {
  openDlg,
  closeDlg,
  lightMode,
  darkMode,
  openMenu,
  closeMenu,
  enableSound,
  disableSound,
  addToast,
  expireToast,
  deleteToast,
} = uiSlice.actions;

export default uiSlice.reducer;
