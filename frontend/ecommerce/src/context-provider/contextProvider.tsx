import React from 'react';
import { CartProvider } from './CartContext';
import { ThemeProvider } from './themecontext';

export const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ThemeProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </ThemeProvider>
  );
};
