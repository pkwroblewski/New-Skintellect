import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/constants/products';
import type { Product } from '@/types';

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  cardNumber: string;
  cardName: string;
  expiry: string;
  cvv: string;
}

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useCart();
  const toast = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'United States',
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvv: ''
  });

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

  const shipping = 0; // Free shipping
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.email || !formData.firstName || !formData.lastName ||
        !formData.address || !formData.city || !formData.zipCode) {
      toast.error('Please fill in all shipping details');
      return;
    }

    if (!formData.cardNumber || !formData.cardName || !formData.expiry || !formData.cvv) {
      toast.error('Please fill in all payment details');
      return;
    }

    setIsProcessing(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and navigate to confirmation
    const orderNumber = `DL-${Date.now().toString(36).toUpperCase()}`;
    clearCart();

    navigate('/order-confirmation', {
      state: {
        orderNumber,
        total,
        items: cartProducts.length,
        email: formData.email
      }
    });
  };

  if (cartProducts.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-serif text-slate-900 mb-4 italic">No items to checkout</h1>
          <p className="text-slate-400 font-serif text-lg mb-8">
            Add some products to your cart first.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ArrowLeft size={14} />
            Browse Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            to="/cart"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-[#A67C7C] transition-colors mb-4"
          >
            <ArrowLeft size={14} />
            Back to Cart
          </Link>
          <h1 className="text-5xl font-serif text-slate-900 italic">Checkout</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-10">
              {/* Contact Information */}
              <div className="bg-white rounded-2xl p-8">
                <h2 className="text-2xl font-serif text-slate-900 mb-6 italic">Contact</h2>
                <input
                  type="email"
                  name="email"
                  placeholder="Email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                  required
                />
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Truck size={20} className="text-[#A67C7C]" />
                  <h2 className="text-2xl font-serif text-slate-900 italic">Shipping Address</h2>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="col-span-2 px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={formData.city}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={formData.state}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                  />
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP code"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 focus:outline-none focus:border-[#A67C7C] transition-colors bg-white"
                  >
                    <option>United States</option>
                    <option>Canada</option>
                    <option>United Kingdom</option>
                  </select>
                </div>
              </div>

              {/* Payment */}
              <div className="bg-white rounded-2xl p-8">
                <div className="flex items-center gap-3 mb-6">
                  <CreditCard size={20} className="text-[#A67C7C]" />
                  <h2 className="text-2xl font-serif text-slate-900 italic">Payment</h2>
                </div>

                <div className="space-y-4">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <input
                    type="text"
                    name="cardName"
                    placeholder="Name on card"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                    required
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      name="expiry"
                      placeholder="MM/YY"
                      value={formData.expiry}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                      required
                    />
                    <input
                      type="text"
                      name="cvv"
                      placeholder="CVV"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      className="px-4 py-3 border border-[#E8E2D9] rounded-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-[#A67C7C] transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-2 text-sm text-slate-400">
                  <Lock size={14} />
                  <span>Your payment information is secure and encrypted</span>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-[2rem] p-8 sticky top-24">
                <h2 className="text-2xl font-serif text-slate-900 mb-8 italic">Order Summary</h2>

                {/* Cart Items Preview */}
                <div className="space-y-4 mb-8 max-h-64 overflow-y-auto">
                  {cartProducts.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4">
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-slate-900 truncate">{product.name}</p>
                        <p className="text-xs text-slate-400">Qty: {quantity}</p>
                      </div>
                      <p className="text-sm font-medium text-slate-900">
                        ${(product.price * quantity).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="border-t border-[#E8E2D9] pt-6 space-y-4 mb-8">
                  <div className="flex justify-between text-slate-600">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Shipping</span>
                    <span className="text-[#A67C7C] font-medium">Free</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span>Tax (8%)</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                </div>

                <div className="border-t border-[#E8E2D9] pt-6 mb-8">
                  <div className="flex justify-between items-baseline">
                    <span className="text-lg font-serif text-slate-900">Total</span>
                    <span className="text-3xl font-serif text-slate-900 italic">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={14} />
                      Place Order
                    </>
                  )}
                </button>

                <p className="text-center text-xs text-slate-400 mt-6">
                  This is a demo checkout. No real payment will be processed.
                </p>
              </div>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutPage;
