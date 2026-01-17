'use client';

import { Plus, X, ArrowRightLeft, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useComparisonStore } from '@/stores/comparison-store';
import type { Product } from '@/lib/types';

// ----- Subcomponent: ProductSlot -----

interface ProductSlotProps {
  product: Product | null;
  onRemove: () => void;
  onEmptyClick: () => void;
  isLoading?: boolean;
  showPulse?: boolean;
}

function ProductSlot({
  product,
  onRemove,
  onEmptyClick,
  isLoading = false,
  showPulse = false
}: ProductSlotProps) {
  if (product) {
    // Filled Slot
    return (
      <div className="relative group">
        <div
          className={`
            w-16 h-16 rounded-full overflow-hidden
            border-2 border-[#A67C7C]
            shadow-lg shadow-[#A67C7C]/10
            transition-all duration-300
            group-hover:ring-4 group-hover:ring-[#A67C7C]/20 group-hover:ring-offset-2
            ${isLoading ? 'grayscale-[30%] opacity-70' : ''}
          `}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Remove Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          disabled={isLoading}
          className={`
            absolute -top-1 -right-1
            w-5 h-5 rounded-full
            bg-white border border-[#E8E2D9]
            flex items-center justify-center
            text-slate-400 hover:text-[#A67C7C] hover:border-[#A67C7C]
            transition-all duration-200
            opacity-0 group-hover:opacity-100
            shadow-sm
            disabled:opacity-0
          `}
        >
          <X size={10} strokeWidth={2.5} />
        </button>
      </div>
    );
  }

  // Empty Slot
  return (
    <button
      onClick={onEmptyClick}
      className={`
        w-16 h-16 rounded-full
        border-2 border-dashed border-[#E8E2D9]
        flex items-center justify-center
        transition-all duration-300
        hover:border-[#A67C7C] hover:bg-[#FDF2F2]
        group
        ${showPulse ? 'animate-gentle-pulse' : ''}
      `}
    >
      <Plus
        size={20}
        className={`
          text-[#A67C7C] opacity-40
          transition-all duration-300
          group-hover:opacity-100 group-hover:scale-110
        `}
      />
    </button>
  );
}

// ----- Main Component: ComparisonWidget -----

export function ComparisonWidget() {
  const {
    comparisonList,
    isLoading,
    removeFromComparison,
    runComparison
  } = useComparisonStore();

  const router = useRouter();

  const product1 = comparisonList[0] || null;
  const product2 = comparisonList[1] || null;
  const hasProducts = comparisonList.length > 0;
  const canCompare = comparisonList.length === 2;

  // Scroll to product grid when empty slot is clicked
  const handleEmptySlotClick = () => {
    const productGrid = document.querySelector('[data-product-grid]');
    if (productGrid) {
      productGrid.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Handle compare button click
  const handleCompare = async () => {
    if (canCompare && !isLoading) {
      try {
        await runComparison(comparisonList[0], comparisonList[1]);
        router.push('/compare');
      } catch (error) {
        console.error('Comparison failed:', error);
      }
    }
  };

  // Don't render if no products selected
  if (!hasProducts) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[80]">
      {/* Floating Card Container */}
      <div
        className={`
          bg-[#FAF7F2]/95 backdrop-blur-xl
          border border-[#E8E2D9]
          rounded-[2rem] p-5
          shadow-2xl shadow-[#A67C7C]/5
          transition-all duration-500
          ${isLoading ? 'animate-pulse' : ''}
        `}
      >
        {/* Header Label */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <span className="w-4 h-[1px] bg-[#E8E2D9]"></span>
          <span className="text-[8px] font-bold uppercase tracking-[0.3em] text-[#A67C7C]">
            Compare
          </span>
          <span className="w-4 h-[1px] bg-[#E8E2D9]"></span>
        </div>

        {/* Slots Container */}
        <div className="flex items-center justify-center gap-3">
          {/* Slot 1 */}
          <ProductSlot
            product={product1}
            onRemove={() => product1 && removeFromComparison(product1.id)}
            onEmptyClick={handleEmptySlotClick}
            isLoading={isLoading}
          />

          {/* Connector */}
          <div className="flex flex-col items-center gap-1">
            <div className="w-[2px] h-3 bg-[#E8E2D9] rounded-full"></div>
            <div className="w-[2px] h-3 bg-[#E8E2D9] rounded-full"></div>
          </div>

          {/* Slot 2 */}
          <ProductSlot
            product={product2}
            onRemove={() => product2 && removeFromComparison(product2.id)}
            onEmptyClick={handleEmptySlotClick}
            isLoading={isLoading}
            showPulse={!product2 && !!product1}
          />
        </div>

        {/* Compare Button */}
        <div
          className={`
            overflow-hidden transition-all duration-500 ease-out
            ${canCompare ? 'max-h-20 opacity-100 mt-4' : 'max-h-0 opacity-0 mt-0'}
          `}
        >
          <button
            onClick={handleCompare}
            disabled={isLoading || !canCompare}
            className={`
              w-full flex items-center justify-center gap-2
              py-3 px-6 rounded-full
              bg-[#A67C7C] text-white
              text-[10px] font-bold uppercase tracking-[0.2em]
              shadow-lg shadow-[#A67C7C]/20
              transition-all duration-300
              hover:brightness-110 hover:scale-[1.02]
              disabled:opacity-50 disabled:cursor-not-allowed
              disabled:hover:scale-100 disabled:hover:brightness-100
            `}
          >
            {isLoading ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Analyzing...</span>
              </>
            ) : (
              <>
                <ArrowRightLeft size={14} />
                <span>Compare Now</span>
              </>
            )}
          </button>
        </div>

        {/* Hint Text */}
        {!canCompare && (
          <p className="text-center text-[9px] text-slate-400 mt-3 font-medium tracking-wide">
            Add one more product
          </p>
        )}
      </div>
    </div>
  );
}

export default ComparisonWidget;
