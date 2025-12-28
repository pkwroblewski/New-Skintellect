import React from 'react';
import { Loader2, Beaker } from 'lucide-react';

interface LoadingOverlayProps {
  message?: string;
  submessage?: string;
}

export const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  message = 'Molecular Calibration',
  submessage = 'Cross-referencing formulation sequences against international clinical databases...'
}) => {
  return (
    <div className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-3xl flex items-center justify-center">
      <div className="text-center max-w-sm">
        <div className="relative w-40 h-40 mx-auto mb-16">
          <div className="absolute inset-0 border border-slate-100 rounded-full scale-[2] animate-pulse"></div>
          <div className="absolute inset-0 border border-[#A67C7C]/30 rounded-full scale-150 animate-ping"></div>
          <Loader2 className="w-full h-full text-[#A67C7C] animate-spin-slow font-thin opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Beaker className="text-[#A67C7C]" size={40} />
          </div>
        </div>
        <h3 className="text-4xl font-serif text-slate-900 mb-6 italic tracking-tight">{message}</h3>
        <p className="text-[11px] font-bold uppercase tracking-[0.6em] text-slate-400 leading-loose">
          {submessage}
        </p>
      </div>
    </div>
  );
};
