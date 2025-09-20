"use client";

import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { setCart } from '@/store/features/cart/cartSlice';

export default function CartProvider({ children }: { children: React.ReactNode }) {
    const dispatch = useAppDispatch();
    const { items } = useAppSelector((state) => state.cart);
    const isInitialRender = useRef(true);

    useEffect(() => {
        try {
            const savedCart = localStorage.getItem('cart');
            if (savedCart) {
                const parsedCart = JSON.parse(savedCart);
                dispatch(setCart(parsedCart));
            }
        } catch (error) {
            console.error("Failed to load cart from localStorage", error);
        }
    }, [dispatch]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }

        try {
            localStorage.setItem('cart', JSON.stringify(items));
        } catch (error) {
            console.error("Failed to save cart to localStorage", error);
        }
    }, [items]);

    return <>{children}</>;
}