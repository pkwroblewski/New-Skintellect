'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Minus, Plus, X, ShoppingBag, ArrowLeft, ArrowRight } from 'lucide-react';
import { useCartStore } from '@/stores/cart-store';
import { useToastStore } from '@/stores/toast-store';
import { products } from '@/lib/products';
import { useHydration } from '@/hooks/use-hydration';
import type { Product } from '@/lib/types';

export default function CartPage() {
  const router = useRouter();
  const hydrated = useHydration();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useCartStore();
  const toast = useToastStore();

  // Get full product details for cart items
  const cartProducts = cartItems
    .map(item => {
      const product = products.find(p => p.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter((item): item is { product: Product; quantity: number } => item !== null);

  const subtotal = cartProducts.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const handleRemove = (productId: string, productName: string) => {
    removeFromCart(productId);
    toast.info(`${productName} removed from cart`);
  };

  const handleClearCart = () => {
    clearCart();
    toast.info('Cart cleared');
  };

  // Show loading state during hydration
  if (!hydrated) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-[#A67C7C] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-400 font-serif italic">Loading cart...</p>
        </div>
      </section>
    );
  }

  if (cartProducts.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FDF2F2] flex items-center justify-center">
            <ShoppingBag size={40} className="text-[#A67C7C]" />
          </div>
          <h1 className="text-4xl font-serif text-slate-900 mb-4 italic">Your cart is empty</h1>
          <p className="text-slate-400 font-serif text-lg mb-8">
            Discover our curated collection of science-backed formulations.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ArrowLeft size={14} />
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="flex items-center justify-between mb-16">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-[#A67C7C] transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              Back to Marketplace
            </Link>
            <h1 className="text-5xl font-serif text-slate-900 italic">Shopping Cart</h1>
          </div>
          <button
            onClick={handleClearCart}
            className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cartProducts.map(({ product, quantity }) => (
              <div
                key={product.id}
                className="bg-white rounded-2xl p-6 flex gap-6 group"
              >
                {/* Product Image */}
                <Link href={`/product/${product.id}`} className="flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-28 h-28 object-cover rounded-xl"
                  />
                </Link>

                {/* Product Details */}
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C] mb-1">
                        {product.brand}
                      </p>
                      <Link
                        href={`/product/${product.id}`}
                        className="text-xl font-serif text-slate-900 hover:text-[#A67C7C] transition-colors line-clamp-1"
                      >
                        {product.name}
                      </Link>
                    </div>
                    <button
                      onClick={() => handleRemove(product.id, product.name)}
                      className="p-2 text-slate-300 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <X size={18} />
                    </button>
                  </div>

                  <p className="text-sm text-slate-400 mb-4">{product.size}</p>

                  <div className="flex items-center justify-between">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-1 bg-[#FAF7F2] rounded-full p-1">
                      <button
                        onClick={() => updateQuantity(product.id, quantity - 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-slate-900">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(product.id, quantity + 1)}
                        className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:bg-white hover:text-slate-900 transition-all"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-xl font-serif text-slate-900">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                      {quantity > 1 && (
                        <p className="text-xs text-slate-400">
                          ${product.price.toFixed(2)} each
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-[2rem] p-8 sticky top-24">
              <h2 className="text-2xl font-serif text-slate-900 mb-8 italic">Order Summary</h2>

              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal ({cartItems.reduce((s, i) => s + i.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="text-[#A67C7C] font-medium">Free</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
              </div>

              <div className="border-t border-[#E8E2D9] pt-6 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className="text-lg font-serif text-slate-900">Estimated Total</span>
                  <span className="text-3xl font-serif text-slate-900 italic">
                    ${subtotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={() => router.push('/checkout')}
                className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
              >
                Proceed to Checkout
                <ArrowRight size={14} />
              </button>

              <p className="text-center text-xs text-slate-400 mt-6">
                Secure checkout powered by modern encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
