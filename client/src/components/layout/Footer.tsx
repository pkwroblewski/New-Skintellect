import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-[#E8E2D9] py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          <div className="lg:col-span-5">
            <span className="text-5xl font-serif font-semibold italic text-slate-900 block mb-10">
              DermaLogic<span className="text-[#A67C7C] font-normal not-italic">.</span>
            </span>
            <p className="text-slate-400 font-serif italic text-xl max-w-sm leading-relaxed mb-12">
              "A computational sanctuary where biological data and minimalist aesthetics converge."
            </p>
          </div>
        </div>

        <div className="mt-40 pt-10 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.5em] text-slate-200">
            © 2024 DermaLogic AI Laboratory. Conscious beauty, mathematically defined.
          </p>
        </div>
      </div>
    </footer>
  );
};
