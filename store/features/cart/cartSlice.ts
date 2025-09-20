import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product, CartItem } from '@/lib/types';

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
        setCart: (state, action: PayloadAction<CartItem[]>) => {
            state.items = action.payload;
        },

        addToCart: (state, action: PayloadAction<Product>) => {
            const productToAdd = action.payload;
            const existingItemIndex = state.items.findIndex(
                (item) => item.product.id === productToAdd.id
            );

            if (existingItemIndex !== -1) {
                // Mevcut ürünün miktarını artır
                state.items[existingItemIndex].quantity += 1;
            } else {
                // Yeni ürün ekle
                state.items.push({ product: productToAdd, quantity: 1 });
            }
        },

        // DÜZELTME: string | number tipini destekle
        removeFromCart: (state, action: PayloadAction<string | number>) => {
            state.items = state.items.filter(
                (item) => item.product.id !== action.payload
            );
        },

        clearCart: (state) => {
            state.items = [];
        },

        // DÜZELTME: productId parametresi kullan, string | number destekle
        updateQuantity: (
            state,
            action: PayloadAction<{ productId: string | number; quantity: number }>
        ) => {
            const { productId, quantity } = action.payload;
            const itemIndex = state.items.findIndex(
                (item) => item.product.id === productId
            );

            if (itemIndex !== -1) {
                if (quantity > 0) {
                    state.items[itemIndex].quantity = quantity;
                } else {
                    // Miktar 0 veya daha azsa ürünü sil
                    state.items = state.items.filter(
                        (item) => item.product.id !== productId
                    );
                }
            }
        },

        // BONUS: Tek seferde miktar artırma/azaltma için
        incrementQuantity: (state, action: PayloadAction<string | number>) => {
            const productId = action.payload;
            const item = state.items.find((item) => item.product.id === productId);
            if (item) {
                item.quantity += 1;
            }
        },

        decrementQuantity: (state, action: PayloadAction<string | number>) => {
            const productId = action.payload;
            const itemIndex = state.items.findIndex((item) => item.product.id === productId);

            if (itemIndex !== -1) {
                if (state.items[itemIndex].quantity > 1) {
                    state.items[itemIndex].quantity -= 1;
                } else {
                    // Miktar 1'den azsa ürünü sil
                    state.items = state.items.filter(
                        (item) => item.product.id !== productId
                    );
                }
            }
        }
    },
});

export const {
    setCart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    incrementQuantity,
    decrementQuantity
} = cartSlice.actions;

export default cartSlice.reducer;