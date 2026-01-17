'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Beaker,
  Check,
  ArrowRightLeft,
  ShieldAlert,
  Loader2,
  Droplets,
  Zap,
  Wind,
  Shield,
  Sun,
  FlaskConical,
  Heart,
  ShoppingBag,
  Bookmark,
  type LucideIcon
} from 'lucide-react';
import type { Product } from '@/lib/types';

interface ProductCardProps {
  product: Product;
  onCompare?: (p: Product) => void;
  onView?: (p: Product) => void;
  onAddToCompare?: (p: Product) => void;
  onSafetyAudit?: (p: Product) => void;
  onToggleWishlist?: (id: string) => void;
  onToggleSave?: (id: string) => void;
  onAddToCart?: (id: string) => void;
  isWishlisted?: boolean;
  isSaved?: boolean;
  isSelectedForComparison?: boolean;
  isActionLoading?: boolean;
}

interface IngredientBenefit {
  label: string;
  icon: LucideIcon;
}

// Utility to map ingredients to benefit categories
const getIngredientBenefit = (ingredient: string): IngredientBenefit => {
  const ing = ingredient.toLowerCase();
  if (ing.includes('retinol') || ing.includes('peptide') || ing.includes('retinoid') || ing.includes('bakuchiol')) {
    return { label: 'Renewal', icon: Zap };
  }
  if (ing.includes('hyaluronic') || ing.includes('glycerin') || ing.includes('aloe') || ing.includes('hydra')) {
    return { label: 'Hydration', icon: Droplets };
  }
  if (ing.includes('ceramide') || ing.includes('squalane') || ing.includes('shea') || ing.includes('barrier') || ing.includes('cholesterol')) {
    return { label: 'Barrier', icon: Shield };
  }
  if (ing.includes('oat') || ing.includes('centella') || ing.includes('green tea') || ing.includes('bisabolol') || ing.includes('niacinamide')) {
    return { label: 'Soothing', icon: Wind };
  }
  if (ing.includes('spf') || ing.includes('sun') || ing.includes('avobenzone') || ing.includes('octisalate')) {
    return { label: 'Protection', icon: Sun };
  }
  return { label: 'Essential', icon: FlaskConical };
};

