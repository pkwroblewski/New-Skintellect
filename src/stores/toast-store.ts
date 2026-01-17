'use client';

import { create } from 'zustand';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastState {
  toasts: Toast[];
}

interface ToastActions {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  removeToast: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  warning: (message: string) => void;
}

type ToastStore = ToastState & ToastActions;

export const useToastStore = create<ToastStore>()((set, get) => ({
  toasts: [],

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter(toast => toast.id !== id)
    }));
  },

  showToast: (message, type = 'info', duration = 3000) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const newToast: Toast = { id, message, type, duration };

    set((state) => ({
      toasts: [...state.toasts, newToast]
    }));

    // Auto-remove after duration
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  success: (message) => get().showToast(message, 'success'),
  error: (message) => get().showToast(message, 'error', 5000),
  info: (message) => get().showToast(message, 'info'),
  warning: (message) => get().showToast(message, 'warning', 4000),
}));
