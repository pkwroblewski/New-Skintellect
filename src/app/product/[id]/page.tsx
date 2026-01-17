'use client';

import { notFound, useRouter } from 'next/navigation';
import Link from 'next/link';
import { use, useState } from 'react';
import {
  ArrowLeft,
  ShoppingBag,
  Heart,
  Bookmark,
  ShieldAlert,
  ArrowRightLeft,
  Star,
  Droplets,
  Zap,
  Wind,
  Shield,
  Sun,
  FlaskConical,
  Loader2,
  type LucideIcon
} from 'lucide-react';
import { getProductById, getProductsByCategory } from '@/lib/products';
import { useCartStore } from '@/stores/cart-store';
import { useComparisonStore } from '@/stores/comparison-store';
import { useToastStore } from '@/stores/toast-store';
import { useHydration } from '@/hooks/use-hydration';
import type { Product } from '@/lib/types';

interface IngredientBenefit {
  label: string;
  description: string;
  icon: LucideIcon;
}

// Map ingredients to benefit categories with descriptions
const getIngredientBenefit = (ingredient: string): IngredientBenefit => {
  const ing = ingredient.toLowerCase();
  if (ing.includes('retinol') || ing.includes('peptide') || ing.includes('retinoid') || ing.includes('bakuchiol')) {
    return { label: 'Renewal', description: 'Promotes cell turnover and skin regeneration', icon: Zap };
  }
  if (ing.includes('hyaluronic') || ing.includes('glycerin') || ing.includes('aloe') || ing.includes('hydra')) {
    return { label: 'Hydration', description: 'Deeply moisturizes and plumps skin', icon: Droplets };
  }
  if (ing.includes('ceramide') || ing.includes('squalane') || ing.includes('shea') || ing.includes('barrier') || ing.includes('cholesterol')) {
    return { label: 'Barrier', description: 'Strengthens and protects the skin barrier', icon: Shield };
  }
  if (ing.includes('oat') || ing.includes('centella') || ing.includes('green tea') || ing.includes('bisabolol') || ing.includes('niacinamide')) {
    return { label: 'Soothing', description: 'Calms irritation and reduces redness', icon: Wind };
  }
  if (ing.includes('spf') || ing.includes('sun') || ing.includes('avobenzone') || ing.includes('octisalate') || ing.includes('homosalate') || ing.includes('octocrylene')) {
    return { label: 'Protection', description: 'Shields from UV and environmental damage', icon: Sun };
  }
  return { label: 'Essential', description: 'Supports overall skin health', icon: FlaskConical };
};

