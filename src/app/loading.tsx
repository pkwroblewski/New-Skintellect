export default function Loading() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-[#FAF7F2]">
      <div className="text-center">
        <div className="w-12 h-12 border-3 border-[#A67C7C] border-t-transparent rounded-full animate-spin mx-auto mb-6" />
        <p className="text-slate-400 font-serif italic text-lg">Loading...</p>
      </div>
    </section>
  );
}
