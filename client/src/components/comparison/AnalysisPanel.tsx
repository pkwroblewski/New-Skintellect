import React from 'react';
import { Sparkles, Activity, Gem } from 'lucide-react';
import type { AIAnalysis, Product } from '@/types';

interface AnalysisPanelProps {
  analysis: AIAnalysis;
  source: Product;
  target: Product;
}

export const AnalysisPanel: React.FC<AnalysisPanelProps> = ({ analysis, source: _source, target: _target }) => {
  return (
    <div className="bg-white rounded-[3rem] p-10 lg:p-16 border border-[#E8E2D9] shadow-2xl shadow-[#A67C7C]/5">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div>
          <div className="flex items-center gap-2 text-[#A67C7C] mb-4">
            <Sparkles size={16} />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Scientific Disclosure</span>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif text-slate-900 leading-tight">
            Molecular<br />Comparison Analysis
          </h2>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Efficacy Match</div>
            <div className="text-5xl font-serif font-semibold text-[#A67C7C]">{analysis.matchScore}%</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        <div className="lg:col-span-7 space-y-12">
          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#A67C7C]"></span>
              The Science
            </h3>
            <p className="text-lg font-serif text-slate-600 leading-relaxed italic">
              "{analysis.summary}"
            </p>
          </section>

          <section>
            <h3 className="text-sm font-bold uppercase tracking-[0.2em] text-slate-900 mb-6 flex items-center gap-3">
              <span className="w-8 h-[1px] bg-[#A67C7C]"></span>
              Active Bio-Markers
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {analysis.keyIngredients.map((ing, i) => (
                <div key={i} className="group p-5 bg-[#F0F4F8] rounded-2xl hover:bg-[#A67C7C] hover:text-white transition-all duration-500">
                  <div className="flex items-center gap-2 mb-2">
                    {ing.isKeyActive && <Gem size={14} className="text-[#A67C7C] group-hover:text-white" />}
                    <span className="font-bold text-[13px] tracking-wide uppercase">{ing.name}</span>
                  </div>
                  <p className="text-xs opacity-70 leading-relaxed">{ing.benefit}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="lg:col-span-5 space-y-8">
          <div className="p-10 bg-[#FAF7F2] rounded-[2.5rem] border border-[#E8E2D9]">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A67C7C] mb-6">Market Intelligence</h4>

            <div className="space-y-8">
              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Value Verdict</div>
                <div className="text-2xl font-serif text-slate-900 italic underline decoration-[#A67C7C] underline-offset-8 decoration-2">
                  {analysis.verdict}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-2">Pricing Context</div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {analysis.priceAnalysis}
                </p>
              </div>

              <div className="pt-4">
                <button className="w-full py-5 bg-slate-900 text-white rounded-full text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors shadow-xl shadow-black/10">
                  Purchase Analysis Guide
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4 px-6 text-slate-400 italic text-sm">
            <Activity size={16} />
            <span>AI model calibrated on clinical dermatological data.</span>
          </div>
        </div>
      </div>
    </div>
  );
};
