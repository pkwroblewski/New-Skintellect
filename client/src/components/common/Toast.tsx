import React from 'react';
import { X, Check, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { useToast, type ToastType } from '@/context/ToastContext';

const toastConfig: Record<ToastType, { icon: typeof Check; bgColor: string; borderColor: string; iconColor: string }> = {
  success: {
    icon: Check,
    bgColor: 'bg-white',
    borderColor: 'border-emerald-200',
    iconColor: 'text-emerald-500',
  },
  error: {
    icon: AlertCircle,
    bgColor: 'bg-white',
    borderColor: 'border-red-200',
    iconColor: 'text-red-500',
  },
  warning: {
    icon: AlertTriangle,
    bgColor: 'bg-white',
    borderColor: 'border-amber-200',
    iconColor: 'text-amber-500',
  },
  info: {
    icon: Info,
    bgColor: 'bg-white',
    borderColor: 'border-[#A67C7C]/30',
    iconColor: 'text-[#A67C7C]',
  },
};

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] flex flex-col gap-3 pointer-events-none">
      {toasts.map((toast) => {
        const config = toastConfig[toast.type];
        const Icon = config.icon;

        return (
          <div
            key={toast.id}
            className={`
              pointer-events-auto
              flex items-center gap-3
              px-4 py-3 pr-10
              ${config.bgColor}
              border ${config.borderColor}
              rounded-2xl
              shadow-xl shadow-black/5
              backdrop-blur-xl
              animate-in slide-in-from-left-4 fade-in duration-300
              min-w-[280px] max-w-[400px]
            `}
          >
            <div className={`flex-shrink-0 ${config.iconColor}`}>
              <Icon size={18} />
            </div>
            <p className="text-sm text-slate-700 font-medium">
              {toast.message}
            </p>
            <button
              onClick={() => removeToast(toast.id)}
              className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-300 hover:text-slate-500 transition-colors"
            >
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ToastContainer;
