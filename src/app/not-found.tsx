import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
      <div className="text-center max-w-md px-6">
        <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-[#FDF2F2] flex items-center justify-center">
          <Sparkles size={40} className="text-[#A67C7C]" />
        </div>
        <h1 className="text-6xl font-serif text-slate-900 mb-4 italic">404</h1>
        <h2 className="text-2xl font-serif text-slate-900 mb-4 italic">Page Not Found</h2>
        <p className="text-slate-400 font-serif text-lg mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-slate-900 text-white rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#A67C7C] transition-colors"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
