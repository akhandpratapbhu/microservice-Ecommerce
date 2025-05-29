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

 const addToCart = async (product: Product) => {
    let updatedCart: Product[];

    const existing = cart.find(p => p._id === product._id);

    if (existing) {
        updatedCart = cart.map(item =>
            item._id === product._id
                ? { ...item, qnty: (item.qnty || 1) + 1 }
                : item
        );
    } else {
        updatedCart = [...cart, { ...product, qnty: 1 }];
    }

    setCart(updatedCart); // update cart state
    toast.success('Item added to your cart');

    // Calculate total quantity and total price
    const totalquantity = updatedCart.reduce((sum, item) => sum + Number(item.qnty), 0);
    const totalprice = updatedCart.reduce((sum, item) => sum + item.price * Number(item.qnty), 0);

  saveCartDataInDB(totalquantity,totalprice)
};
 async function saveCartDataInDB(totalquantity:number,totalprice:number){
  // Save to backend
    try {
        const customer_id = 1; // Replace with real ID
        await fetch("http://localhost:4242/api/saveInCart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ products: cart, totalquantity, totalprice, customer_id })
        });
        console.log("Cart saved to DB:", totalquantity, totalprice);
    } catch (err) {
        console.error("Error saving to cart:", err);
    }
}

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
     // Calculate total quantity and total price
    const totalquantity = cart.reduce((sum, item) => sum + Number(item.qnty), 0);
    const totalprice = cart.reduce((sum, item) => sum + item.price * Number(item.qnty), 0);

  saveCartDataInDB(totalquantity,totalprice)
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
