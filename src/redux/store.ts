import { configureStore } from '@reduxjs/toolkit';
import authSlice from './authReducer';
import storage from 'redux-persist/lib/storage';
import {persistReducer,persistStore} from 'redux-persist'

const persistConfig ={
  key: 'root',
  storage,
 // whitelist: ["auth"]
}

const persistAuthReducer=persistReducer(persistConfig,authSlice)

export const store = configureStore({
  reducer: {
    auth: persistAuthReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        },
    }),
});
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
