'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { CartItem } from '@/lib/types';

interface CartState {
  cartItems: CartItem[];
  wishlist: string[];
  savedForLater: string[];
}

interface CartActions {
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
  getCartCount: () => number;
  getQuantity: (id: string) => number;
}

type CartStore = CartState & CartActions;

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      cartItems: [],
      wishlist: [],
      savedForLater: [],

      addToCart: (id, quantity = 1) => {
        set((state) => {
          const existing = state.cartItems.find(item => item.productId === id);
          if (existing) {
            return {
              cartItems: state.cartItems.map(item =>
                item.productId === id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              )
            };
          }
          return { cartItems: [...state.cartItems, { productId: id, quantity }] };
        });
      },

      removeFromCart: (id) => {
        set((state) => ({
          cartItems: state.cartItems.filter(item => item.productId !== id)
        }));
      },

      updateQuantity: (id, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(id);
          return;
        }
        set((state) => ({
          cartItems: state.cartItems.map(item =>
            item.productId === id ? { ...item, quantity } : item
          )
        }));
      },

      clearCart: () => set({ cartItems: [] }),

      toggleWishlist: (id) => {
        set((state) => ({
          wishlist: state.wishlist.includes(id)
            ? state.wishlist.filter(i => i !== id)
            : [...state.wishlist, id]
        }));
      },

      toggleSaveForLater: (id) => {
        set((state) => ({
          savedForLater: state.savedForLater.includes(id)
            ? state.savedForLater.filter(i => i !== id)
            : [...state.savedForLater, id]
        }));
      },

      moveToCart: (id) => {
        const { addToCart } = get();
        set((state) => ({
          wishlist: state.wishlist.filter(i => i !== id),
          savedForLater: state.savedForLater.filter(i => i !== id)
        }));
        addToCart(id);
      },

      isInCart: (id) => get().cartItems.some(item => item.productId === id),
      isWishlisted: (id) => get().wishlist.includes(id),
      isSaved: (id) => get().savedForLater.includes(id),
      getCartCount: () => get().cartItems.reduce((sum, item) => sum + item.quantity, 0),
      getQuantity: (id) => get().cartItems.find(item => item.productId === id)?.quantity || 0,
    }),
    {
      name: 'skintellect-cart-v2',
      partialize: (state) => ({
        cartItems: state.cartItems,
        wishlist: state.wishlist,
        savedForLater: state.savedForLater,
      }),
    }
  )
);
