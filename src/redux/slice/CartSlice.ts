// src/redux/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartItem {
    productName: string;
    type: string;
    price: number;
    quantity: number;
}

interface CartState {
    items: CartItem[];
}

const initialState: CartState = {
    items: [],
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => {
            const existingItem = state.items.find(item => item.productName === action.payload.productName); // find product for add
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },

        removeFromCart: (state, action: PayloadAction<string>) => { // delete item
            state.items = state.items.filter(item => item.productName !== action.payload);
        },

        decreaseQuantity: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => { // - Quantity
            const item = state.items.find(item => item.productName === action.payload.productName);
            if (item) {
                item.quantity = item.quantity - 1;
            }
        },

        increaseQuantity: (state, action: PayloadAction<Omit<CartItem, 'quantity'>>) => { // + Quantity
            const item = state.items.find(item => item.productName === action.payload.productName);
            if (item) {
                item.quantity += 1;
            }
        },

        clearCart: (state) => {
            state.items = [];
        }
    }
});


export const { addToCart, removeFromCart, increaseQuantity, clearCart, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
