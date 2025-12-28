import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, ShoppingBag, User, Menu, X, Heart, Bookmark } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { to: '/', label: 'Marketplace' },
    { to: '/wishlist', label: 'Wishlist' },
    { to: '/saved', label: 'Saved' },
  ];

  return (
    <>
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
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`text-[13px] font-medium tracking-widest uppercase transition-colors ${
                      isActive(link.to)
                        ? 'text-slate-900'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4 sm:space-x-6">
              <button className="p-2 text-slate-400 hover:text-slate-900 transition">
                <Search size={18} />
              </button>

              {/* Wishlist Icon - Hidden on mobile, visible on tablet+ */}
              <Link
                to="/wishlist"
                className="hidden sm:block p-2 text-slate-400 hover:text-[#A67C7C] transition"
              >
                <Heart size={18} />
              </Link>

              {/* Cart Icon */}
              <Link to="/cart" className="relative p-2 text-slate-400 hover:text-slate-900 transition group">
                <ShoppingBag size={18} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex items-center justify-center min-w-[18px] h-[18px] px-1 bg-[#A67C7C] text-white text-[9px] font-bold rounded-full border-2 border-[#FAF7F2] animate-in zoom-in duration-300">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="h-6 w-[1px] bg-slate-200 mx-2 hidden md:block"></div>

              <button className="hidden md:flex items-center gap-2 text-[13px] font-bold tracking-widest uppercase text-slate-900 hover:text-[#A67C7C] transition">
                <User size={16} />
                <span>Login</span>
              </button>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden p-2 text-slate-600"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/20 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Menu Panel */}
          <div className="absolute top-20 left-0 right-0 bg-[#FAF7F2] border-b border-[#E8E2D9] shadow-xl animate-in slide-in-from-top duration-300">
            <div className="max-w-7xl mx-auto px-6 py-8">
              <div className="flex flex-col space-y-6">
                {navLinks.map(link => (
                  <Link
                    key={link.to}
                    to={link.to}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`text-xl font-serif transition-colors ${
                      isActive(link.to)
                        ? 'text-[#A67C7C] italic'
                        : 'text-slate-900 hover:text-[#A67C7C]'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}

                <div className="border-t border-[#E8E2D9] pt-6 space-y-4">
                  <Link
                    to="/cart"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg text-slate-900 hover:text-[#A67C7C]"
                  >
                    <ShoppingBag size={20} />
                    <span>Cart</span>
                    {cartCount > 0 && (
                      <span className="px-2 py-0.5 bg-[#A67C7C] text-white text-xs font-bold rounded-full">
                        {cartCount}
                      </span>
                    )}
                  </Link>

                  <Link
                    to="/wishlist"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg text-slate-900 hover:text-[#A67C7C]"
                  >
                    <Heart size={20} />
                    <span>Wishlist</span>
                  </Link>

                  <Link
                    to="/saved"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-3 text-lg text-slate-900 hover:text-[#A67C7C]"
                  >
                    <Bookmark size={20} />
                    <span>Saved Items</span>
                  </Link>
                </div>

                <div className="border-t border-[#E8E2D9] pt-6">
                  <button className="flex items-center gap-3 text-lg font-medium text-slate-900 hover:text-[#A67C7C]">
                    <User size={20} />
                    <span>Login / Sign Up</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
