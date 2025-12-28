import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { SafetyModal } from '@/components/comparison/SafetyModal';
import { CartProvider, useCart } from '@/context/CartContext';
import { ComparisonProvider, useComparison } from '@/context/ComparisonContext';
import { HomePage } from '@/pages/HomePage';
import { ComparePage } from '@/pages/ComparePage';

const AppContent: React.FC = () => {
  const { cartCount } = useCart();
  const { isLoading, auditProduct, safetyReport, closeSafetyModal } = useComparison();

  return (
    <div className="min-h-screen selection:bg-[#FDF2F2] selection:text-[#A67C7C]">
      <Navbar cartCount={cartCount} />

      <ErrorBoundary>
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/compare" element={<ComparePage />} />
            {/* Placeholder routes for future pages */}
            <Route path="/science" element={<PlaceholderPage title="Science" />} />
            <Route path="/dupes" element={<PlaceholderPage title="Dupes" />} />
            <Route path="/product/:id" element={<PlaceholderPage title="Product Detail" />} />
          </Routes>
        </main>
      </ErrorBoundary>

      <Footer />

      {/* Global Loading Overlay */}
      {isLoading && <LoadingOverlay />}

      {/* Safety Modal */}
      {auditProduct && safetyReport && (
        <SafetyModal
          product={auditProduct}
          report={safetyReport}
          onClose={closeSafetyModal}
        />
      )}
    </div>
  );
};

// Placeholder component for future pages
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <section className="min-h-[60vh] flex items-center justify-center bg-[#FAF7F2]">
    <div className="text-center">
      <h1 className="text-6xl font-serif text-slate-900 mb-6 italic">{title}</h1>
      <p className="text-slate-400 font-serif text-xl">Coming soon...</p>
    </div>
  </section>
);

const App: React.FC = () => {
  return (
    <CartProvider>
      <ComparisonProvider>
        <AppContent />
      </ComparisonProvider>
    </CartProvider>
  );
};

export default App;
