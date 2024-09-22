import { configureStore } from '@reduxjs/toolkit';
import rolesReducer from './rolesSlice';
import authReducer from './authSlice.tsx';
import userReducer from './userSlice.tsx';

export const store = configureStore({
  reducer: {
    roles: rolesReducer,
    auth: authReducer,
    users: userReducer
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