function LoadingSkeleton() {
  return (
    <section className="bg-[#FAF7F2] min-h-screen py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <div className="w-48 h-4 bg-slate-200 rounded animate-pulse mb-20"></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="aspect-[4/5] bg-slate-200 rounded-[2rem] animate-pulse"></div>
          <div className="space-y-6">
            <div className="w-32 h-3 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-64 h-10 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-24 h-6 bg-slate-200 rounded animate-pulse"></div>
            <div className="w-full h-24 bg-slate-200 rounded animate-pulse"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const router = useRouter();
  const hydrated = useHydration();
  const [imageLoaded, setImageLoaded] = useState(false);

  const {
    addToCart,
    toggleWishlist,
    toggleSaveForLater,
    isWishlisted,
    isSaved,
    isInCart
  } = useCartStore();

  const {
    toggleProductInComparison,
    runSafetyAudit,
    isInComparison,
    pendingProductIds
  } = useComparisonStore();

  const toast = useToastStore();

  // Get product data
  const product = getProductById(resolvedParams.id);

  // Handle 404
  if (!product) {
    notFound();
  }

  // Get related products (same category, excluding current)
  const relatedProducts = getProductsByCategory(product.category)
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  // Get ingredient benefits
  const ingredientBenefits = product.ingredients.map(ing => ({
    name: ing,
    ...getIngredientBenefit(ing)
  }));

  // Loading state for hydration
  if (!hydrated) {
    return <LoadingSkeleton />;
  }

  const isLoading = pendingProductIds.has(product.id);
  const wishlisted = isWishlisted(product.id);
  const saved = isSaved(product.id);
  const inCart = isInCart(product.id);
  const inComparison = isInComparison(product.id);

  const handleAddToCart = () => {
    addToCart(product.id);
    toast.success(`${product.name} added to cart`);
  };

  const handleToggleWishlist = () => {
    const wasWishlisted = wishlisted;
    toggleWishlist(product.id);
    toast.info(wasWishlisted ? `${product.name} removed from wishlist` : `${product.name} added to wishlist`);
  };

  const handleToggleSave = () => {
    const wasSaved = saved;
    toggleSaveForLater(product.id);
    toast.info(wasSaved ? `${product.name} removed from saved items` : `${product.name} saved for later`);
  };

  const handleAddToCompare = () => {
    toggleProductInComparison(product);
    toast.info(inComparison ? `${product.name} removed from comparison` : `${product.name} added to comparison`);
  };

  const handleSafetyAudit = async () => {
    try {
      await runSafetyAudit(product);
    } catch {
      toast.error('Safety audit is currently unavailable.');
    }
  };

  const handleRelatedProductClick = (relatedProduct: Product) => {
    router.push(`/product/${relatedProduct.id}`);
  };

  return (
    <section className="bg-[#FAF7F2] min-h-screen">
      {/* Back Navigation */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pt-24 pb-12">
        <Link
          href="/"
          className="inline-flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#A67C7C] hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Back to Products
        </Link>
      </div>

      {/* Main Product Section */}
      <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Product Image */}
          <div className="relative">
            <div className="aspect-[4/5] bg-white rounded-[2rem] overflow-hidden shadow-sm">
              {!imageLoaded && (
                <div className="absolute inset-0 z-10 bg-[#F5F2ED] overflow-hidden">
                  <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300 animate-pulse">
                      Loading...
                    </span>
                  </div>
                </div>
              )}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={product.imageUrl}
                alt={product.name}
                onLoad={() => setImageLoaded(true)}
                className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
                  imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
                }`}
              />
            </div>

            {/* Category Badge */}
            <div className="absolute top-8 left-8 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm">
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-slate-500">
                {product.category}
              </span>
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center">
            {/* Brand */}
            <div className="inline-flex items-center gap-4 mb-6">
              <span className="w-12 h-[1px] bg-[#A67C7C]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#A67C7C]">
                {product.brand}
              </span>
            </div>

            {/* Product Name */}
            <h1 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight mb-6">
              {product.name}
            </h1>

            {/* Price & Size */}
            <div className="flex items-baseline gap-4 mb-6">
              <span className="text-3xl font-serif italic text-slate-900">
                ${product.price.toFixed(2)}
              </span>
              {product.size && (
                <span className="text-sm text-slate-400">
                  · {product.size}
                </span>
              )}
            </div>

            {/* Rating */}
            {product.rating && (
              <div className="flex items-center gap-2 mb-8">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(product.rating!) ? 'text-[#A67C7C] fill-[#A67C7C]' : 'text-slate-200'}
                    />
                  ))}
                </div>
                <span className="text-sm text-slate-500 font-medium">{product.rating}</span>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-lg text-slate-600 leading-relaxed mb-10 font-serif italic">
                {product.description}
              </p>
            )}

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={isLoading}
                className={`flex items-center gap-3 px-8 py-4 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all ${
                  inCart
                    ? 'bg-[#A67C7C] text-white'
                    : 'bg-slate-900 text-white hover:bg-[#A67C7C]'
                }`}
              >
                {isLoading ? (
                  <Loader2 size={16} className="animate-spin" />
                ) : (
                  <ShoppingBag size={16} />
                )}
                {inCart ? 'In Cart' : 'Add to Cart'}
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`p-4 rounded-full border transition-all ${
                  wishlisted
                    ? 'bg-[#FDF2F2] border-[#A67C7C] text-[#A67C7C]'
                    : 'border-slate-200 text-slate-400 hover:border-[#A67C7C] hover:text-[#A67C7C]'
                }`}
                title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
              >
                <Heart size={20} fill={wishlisted ? 'currentColor' : 'none'} />
              </button>

              <button
                onClick={handleToggleSave}
                className={`p-4 rounded-full border transition-all ${
                  saved
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-500'
                    : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
                }`}
                title={saved ? 'Remove from Saved' : 'Save for Later'}
              >
                <Bookmark size={20} fill={saved ? 'currentColor' : 'none'} />
              </button>
            </div>

            {/* AI Actions */}
            <div className="flex flex-wrap gap-3 pt-8 border-t border-slate-200">
              <button
                onClick={handleAddToCompare}
                className={`flex items-center gap-2 px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] transition-all ${
                  inComparison
                    ? 'bg-[#A67C7C] text-white'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-[#A67C7C] hover:text-[#A67C7C]'
                }`}
              >
                <ArrowRightLeft size={14} />
                {inComparison ? 'In Comparison' : 'Add to Compare'}
              </button>

              <button
                onClick={handleSafetyAudit}
                disabled={isLoading}
                className="flex items-center gap-2 px-6 py-3 bg-white border border-slate-200 text-slate-700 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:border-[#A67C7C] hover:text-[#A67C7C] transition-all disabled:opacity-50"
              >
                {isLoading ? (
                  <Loader2 size={14} className="animate-spin" />
                ) : (
                  <ShieldAlert size={14} />
                )}
                Safety Audit
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Ingredients Section */}
      <div className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-serif text-slate-900 mb-4">Key Ingredients</h2>
            <p className="text-slate-400 font-serif italic">What makes this formula work</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ingredientBenefits.map((ing, idx) => (
              <div
                key={idx}
                className="p-6 bg-[#FAF7F2] rounded-2xl hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-full bg-white group-hover:bg-[#FDF2F2] transition-colors">
                    <ing.icon size={20} className="text-slate-400 group-hover:text-[#A67C7C] transition-colors" />
                  </div>
                  <div>
                    <h3 className="font-medium text-slate-900 mb-1">{ing.name}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A67C7C] mb-2 block">
                      {ing.label}
                    </span>
                    <p className="text-sm text-slate-500">{ing.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products Section */}
      {relatedProducts.length > 0 && (
        <div className="py-20 bg-[#FAF7F2]">
          <div className="max-w-6xl mx-auto px-6 lg:px-12">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-serif text-slate-900 mb-4">Related Products</h2>
              <p className="text-slate-400 font-serif italic">More from {product.category}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedProducts.map((related) => (
                <div
                  key={related.id}
                  onClick={() => handleRelatedProductClick(related)}
                  className="bg-white rounded-[2rem] overflow-hidden cursor-pointer group hover:shadow-lg transition-all"
                >
                  <div className="aspect-[4/5] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={related.imageUrl}
                      alt={related.name}
                      className="w-full h-full object-cover grayscale-[15%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                    />
                  </div>
                  <div className="p-6 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C] mb-2 block">
                      {related.brand}
                    </span>
                    <h3 className="text-xl font-serif text-slate-900 mb-2 group-hover:italic transition-all">
                      {related.name}
                    </h3>
                    <span className="text-lg font-serif italic text-slate-600">
                      ${related.price.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
