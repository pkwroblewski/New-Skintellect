import React from 'react';
import { X, ShieldCheck, Activity, Info } from 'lucide-react';
import type { Product } from '@/types';

interface SafetyModalProps {
  product: Product;
  report: string;
  onClose: () => void;
}

export const SafetyModal: React.FC<SafetyModalProps> = ({ product, report, onClose }) => {
  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/40 backdrop-blur-md animate-in fade-in duration-500"
      onClick={onClose}
    >
      <div
        className="relative bg-[#FAF7F2] w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-[3rem] border border-[#E8E2D9] shadow-2xl flex flex-col animate-in zoom-in-95 duration-500"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-8 lg:p-12 border-b border-[#E8E2D9] flex justify-between items-start">
          <div className="flex gap-6 items-center">
            <div className="w-20 h-28 overflow-hidden rounded-xl bg-white shadow-sm flex-shrink-0">
              <img src={product.imageUrl} className="w-full h-full object-cover" alt={product.name} />
            </div>
            <div>
              <div className="flex items-center gap-2 text-[#A67C7C] mb-2">
                <ShieldCheck size={16} />
                <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Ingredient Intelligence</span>
              </div>
              <h2 className="text-3xl font-serif text-slate-900 leading-tight italic">{product.brand}</h2>
              <h3 className="text-xl font-serif text-slate-500">{product.name}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-slate-200/50 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 lg:p-12 no-scrollbar">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-slate prose-lg font-serif italic text-slate-700 leading-relaxed whitespace-pre-wrap">
              {report}
            </div>

            <div className="mt-16 pt-8 border-t border-[#E8E2D9] flex flex-col md:flex-row gap-8 items-center text-slate-400">
              <div className="flex items-center gap-3">
                <Activity size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Dermatologically Analyzed</span>
              </div>
              <div className="flex items-center gap-3">
                <Info size={18} />
                <span className="text-[10px] font-bold uppercase tracking-widest">Real-time Molecular Feed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-8 lg:p-10 bg-white border-t border-[#E8E2D9] flex justify-center">
          <button
            onClick={onClose}
            className="px-12 py-4 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.3em] hover:bg-[#A67C7C] transition-all shadow-xl shadow-black/10"
          >
            Dismiss Report
          </button>
        </div>
      </div>
    </div>
  );
};
