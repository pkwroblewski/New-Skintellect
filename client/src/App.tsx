import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ErrorBoundary } from '@/components/common/ErrorBoundary';
import { LoadingOverlay } from '@/components/common/LoadingOverlay';
import { ToastContainer } from '@/components/common/Toast';
import { SafetyModal } from '@/components/comparison/SafetyModal';
import { CartProvider, useCart } from '@/context/CartContext';
import { ComparisonProvider, useComparison } from '@/context/ComparisonContext';
import { ToastProvider } from '@/context/ToastContext';
import { HomePage } from '@/pages/HomePage';
import { ComparePage } from '@/pages/ComparePage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutPage } from '@/pages/CheckoutPage';
import { OrderConfirmationPage } from '@/pages/OrderConfirmationPage';
import { ProductDetailPage } from '@/pages/ProductDetailPage';
import { WishlistPage } from '@/pages/WishlistPage';
import { SavedItemsPage } from '@/pages/SavedItemsPage';

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
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/saved" element={<SavedItemsPage />} />
            {/* Placeholder routes for future pages */}
            <Route path="/science" element={<PlaceholderPage title="Science" />} />
            <Route path="/dupes" element={<PlaceholderPage title="Dupes" />} />
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

      {/* Toast Notifications */}
      <ToastContainer />
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
    <ToastProvider>
      <CartProvider>
        <ComparisonProvider>
          <AppContent />
        </ComparisonProvider>
      </CartProvider>
    </ToastProvider>
  );
};

export default App;
