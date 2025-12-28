import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { AnalysisPanel } from '@/components/comparison/AnalysisPanel';
import { useComparison } from '@/context/ComparisonContext';

export const ComparePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedProduct, comparisonTarget, analysis, resetComparison } = useComparison();

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
            <div className="text-4xl font-light font-serif italic text-slate-900">${selectedProduct.price.toFixed(2)}</div>
          </div>

          <div className="bg-white p-20 flex flex-col items-center text-center rounded-sm">
            <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-[#A67C7C] mb-12 italic">AI Candidate</span>
            <img src={comparisonTarget.imageUrl} className="w-56 aspect-[3/4] object-cover mb-12 shadow-2xl" alt={comparisonTarget.name} />
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#A67C7C] mb-3">{comparisonTarget.brand}</h4>
            <h3 className="text-4xl font-serif text-slate-900 leading-tight mb-6">{comparisonTarget.name}</h3>
            <div className="text-4xl font-light font-serif italic text-slate-900">${comparisonTarget.price.toFixed(2)}</div>
          </div>
        </div>

        <AnalysisPanel analysis={analysis} source={selectedProduct} target={comparisonTarget} />
      </div>
    </section>
  );
};
