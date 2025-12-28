import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Bookmark,
  Shield,
  Minus,
  Plus,
  Check,
  ChevronRight
} from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useComparison } from '@/context/ComparisonContext';
import { useToast } from '@/context/ToastContext';
import { products } from '@/constants/products';
import type { Product } from '@/types';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const toast = useToast();
  const [quantity, setQuantity] = useState(1);

  const {
    addToCart,
    toggleWishlist,
    toggleSaveForLater,
    isWishlisted,
    isSaved,
    isInCart,
    getQuantity
  } = useCart();

  const { runSafetyAudit, toggleProductInComparison, isInComparison, comparisonList } = useComparison();

  const product = products.find((p: Product) => p.id === id);

  if (!product) {
    return (
      <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
        <div className="text-center max-w-md px-6">
          <h1 className="text-4xl font-serif text-slate-900 mb-4 italic">Product Not Found</h1>
          <p className="text-slate-400 font-serif text-lg mb-8">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Marketplace
          </Link>
        </div>
      </section>
    );
  }

  const cartQuantity = getQuantity(product.id);
  const inCart = isInCart(product.id);
  const wishlisted = isWishlisted(product.id);
  const saved = isSaved(product.id);
  const inComparison = isInComparison(product.id);

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    toast.success(`${quantity} x ${product.name} added to cart`);
    setQuantity(1);
  };

  const handleToggleWishlist = () => {
    toggleWishlist(product.id);
    toast.info(wishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleToggleSave = () => {
    toggleSaveForLater(product.id);
    toast.info(saved ? 'Removed from saved items' : 'Saved for later');
  };

  const handleSafetyAudit = async () => {
    try {
      await runSafetyAudit(product);
    } catch {
      toast.error('Safety audit is currently unavailable.');
    }
  };

  const handleToggleCompare = () => {
    if (comparisonList.length === 1 && !inComparison) {
      // If one product already selected and this is different, run comparison
      import('@/context/ComparisonContext').then(() => {
        toggleProductInComparison(product);
        toast.info('Added to comparison. Select another product or compare now.');
      });
    } else {
      toggleProductInComparison(product);
      toast.info(inComparison ? 'Removed from comparison' : 'Added to comparison');
    }
  };

  // Find similar products (same category, different product)
  const similarProducts = products
    .filter((p: Product) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-slate-400 mb-12">
          <Link to="/" className="hover:text-[#A67C7C] transition-colors">Marketplace</Link>
          <ChevronRight size={14} />
          <span className="text-slate-600">{product.name}</span>
        </nav>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Product Image */}
          <div className="relative">
            <div className="sticky top-24">
              <div className="bg-white rounded-3xl p-12 aspect-square flex items-center justify-center">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="max-w-full max-h-full object-contain"
                />
              </div>
              {product.efficacyScore && (
                <div className="absolute top-8 right-8 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-bold">
                  {product.efficacyScore}% Efficacy
                </div>
              )}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <div className="mb-8">
              <p className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#A67C7C] mb-4">
                {product.brand}
              </p>
              <h1 className="text-5xl font-serif text-slate-900 italic leading-tight mb-4">
                {product.name}
              </h1>
              <p className="text-3xl font-serif text-slate-900">
                ${product.price.toFixed(2)}
                {product.size && (
                  <span className="text-lg text-slate-400 ml-3">{product.size}</span>
                )}
              </p>
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-3 mb-8">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <span
                      key={i}
                      className={`text-lg ${i < Math.floor(product.rating!) ? 'text-amber-400' : 'text-slate-200'}`}
                    >
                      ★
                    </span>
                  ))}
                </div>
                <span className="text-slate-400">({product.rating.toFixed(1)})</span>
              </div>
            )}

            {/* Category Tag */}
            <div className="mb-8">
              <span className="px-4 py-2 bg-[#FDF2F2] text-[#A67C7C] text-[10px] font-bold uppercase tracking-widest rounded-full">
                {product.category}
              </span>
            </div>

            {/* Description */}
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              {product.description}
            </p>

            {/* Key Ingredients */}
            <div className="mb-10">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
                Key Ingredients
              </h3>
              <div className="flex flex-wrap gap-2">
                {(product.keyIngredients || product.ingredients).map((ingredient: string, idx: number) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-white border border-[#E8E2D9] text-slate-600 text-sm rounded-full"
                  >
                    {ingredient}
                  </span>
                ))}
              </div>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex items-center gap-1 bg-white rounded-full p-1 border border-[#E8E2D9]">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#FAF7F2] hover:text-slate-900 transition-all"
                >
                  <Minus size={16} />
                </button>
                <span className="w-12 text-center text-lg font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-10 h-10 rounded-full flex items-center justify-center text-slate-400 hover:bg-[#FAF7F2] hover:text-slate-900 transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 flex items-center justify-center gap-3 py-4 px-8 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
              >
                <ShoppingBag size={16} />
                Add to Cart
              </button>
            </div>

            {/* Cart Status */}
            {inCart && (
              <div className="flex items-center gap-2 text-emerald-600 mb-8">
                <Check size={16} />
                <span className="text-sm font-medium">{cartQuantity} already in cart</span>
                <Link to="/cart" className="text-sm underline hover:no-underline">
                  View Cart
                </Link>
              </div>
            )}

            {/* Secondary Actions */}
            <div className="flex flex-wrap gap-3 mb-10">
              <button
                onClick={handleToggleWishlist}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                  wishlisted
                    ? 'bg-[#FDF2F2] border-[#A67C7C] text-[#A67C7C]'
                    : 'border-slate-200 text-slate-600 hover:border-[#A67C7C] hover:text-[#A67C7C]'
                }`}
              >
                <Heart size={16} fill={wishlisted ? 'currentColor' : 'none'} />
                {wishlisted ? 'Wishlisted' : 'Add to Wishlist'}
              </button>

              <button
                onClick={handleToggleSave}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                  saved
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-500'
                    : 'border-slate-200 text-slate-600 hover:border-indigo-300 hover:text-indigo-500'
                }`}
              >
                <Bookmark size={16} fill={saved ? 'currentColor' : 'none'} />
                {saved ? 'Saved' : 'Save for Later'}
              </button>

              <button
                onClick={handleToggleCompare}
                className={`flex items-center gap-2 px-5 py-3 rounded-full border text-sm font-medium transition-all ${
                  inComparison
                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600'
                    : 'border-slate-200 text-slate-600 hover:border-emerald-300 hover:text-emerald-600'
                }`}
              >
                {inComparison ? 'In Comparison' : 'Add to Compare'}
              </button>
            </div>

            {/* AI Safety Audit */}
            <button
              onClick={handleSafetyAudit}
              className="w-full flex items-center justify-center gap-3 py-4 px-6 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl text-[11px] font-bold uppercase tracking-[0.2em] hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg"
            >
              <Shield size={16} />
              Run AI Safety Audit
            </button>

            {/* Full Ingredients */}
            <div className="mt-12 pt-12 border-t border-[#E8E2D9]">
              <h3 className="text-[11px] font-bold uppercase tracking-[0.3em] text-slate-400 mb-4">
                Full Ingredients
              </h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                {product.fullIngredients || product.ingredients.join(', ')}
              </p>
            </div>
          </div>
        </div>

        {/* Similar Products */}
        {similarProducts.length > 0 && (
          <div className="mt-32">
            <h2 className="text-3xl font-serif text-slate-900 italic mb-12 text-center">
              Similar Products
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {similarProducts.map((p: Product) => (
                <Link
                  key={p.id}
                  to={`/product/${p.id}`}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 mb-4 aspect-square flex items-center justify-center group-hover:shadow-lg transition-shadow">
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-[#A67C7C] mb-1">
                    {p.brand}
                  </p>
                  <p className="text-slate-900 font-medium mb-1 line-clamp-1">{p.name}</p>
                  <p className="text-slate-500">${p.price.toFixed(2)}</p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductDetailPage;
