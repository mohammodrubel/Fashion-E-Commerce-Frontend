import { configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PersistConfig,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { baseApi } from "./api/baseApi";

import authReducer from "../redux/fetchers/auth/authSlice";
import cartReducer from "../redux/fetchers/cart/cartSlice";
import wishlistReducer from "../redux/fetchers/wishlist/wishlist";

// ==========================
// Persist Configs
// ==========================

const persistAuthConfig: PersistConfig<ReturnType<typeof authReducer>> = {
  key: "auth",
  storage,
};

const persistCartConfig: PersistConfig<ReturnType<typeof cartReducer>> = {
  key: "cart",
  storage,
};

// Key bumped from "wishlist" to "wishlist_v2": older saved items only stored
// {id, name, slug, image, price} (no images[]/regularPrice/variants), so the
// card rendered without image, size or price. Renaming the storage key
// starts wishlist state fresh instead of rehydrating that incompatible shape.
const persistWishlistConfig: PersistConfig<ReturnType<typeof wishlistReducer>> = {
  key: "wishlist_v2",
  storage,
};

// ==========================
// Persisted Reducers
// ==========================

const persistedAuthReducer = persistReducer(
  persistAuthConfig,
  authReducer
);

const persistedCartReducer = persistReducer(
  persistCartConfig,
  cartReducer
);

const persistedWishlistReducer = persistReducer(
  persistWishlistConfig,
  wishlistReducer
);

// ==========================
// Store
// ==========================

export const store = configureStore({
  reducer: {
    [baseApi.reducerPath]: baseApi.reducer,
    auth: persistedAuthReducer,
    cart: persistedCartReducer,
    wishlist: persistedWishlistReducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }).concat(baseApi.middleware),
});

// ==========================
// Types
// ==========================

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// ==========================
// Persistor
// ==========================

export const persistor = persistStore(store);