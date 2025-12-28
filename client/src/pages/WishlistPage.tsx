import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X, ArrowLeft } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/constants/products';
import type { Product } from '@/types';

export const WishlistPage: React.FC = () => {
  const { wishlist, toggleWishlist, addToCart } = useCart();
  const toast = useToast();

  // Get full product details for wishlist items
  const wishlistProducts = wishlist
    .map(id => products.find(p => p.id === id))
    .filter((product): product is Product => product !== undefined);

  const handleRemove = (productId: string, productName: string) => {
    toggleWishlist(productId);
    toast.info(`${productName} removed from wishlist`);
  };

  const handleMoveToCart = (productId: string, productName: string) => {
    addToCart(productId);
    toggleWishlist(productId);
    toast.success(`${productName} moved to cart`);
  };

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      addToCart(product.id);
      toggleWishlist(product.id);
    });
    toast.success('All items moved to cart');
  };

  if (wishlistProducts.length === 0) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center max-w-md px-6">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FDF2F2] flex items-center justify-center">
            <Heart size={40} className="text-[#A67C7C]" />
          </div>
          <h1 className="text-4xl font-serif text-slate-900 mb-4 italic">Your wishlist is empty</h1>
          <p className="text-slate-400 font-serif text-lg mb-8">
            Save products you love for later by clicking the heart icon.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ArrowLeft size={14} />
            Explore Products
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
              to="/"
              className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 hover:text-[#A67C7C] transition-colors mb-4"
            >
              <ArrowLeft size={14} />
              Back to Marketplace
            </Link>
            <h1 className="text-5xl font-serif text-slate-900 italic">Wishlist</h1>
            <p className="text-slate-400 mt-2">{wishlistProducts.length} item{wishlistProducts.length !== 1 ? 's' : ''}</p>
          </div>
          <button
            onClick={handleAddAllToCart}
            className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ShoppingBag size={14} />
            Add All to Cart
          </button>
        </div>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {wishlistProducts.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-2xl overflow-hidden group"
            >
              {/* Product Image */}
              <Link to={`/product/${product.id}`} className="block relative">
                <div className="aspect-square p-8 flex items-center justify-center bg-gradient-to-b from-white to-[#FAF7F2]">
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleRemove(product.id, product.name);
                  }}
                  className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur rounded-full text-slate-400 hover:text-red-500 hover:bg-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <X size={16} />
                </button>
              </Link>

              {/* Product Info */}
              <div className="p-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C] mb-2">
                  {product.brand}
                </p>
                <Link
                  to={`/product/${product.id}`}
                  className="block text-xl font-serif text-slate-900 hover:text-[#A67C7C] transition-colors mb-2 line-clamp-2"
                >
                  {product.name}
                </Link>
                <p className="text-lg font-serif text-slate-900 mb-4">
                  ${product.price.toFixed(2)}
                </p>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleMoveToCart(product.id, product.name)}
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
                  >
                    <ShoppingBag size={14} />
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemove(product.id, product.name)}
                    className="p-3 border border-slate-200 text-slate-400 rounded-full hover:border-red-300 hover:text-red-500 transition-all"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WishlistPage;
