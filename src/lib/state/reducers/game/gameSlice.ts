import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

export interface GameState {
  live: boolean;
  connected: boolean;
  currentTick?: number;
  inCombat: boolean;
  mapCoords?: [number, number, number?];
  unreadMsgCnt: number;
}

const initialState: GameState = {
  live: false,
  connected: false,
  inCombat: false,
  unreadMsgCnt: 0,
};

export const gameAsync = createAsyncThunk('game/game', async () => {
  // const res = await authenticate();
  // return res.data;
});

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    gameLive: state => {
      state.live = true;
    },
    gameOffline: state => {
      state.live = false;
    },
    incrementUMsgCnt: state => {
      state.unreadMsgCnt++;
    },
    decrementUMsgCnt: state => {
      state.unreadMsgCnt--;
    },
    connect: state => {
      state.connected = true;
    },
    disconnect: state => {
      state.connected = false;
    },
    enteredCombat: state => {
      state.inCombat = true;
    },
    leftCombat: state => {
      state.inCombat = false;
    },
    incrementTick: state => {
      state.currentTick!++;
    },
    decrementTick: state => {
      state.currentTick!--;
    },
    updateTick: (state, action: PayloadAction<number>) => {
      if (!state.currentTick) state.currentTick = action.payload;
      else state.currentTick += action.payload;
    },
  },
});

export const selectGameLive = (state: RootState) => state.game.live;
export const selectGameConnected = (state: RootState) => state.game.connected;
export const selectGameCurrentTick = (state: RootState) =>
  state.game.currentTick;
export const selectGameInCombat = (state: RootState) => state.game.inCombat;
export const selectGameMapCoords = (state: RootState) => state.game.mapCoords;
export const selectGameUnreadMsgCnt = (state: RootState) =>
  state.game.unreadMsgCnt;

export const {
  gameLive,
  gameOffline,
  incrementUMsgCnt,
  decrementUMsgCnt,
  connect,
  disconnect,
  enteredCombat,
  leftCombat,
  incrementTick,
  decrementTick,
  updateTick,
} = gameSlice.actions;

export default gameSlice.reducer;
