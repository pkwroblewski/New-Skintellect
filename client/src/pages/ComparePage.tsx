import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingBag, Bookmark, Heart } from 'lucide-react';
import { AnalysisPanel } from '@/components/comparison/AnalysisPanel';
import { useComparison } from '@/context/ComparisonContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProduct, comparisonTarget, analysis, resetComparison } = useComparison();
  const { addToCart, toggleWishlist, toggleSaveForLater, isWishlisted, isSaved } = useCart();
  const toast = useToast();

  const handleAddToCart = (productId: string, productName: string) => {
    addToCart(productId);
    toast.success(`${productName} added to cart`);
  };

  const handleAddBothToCart = () => {
    if (selectedProduct && comparisonTarget) {
      addToCart(selectedProduct.id);
      addToCart(comparisonTarget.id);
      toast.success('Both products added to cart');
    }
  };

  const handleToggleWishlist = (productId: string, productName: string) => {
    toggleWishlist(productId);
    const wasWishlisted = isWishlisted(productId);
    toast.info(wasWishlisted ? `${productName} removed from wishlist` : `${productName} added to wishlist`);
  };

  const handleToggleSave = (productId: string, productName: string) => {
    toggleSaveForLater(productId);
    const wasSaved = isSaved(productId);
    toast.info(wasSaved ? `${productName} removed from saved items` : `${productName} saved for later`);
  };

  const handleBack = () => {
    resetComparison();
    navigate('/');
  };

  // Redirect if no comparison data
  if (!selectedProduct || !comparisonTarget || !analysis) {
    return (
      <section className="bg-[#FAF7F2] min-h-screen py-24 px-6 lg:px-12">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-serif text-slate-900 mb-6 italic">No Comparison Active</h2>
          <p className="text-slate-500 mb-8">Select two products to compare from the marketplace.</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-3 px-8 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
          >
            <ArrowLeft size={14} />
            Back to Marketplace
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF7F2] min-h-screen py-24 px-6 lg:px-12">
      <div className="max-w-6xl mx-auto">
        <button
          onClick={handleBack}
          className="mb-20 flex items-center gap-4 text-[11px] font-bold uppercase tracking-[0.5em] text-[#A67C7C] hover:text-slate-900 transition-colors group"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          Laboratory Overview
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-24">
          <div className="bg-white p-20 flex flex-col items-center text-center rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-300 mb-12 italic">Control formulation</span>
            <img src={selectedProduct.imageUrl} className="w-56 aspect-[3/4] object-cover mb-12 grayscale-[20%]" alt={selectedProduct.name} />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#A67C7C] mb-3">{selectedProduct.brand}</h4>
            <h3 className="text-4xl font-serif text-slate-900 leading-tight mb-6">{selectedProduct.name}</h3>
            <div className="text-4xl font-light font-serif italic text-slate-900 mb-8">${selectedProduct.price.toFixed(2)}</div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddToCart(selectedProduct.id, selectedProduct.name)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
              <button
                onClick={() => handleToggleWishlist(selectedProduct.id, selectedProduct.name)}
                className={`p-3 rounded-full border transition-all ${
                  isWishlisted(selectedProduct.id)
                    ? 'bg-[#FDF2F2] border-[#A67C7C] text-[#A67C7C]'
                    : 'border-slate-200 text-slate-400 hover:border-[#A67C7C] hover:text-[#A67C7C]'
                }`}
              >
                <Heart size={16} fill={isWishlisted(selectedProduct.id) ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => handleToggleSave(selectedProduct.id, selectedProduct.name)}
                className={`p-3 rounded-full border transition-all ${
                  isSaved(selectedProduct.id)
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-500'
                    : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
                }`}
              >
                <Bookmark size={16} fill={isSaved(selectedProduct.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>

          <div className="bg-white p-20 flex flex-col items-center text-center rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A67C7C] mb-12 italic">AI Candidate</span>
            <img src={comparisonTarget.imageUrl} className="w-56 aspect-[3/4] object-cover mb-12 shadow-2xl" alt={comparisonTarget.name} />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#A67C7C] mb-3">{comparisonTarget.brand}</h4>
            <h3 className="text-4xl font-serif text-slate-900 leading-tight mb-6">{comparisonTarget.name}</h3>
            <div className="text-4xl font-light font-serif italic text-slate-900 mb-8">${comparisonTarget.price.toFixed(2)}</div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => handleAddToCart(comparisonTarget.id, comparisonTarget.name)}
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-full text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
              >
                <ShoppingBag size={14} />
                Add to Cart
              </button>
              <button
                onClick={() => handleToggleWishlist(comparisonTarget.id, comparisonTarget.name)}
                className={`p-3 rounded-full border transition-all ${
                  isWishlisted(comparisonTarget.id)
                    ? 'bg-[#FDF2F2] border-[#A67C7C] text-[#A67C7C]'
                    : 'border-slate-200 text-slate-400 hover:border-[#A67C7C] hover:text-[#A67C7C]'
                }`}
              >
                <Heart size={16} fill={isWishlisted(comparisonTarget.id) ? 'currentColor' : 'none'} />
              </button>
              <button
                onClick={() => handleToggleSave(comparisonTarget.id, comparisonTarget.name)}
                className={`p-3 rounded-full border transition-all ${
                  isSaved(comparisonTarget.id)
                    ? 'bg-indigo-50 border-indigo-300 text-indigo-500'
                    : 'border-slate-200 text-slate-400 hover:border-indigo-300 hover:text-indigo-500'
                }`}
              >
                <Bookmark size={16} fill={isSaved(comparisonTarget.id) ? 'currentColor' : 'none'} />
              </button>
            </div>
          </div>
        </div>

        {/* Add Both to Cart Button */}
        <div className="flex justify-center mb-24">
          <button
            onClick={handleAddBothToCart}
            className="flex items-center gap-3 px-10 py-4 bg-[#A67C7C] text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-slate-900 transition-colors shadow-lg"
          >
            <ShoppingBag size={16} />
            Add Both to Cart
          </button>
        </div>

        <AnalysisPanel analysis={analysis} source={selectedProduct} target={comparisonTarget} />
      </div>
    </section>
  );
};
