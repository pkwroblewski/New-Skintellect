import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Globe, Plus, X } from 'lucide-react';
import { ProductCard } from '@/components/product/ProductCard';
import { ComparisonWidget } from '@/components/comparison/ComparisonWidget';
import { useProducts } from '@/hooks/useProducts';
import { useCart } from '@/context/CartContext';
import { useComparison } from '@/context/ComparisonContext';

export const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [ingredientInput, setIngredientInput] = useState('');

  const {
    filteredProducts,
    searchQuery,
    targetIngredients,
    setSearchQuery,
    addIngredient,
    removeIngredient,
    clearFilters
  } = useProducts();

  const { toggleWishlist, toggleSaveForLater, addToCart, isWishlisted, isSaved } = useCart();
  const {
    comparisonList,
    pendingProductIds,
    toggleProductInComparison,
    runComparison,
    runSafetyAudit,
    isInComparison
  } = useComparison();

  const handleAddIngredient = (e: React.FormEvent) => {
    e.preventDefault();
    if (ingredientInput) {
      addIngredient(ingredientInput);
      setIngredientInput('');
    }
  };

  const handleSafetyAudit = async (product: typeof filteredProducts[0]) => {
    try {
      await runSafetyAudit(product);
    } catch {
      alert('Safety audit is currently unavailable.');
    }
  };

  const handleQuickCompare = (product: typeof filteredProducts[0]) => {
    if (comparisonList.length === 1 && comparisonList[0].id !== product.id) {
      runComparison(comparisonList[0], product)
        .then(() => navigate('/compare'))
        .catch(() => alert('AI Analysis is currently unavailable.'));
    } else {
      toggleProductInComparison(product);
    }
  };

  return (
    <>
      {/* High-Impact Hero Section */}
      <section className="relative overflow-hidden bg-[#FAF7F2] min-h-[95vh] flex items-center">
        <div className="absolute top-0 right-0 w-full lg:w-[60%] h-full">
          <div className="relative w-full h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAF7F2] via-[#FAF7F2]/60 to-transparent z-10 hidden lg:block"></div>
            <img
              src="https://images.unsplash.com/photo-1594465919760-441fe5908ab0?q=80&w=2000&auto=format&fit=crop"
              alt="Serene Beauty Profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-6 lg:px-12 relative z-20 w-full grid lg:grid-cols-2 gap-12 py-20">
          <div className="flex flex-col justify-center">
            <div className="inline-flex items-center gap-4 mb-12">
              <span className="w-16 h-[1px] bg-[#A67C7C]"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#A67C7C]">
                Biological Integrity
              </span>
            </div>

            <h1 className="text-7xl md:text-[10rem] font-serif text-slate-900 leading-[0.8] mb-14 tracking-tighter">
              Essential <br />
              <span className="italic font-light">Chemistry.</span>
            </h1>

            <div className="max-w-md space-y-10">
              <p className="text-2xl font-serif text-slate-500 italic leading-relaxed">
                "A digital sanctuary where AI transparency meets high-end dermatological mastery."
              </p>

              <div className="space-y-6">
                <div className="relative group border-b border-slate-300 focus-within:border-[#A67C7C] transition-all py-2">
                  <input
                    type="text"
                    placeholder="Search products or brands..."
                    className="w-full bg-transparent outline-none text-xl font-serif italic text-slate-800 placeholder:text-slate-300"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute right-0 top-3 text-slate-200 group-focus-within:text-[#A67C7C] transition-colors" size={20} />
                </div>

                <form onSubmit={handleAddIngredient} className="relative group border-b border-slate-300 focus-within:border-indigo-300 transition-all py-2">
                  <input
                    type="text"
                    placeholder="Add required ingredient (e.g. Squalane)"
                    className="w-full bg-transparent outline-none text-sm font-bold uppercase tracking-widest text-slate-600 placeholder:text-slate-300"
                    value={ingredientInput}
                    onChange={(e) => setIngredientInput(e.target.value)}
                  />
                  <button type="submit" className="absolute right-0 top-2 p-1 text-slate-200 hover:text-slate-900">
                    <Plus size={20} />
                  </button>
                </form>

                {targetIngredients.length > 0 && (
                  <div className="flex flex-wrap gap-2 animate-in fade-in slide-in-from-top-2 duration-500">
                    {targetIngredients.map(ing => (
                      <span key={ing} className="flex items-center gap-2 px-3 py-1.5 bg-[#FDF2F2] text-[#A67C7C] text-[10px] font-bold uppercase tracking-widest rounded-full border border-[#A67C7C]/20">
                        {ing}
                        <button onClick={() => removeIngredient(ing)}><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marketplace Grid */}
      <section className="max-w-7xl mx-auto px-6 lg:px-12 py-40">
        <div className="flex flex-col items-center mb-32 text-center">
          <Globe size={24} className="text-[#A67C7C] mb-8 animate-pulse" />
          <h2 className="text-7xl font-serif text-slate-900 mb-6 tracking-tighter">The Global Archive</h2>
          <p className="text-slate-400 font-serif italic text-2xl">Curating clinical standards from around the world.</p>
        </div>

        {filteredProducts.length > 0 ? (
          <div data-product-grid className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-20 gap-y-40">
            {filteredProducts.map(p => (
              <ProductCard
                key={p.id}
                product={p}
                isSelectedForComparison={isInComparison(p.id)}
                isActionLoading={pendingProductIds.has(p.id)}
                isWishlisted={isWishlisted(p.id)}
                isSaved={isSaved(p.id)}
                onToggleWishlist={toggleWishlist}
                onToggleSave={toggleSaveForLater}
                onAddToCart={addToCart}
                onAddToCompare={toggleProductInComparison}
                onSafetyAudit={handleSafetyAudit}
                onCompare={handleQuickCompare}
                onView={() => {}}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-40">
            <div className="text-4xl font-serif text-slate-300 italic mb-4">No matching formulations found.</div>
            <button onClick={clearFilters} className="text-[11px] font-bold uppercase tracking-widest text-[#A67C7C] hover:text-slate-900 transition">
              Reset Search Lab
            </button>
          </div>
        )}
      </section>

      {/* Floating Comparison Widget */}
      <ComparisonWidget />
    </>
  );
};
