import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

interface CartContextType {
  cart: string[];
  wishlist: string[];
  savedForLater: string[];
  addToCart: (id: string) => void;
  removeFromCart: (id: string) => void;
  toggleWishlist: (id: string) => void;
  toggleSaveForLater: (id: string) => void;
  isInCart: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'derma_logic_cart',
  WISHLIST: 'derma_logic_wishlist',
  SAVED: 'derma_logic_saved'
} as const;

function loadFromStorage<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.CART, [])
  );
  const [wishlist, setWishlist] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.WISHLIST, [])
  );
  const [savedForLater, setSavedForLater] = useState<string[]>(() =>
    loadFromStorage(STORAGE_KEYS.SAVED, [])
  );

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = (id: string) => {
    setCart(prev => [...prev, id]);
  };

  const removeFromCart = (id: string) => {
    setCart(prev => prev.filter(item => item !== id));
  };

  const toggleWishlist = (id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const toggleSaveForLater = (id: string) => {
    setSavedForLater(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const isInCart = (id: string) => cart.includes(id);
  const isWishlisted = (id: string) => wishlist.includes(id);
  const isSaved = (id: string) => savedForLater.includes(id);

  return (
    <CartContext.Provider
      value={{
        cart,
        wishlist,
        savedForLater,
        addToCart,
        removeFromCart,
        toggleWishlist,
        toggleSaveForLater,
        isInCart,
        isWishlisted,
        isSaved,
        cartCount: cart.length
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
