import React from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onMenuClick?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onMenuClick }) => {
  return (
    <nav className="sticky top-0 z-50 bg-[#FAF7F2]/80 backdrop-blur-xl border-b border-[#E8E2D9]">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-serif tracking-tight text-slate-900 font-semibold italic">
                DermaLogic<span className="text-[#A67C7C] font-normal not-italic">.</span>
              </span>
            </Link>

            <div className="hidden lg:flex items-center space-x-8">
              <Link
                to="/"
                className="text-[13px] font-medium tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors"
              >
                Marketplace
              </Link>
              <Link
                to="/science"
                className="text-[13px] font-medium tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors"
              >
                Science
              </Link>
              <Link
                to="/dupes"
                className="text-[13px] font-medium tracking-widest uppercase text-slate-500 hover:text-slate-900 transition-colors"
              >
                Dupes
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button className="p-2 text-slate-400 hover:text-slate-900 transition">
              <Search size={18} />
            </button>
            <button className="relative p-2 text-slate-400 hover:text-slate-900 transition group">
              <ShoppingBag size={18} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#A67C7C] text-white text-[9px] font-bold rounded-full border-2 border-[#FAF7F2] animate-in zoom-in duration-300">
                  {cartCount}
                </span>
              )}
            </button>
            <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>
            <button className="hidden md:flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-slate-900 hover:text-[#A67C7C] transition">
              <User size={16} />
              <span>Login</span>
            </button>
            <button
              className="lg:hidden p-2"
              onClick={onMenuClick}
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
