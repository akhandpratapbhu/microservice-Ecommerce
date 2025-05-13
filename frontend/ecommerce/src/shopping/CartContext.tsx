// CartContext.tsx
import React, { createContext, useContext, useState } from 'react';
import toast from 'react-hot-toast';

export interface Product {
  _id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  qnty?: number;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
  removeSingleItem: (product: Product) => void;
  emptyCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);

  const addToCart = (product: Product) => {
    const existing = cart.find(p => p._id === product._id);

    console.log("existing",existing);
    console.log("cart",cart)
    ;console.log("product",product);
    if (existing) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, qnty: (item.qnty || 1) + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, qnty: 1 }]);
             console.log("elsecart",cart);

    }
    toast.success('Item added to your cart');
  };
 console.log("cartoutside",cart)
  const removeFromCart = (product: Product) => {
    setCart(cart.filter(item => item._id !== product._id));
    toast.success('Item removed from your cart');
  };

  const removeSingleItem = (product: Product) => {
    const existing = cart.find(p => p._id === product._id);
    if (existing && (existing.qnty || 1) > 1) {
      setCart(cart.map(item =>
        item._id === product._id
          ? { ...item, qnty: (item.qnty || 1) - 1 }
          : item
      ));
    } else {
      removeFromCart(product);
    }
  };

  const emptyCart = () => {
    setCart([]);
    toast.success('Your cart is empty');
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, removeSingleItem, emptyCart }}>
      {children}
    </CartContext.Provider>
  );
};