export function ProductCard({
  product,
  onCompare,
  onView,
  onAddToCompare,
  onSafetyAudit,
  onToggleWishlist,
  onToggleSave,
  onAddToCart,
  isWishlisted,
  isSaved,
  isSelectedForComparison,
  isActionLoading
}: ProductCardProps) {
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleCardClick = () => {
    if (onView) {
      onView(product);
    }
    router.push(`/product/${product.id}`);
  };

  const heroMolecule = product.ingredients[0].split(' ')[0];

  const topIngredients = product.ingredients.slice(0, 3).map(ing => ({
    name: ing,
    ...getIngredientBenefit(ing)
  }));

  return (
    <div
      className={`group relative flex flex-col items-center cursor-pointer transition-all duration-1000 ease-in-out ${isActionLoading ? 'pointer-events-none' : ''}`}
      onClick={handleCardClick}
    >
      {/* Background Molecular Trace (Artistic) */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-[0.03] transition-opacity duration-1000 pointer-events-none -z-10">
        <span className="text-[12rem] font-serif italic tracking-tighter select-none">
          {heroMolecule}
        </span>
      </div>

      {/* Floating Image Composition */}
      <div className="relative w-full aspect-[4/5] mb-10 overflow-hidden bg-[#FAF7F2]">
        {/* Elegant Skeleton Loader */}
        {!imageLoaded && (
          <div className="absolute inset-0 z-10 bg-[#F5F2ED] overflow-hidden">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300 animate-pulse">
                Calibrating...
              </span>
            </div>
          </div>
        )}

        <img
          src={product.imageUrl}
          alt={product.name}
          loading="lazy"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover transition-all duration-[1.5s] ease-out ${
            imageLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-110'
          } ${
            isSelectedForComparison ? 'grayscale-0 scale-105' : 'grayscale-[15%] group-hover:grayscale-0 group-hover:scale-110'
          } ${isActionLoading ? 'blur-[2px] opacity-70' : ''}`}
        />

        {/* Action Controls - Top Overlay */}
        <div className="absolute top-4 right-4 z-30 flex flex-col gap-2">
          {/* Wishlist Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(product.id); }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-500 shadow-lg border ${
              isWishlisted
                ? 'bg-[#A67C7C] border-[#A67C7C] text-white'
                : 'bg-white/80 border-white text-slate-400 hover:text-[#A67C7C] opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0'
            }`}
            title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} className={isWishlisted ? 'animate-pulse' : ''} />
          </button>

          {/* Save for Later Toggle */}
          <button
            onClick={(e) => { e.stopPropagation(); onToggleSave?.(product.id); }}
            className={`p-3 rounded-full backdrop-blur-md transition-all duration-500 shadow-lg border ${
              isSaved
                ? 'bg-slate-900 border-slate-900 text-white'
                : 'bg-white/80 border-white text-slate-400 hover:text-slate-900 opacity-0 translate-y-[-10px] group-hover:opacity-100 group-hover:translate-y-0 delay-75'
            }`}
            title={isSaved ? 'Remove from Saved' : 'Save for Later'}
          >
            <Bookmark size={16} fill={isSaved ? 'currentColor' : 'none'} />
          </button>
        </div>

        {/* Progress Indicator (Loading Bar) */}
        {isActionLoading && (
          <div className="absolute top-0 left-0 w-full h-1 bg-slate-100 overflow-hidden z-20">
            <div className="h-full bg-[#A67C7C] animate-progress-indefinite"></div>
          </div>
        )}

        {/* Selection Overlay */}
        {isSelectedForComparison && !isActionLoading && (
          <div className="absolute inset-0 bg-[#A67C7C]/20 backdrop-blur-[2px] flex items-center justify-center z-10">
            <div className="bg-white rounded-full p-4 shadow-xl">
              <Check className="text-[#A67C7C]" size={24} />
            </div>
          </div>
        )}

        {/* Subtle Category Badge */}
        <div className="absolute top-6 left-6 overflow-hidden z-20">
          <span className="inline-block text-[9px] font-bold uppercase tracking-[0.4em] text-slate-400 translate-y-full group-hover:translate-y-0 transition-transform duration-700">
            {product.category}
          </span>
        </div>

        {/* Hover Action HUD */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center gap-2.5 opacity-0 group-hover:opacity-100 transition-all duration-700 bg-black/5 backdrop-blur-[1px] z-20 ${isActionLoading ? 'opacity-100' : ''}`}>
          {isActionLoading ? (
            <div className="bg-white/90 backdrop-blur-md rounded-full p-6 shadow-2xl animate-pulse">
              <Loader2 className="text-[#A67C7C] animate-spin" size={32} />
            </div>
          ) : (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); onAddToCart?.(product.id); }}
                className="flex items-center gap-3 px-8 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-xl hover:bg-[#A67C7C] transition-all scale-90 group-hover:scale-100 w-[200px] justify-center"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onAddToCompare?.(product); }}
                className={`flex items-center gap-3 px-8 py-3 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg transition-all scale-90 group-hover:scale-100 w-[200px] justify-center ${
                  isSelectedForComparison
                    ? 'bg-white text-slate-900 border border-slate-200'
                    : 'bg-white/90 backdrop-blur-md text-slate-900 hover:bg-white'
                }`}
              >
                {isSelectedForComparison ? <Check size={14} /> : <ArrowRightLeft size={14} />}
                {isSelectedForComparison ? 'In Comparison' : 'Add to Compare'}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onCompare?.(product); }}
                className="flex items-center gap-3 px-8 py-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-all scale-90 group-hover:scale-100 w-[200px] justify-center"
              >
                <Beaker size={14} />
                Quick Match
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); onSafetyAudit?.(product); }}
                className="flex items-center gap-3 px-8 py-3 bg-white/90 backdrop-blur-md text-slate-900 rounded-full text-[10px] font-bold uppercase tracking-[0.2em] shadow-lg hover:bg-white transition-all scale-90 group-hover:scale-100 w-[200px] justify-center"
              >
                <ShieldAlert size={14} />
                Safety Audit
              </button>
            </>
          )}
        </div>
      </div>

      {/* Text Hierarchy */}
      <div className="flex flex-col items-center w-full px-4 space-y-3">
        <div className="flex items-center gap-3">
          <span className="w-6 h-[1px] bg-slate-200"></span>
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#A67C7C]">
            {product.brand}
          </span>
          <span className="w-6 h-[1px] bg-slate-200"></span>
        </div>

        <h3 className="text-2xl font-serif text-slate-900 leading-tight group-hover:italic transition-all duration-700 text-center">
          {product.name}
        </h3>

        <div className="pt-1">
          <span className="text-lg font-light text-slate-900 font-serif italic">${product.price.toFixed(2)}</span>
        </div>

        {/* Molecular Benefits - Top 3 Ingredients */}
        <div className="flex justify-center gap-4 pt-4 border-t border-slate-100 w-full mt-2">
          {topIngredients.map((ing, idx) => (
            <div key={idx} className="flex flex-col items-center group/ing transition-all duration-500">
              <div className="p-2 rounded-full bg-slate-50 group-hover/ing:bg-[#FDF2F2] transition-colors mb-1">
                <ing.icon size={12} className="text-slate-400 group-hover/ing:text-[#A67C7C]" />
              </div>
              <span className="text-[7px] font-bold uppercase tracking-[0.2em] text-slate-400 group-hover/ing:text-slate-900 transition-colors">
                {ing.label}
              </span>
            </div>
          ))}
        </div>

        <div className="gap-2 pt-4 hidden sm:flex">
          <div className="w-1 h-1 rounded-full bg-[#A67C7C] opacity-30 group-hover:opacity-100 transition-opacity"></div>
          <div className="w-1 h-1 rounded-full bg-[#A67C7C] opacity-10 group-hover:opacity-100 transition-opacity delay-75"></div>
          <div className="w-1 h-1 rounded-full bg-[#A67C7C] opacity-5 group-hover:opacity-100 transition-opacity delay-150"></div>
        </div>

        {/* Mobile Quick Actions - Always visible on touch devices */}
        <div className="flex gap-2 pt-4 sm:hidden">
          <button
            onClick={(e) => { e.stopPropagation(); onAddToCart?.(product.id); }}
            className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.15em] hover:bg-[#A67C7C] transition-colors"
          >
            <ShoppingBag size={14} />
            Add to Cart
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); onToggleWishlist?.(product.id); }}
            className={`p-3 rounded-full border transition-all ${
              isWishlisted
                ? 'bg-[#FDF2F2] border-[#A67C7C] text-[#A67C7C]'
                : 'border-slate-200 text-slate-400'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? 'currentColor' : 'none'} />
          </button>
        </div>
      </div>
    </div>
  );
}
