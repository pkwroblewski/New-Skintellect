'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';

interface OrderInfo {
  orderNumber: string;
  total: number;
  items: number;
  email: string;
}

export default function OrderConfirmationPage() {
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);

  useEffect(() => {
    // Get order info from sessionStorage
    const stored = sessionStorage.getItem('orderInfo');
    if (stored) {
      setOrderInfo(JSON.parse(stored));
      // Clear it after reading
      sessionStorage.removeItem('orderInfo');
    }
  }, []);

  // If no order state, show generic confirmation
  const orderNumber = orderInfo?.orderNumber || `SK-${Date.now().toString(36).toUpperCase()}`;
  const total = orderInfo?.total || 0;
  const email = orderInfo?.email || 'your email';

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-20">
      <div className="max-w-2xl mx-auto px-6 text-center">
        {/* Success Icon */}
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-50 flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle size={48} className="text-emerald-500" />
        </div>

        {/* Header */}
        <h1 className="text-5xl font-serif text-slate-900 mb-4 italic animate-in fade-in slide-in-from-bottom-4 duration-500">
          Thank You!
        </h1>
        <p className="text-2xl font-serif text-slate-500 italic mb-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
          Your order has been placed successfully.
        </p>

        {/* Order Details Card */}
        <div className="bg-white rounded-[2rem] p-10 mb-12 text-left animate-in fade-in slide-in-from-bottom-4 duration-500">
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C] mb-2">
                Order Number
              </p>
              <p className="text-2xl font-serif text-slate-900 italic">{orderNumber}</p>
            </div>
            {total > 0 && (
              <div className="md:text-right">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C] mb-2">
                  Order Total
                </p>
                <p className="text-2xl font-serif text-slate-900 italic">${total.toFixed(2)}</p>
              </div>
            )}
          </div>

          <div className="border-t border-[#E8E2D9] pt-8 space-y-6">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] flex items-center justify-center flex-shrink-0">
                <Mail size={18} className="text-[#A67C7C]" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Confirmation Email Sent</p>
                <p className="text-slate-400 text-sm">
                  We&apos;ve sent order details to {email}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-[#FDF2F2] flex items-center justify-center flex-shrink-0">
                <Package size={18} className="text-[#A67C7C]" />
              </div>
              <div>
                <p className="font-medium text-slate-900 mb-1">Shipping Updates</p>
                <p className="text-slate-400 text-sm">
                  You&apos;ll receive tracking information once your order ships
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Estimated Delivery */}
        <div className="bg-white/50 rounded-2xl p-6 mb-12 border border-[#E8E2D9] animate-in fade-in slide-in-from-bottom-4 duration-500">
          <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-2">
            Estimated Delivery
          </p>
          <p className="text-xl font-serif text-slate-900">
            {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })} - {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            Continue Shopping
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* Demo Note */}
        <p className="text-sm text-slate-400 mt-16 italic">
          This is a demo order. No actual products will be shipped.
        </p>
      </div>
    </section>
  );
}
