import { configureStore } from "@reduxjs/toolkit";
import menuReducer from './menuList/menuSlice'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root', storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, menuReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['FLUSH', 'REHYDRATE', 'PAUSE', 'PERSIST', 'PURGE', 'REGISTER', 'persist/PERSIST'],
      },
    }),
});

export const persistor = persistStore(store);


// export const store = configureStore({
//      reducer: {
//         cart: menuReducer
//      }
// })