import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../reducers/auth/authSlice';
import { menuSlice } from '../reducers/menus/menuSlice';
import { charSlice } from '../reducers/game/charSlice';
import { gameSlice } from '../reducers/game/gameSlice';
import { uiSlice } from '../reducers/game/uiSlice';

const rootReducer = combineSlices(
  authSlice,
  menuSlice,
  charSlice,
  gameSlice,
  uiSlice
);

export type RootState = ReturnType<typeof rootReducer>;

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
