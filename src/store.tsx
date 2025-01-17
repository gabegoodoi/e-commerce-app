import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './features/cart/cartSlice.tsx';
import productsReducer from './features/products/productsSlice.tsx';

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        products: productsReducer,
    },
});

// Define RootState type based on the store
export type RootState = ReturnType<typeof store.getState>;

// Infer dispatch type from the store
export type AppDispatch = typeof store.dispatch;

// store - central hub of our application state
// reducer - similar to our "set" hooks. They define how our state changes
// Slices - breaks our state into more manageable pieces
