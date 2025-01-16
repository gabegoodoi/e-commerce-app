import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItems {
    [id: string]: number;
}

type CartState = {
    items: CartItems;
    totalItems: number;
};

const initialState: CartState = {
    items: JSON.parse(localStorage.getItem('cartItems') || '{}'),
    totalItems: 0,
};

const calculateTotalItems = (items: CartItems): number => {
    return Object.values(items).reduce((total, quantity) => total + quantity, 0);
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action: PayloadAction<{ items: CartItems }>) => {
            const items = action.payload.items;
            state.items = items;
            state.totalItems = calculateTotalItems(items);
        },
        addItem: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            if (state.items[id]) {
                state.items[id] += 1;
            } else {
                state.items[id] = 1;
            }
            state.totalItems = calculateTotalItems(state.items);
            localStorage.setItem('cartItems', JSON.stringify(state.items));
        },
        removeItem: (state, action: PayloadAction<{ id: string }>) => {
            const { id } = action.payload;
            if (state.items[id]) {
                state.items[id] -= 1;
                if (state.items[id] === 0) {
                    delete state.items[id];
                }
                state.totalItems = calculateTotalItems(state.items);
                localStorage.setItem('cartItems', JSON.stringify(state.items));
            }
        },
        clearCart: (state) => {
            state.items = {};
            state.totalItems = 0;
            localStorage.removeItem('cartItems');
        },
        checkout: (state) => {
            state.items = {};
            state.totalItems = 0;
            localStorage.removeItem('cartItems');
        },
    },
});

// Thunk to initialize the cart from localStorage
export const initializeCart = () => (dispatch: any) => {
    const storedItems = JSON.parse(localStorage.getItem('cartItems') || '{}');
    dispatch(setCart({ items: storedItems }));
};

export const { addItem, removeItem, checkout, setCart, clearCart } = cartSlice.actions;

export default cartSlice.reducer;
