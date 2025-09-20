"use client";

import '../../app/[locale]/globals.css';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}