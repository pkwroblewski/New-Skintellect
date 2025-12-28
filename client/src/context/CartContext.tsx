import React, { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';

export interface CartItem {
  productId: string;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  wishlist: string[];
  savedForLater: string[];
  addToCart: (id: string, quantity?: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  toggleSaveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  isInCart: (id: string) => boolean;
  isWishlisted: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  cartCount: number;
  getQuantity: (id: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'skintellect_cart_v2',
  WISHLIST: 'skintellect_wishlist',
  SAVED: 'skintellect_saved'
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
  const [cartItems, setCartItems] = useState<CartItem[]>(() =>
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
    localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedForLater));
  }, [savedForLater]);

  const addToCart = useCallback((id: string, quantity: number = 1) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.productId === id);
      if (existing) {
        return prev.map(item =>
          item.productId === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { productId: id, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.productId !== id));
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(prev =>
      prev.map(item =>
        item.productId === id ? { ...item, quantity } : item
      )
    );
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const toggleSaveForLater = useCallback((id: string) => {
    setSavedForLater(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  }, []);

  const moveToCart = useCallback((id: string) => {
    // Remove from wishlist/saved and add to cart
    setWishlist(prev => prev.filter(item => item !== id));
    setSavedForLater(prev => prev.filter(item => item !== id));
    addToCart(id);
  }, [addToCart]);

  const isInCart = useCallback((id: string) =>
    cartItems.some(item => item.productId === id), [cartItems]);

  const isWishlisted = useCallback((id: string) =>
    wishlist.includes(id), [wishlist]);

  const isSaved = useCallback((id: string) =>
    savedForLater.includes(id), [savedForLater]);

  const getQuantity = useCallback((id: string) => {
    const item = cartItems.find(item => item.productId === id);
    return item?.quantity || 0;
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        wishlist,
        savedForLater,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        toggleWishlist,
        toggleSaveForLater,
        moveToCart,
        isInCart,
        isWishlisted,
        isSaved,
        cartCount,
        getQuantity
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
