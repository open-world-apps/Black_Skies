import type { Action, ThunkAction } from '@reduxjs/toolkit';
import { combineSlices, configureStore } from '@reduxjs/toolkit';
import { authSlice } from '../reducers/auth/authSlice';
import { menuSlice } from '../reducers/menus/menuSlice';
import { dialogSlice } from '../reducers/menus/dialogSlice';
import { charSlice } from '../reducers/game/charSlice';

const rootReducer = combineSlices(authSlice, menuSlice, dialogSlice, charSlice);

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
