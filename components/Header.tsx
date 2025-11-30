import React, { useState } from 'react';
import { Phone, Mail, Menu, X, ChevronRight, ChevronDown } from 'lucide-react';

interface HeaderProps {
  onNavigate: (page: string, data?: any) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMobileSubmenu, setActiveMobileSubmenu] = useState<string | null>(null);

  // Navigation Data Structure
  const serviceMenu = [
    {
      label: 'Business',
      items: [
        'Business Accounting and Payroll',
        'Business Consulting',
        'Business Start up and Incorporation',
        'Buying and Selling a Business',
        'Preparation and Analysis of Financial Statements'
      ]
    },
    {
      label: 'Personal Finance',
      items: [
        'Financial & Tax Planning and Net worth tracking',
        'Local/Federal Return Preparation and Filing',
        'Max. Tax Refunds & Saving',
        'IRS Issues and Audit Assistance',
        'Will, POA, Contract Drafting and Other Legal Services'
      ]
    },
    {
      label: 'Other Services',
      items: [
        'Personal and Business Tax Return',
        'Download', // Special case for products page
        'Certified E-Filer'
      ]
    }
  ];

  const handleServiceClick = (item: string) => {
    setIsMenuOpen(false);
    if (item === 'Download') {
      onNavigate('products');
    } else {
      onNavigate('service-detail', item);
    }
  };

  return (
    <header className="w-full fixed top-0 z-[60]">
      {/* Top Bar */}
      <div className="bg-[#222] text-white py-2 px-4 text-xs md:text-sm font-sans">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-2">
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <a href="tel:614-699-0603" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <Phone size={14} />
              <span>614-699-0603</span>
            </a>
            <a href="mailto:info@nactax.net" className="flex items-center gap-2 hover:text-gray-300 transition-colors">
              <Mail size={14} />
              <span>info@nactax.net</span>
            </a>
          </div>
          <div className="hidden md:block">
            Contact Us For More Information
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Logo */}
          <div 
            className="flex flex-col leading-none cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <h1 className="text-3xl font-extrabold tracking-tighter text-nactax-red border-b-2 border-nactax-red inline-block">
              NACTAX
            </h1>
            <span className="text-[0.5rem] font-bold text-gray-600 tracking-wider uppercase">
              Tax, Accounting & Business Support Services
            </span>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex gap-6 font-semibold text-gray-700 text-sm uppercase items-center">
            <button onClick={() => onNavigate('home')} className="hover:text-nactax-red transition-colors">Home</button>
            <a href="#about" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('about')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-nactax-red transition-colors">About</a>
            
            {/* Services Dropdown */}
            <div className="relative group h-full flex items-center">
              <button className="hover:text-nactax-red flex items-center gap-1 py-4 group-hover:text-nactax-red transition-colors">
                Services <ChevronDown size={14} />
              </button>
              
              {/* Level 1 Dropdown */}
              <div className="absolute top-full left-0 hidden group-hover:block w-56 bg-white shadow-xl border-t-2 border-nactax-red animate-fade-in-up">
                {serviceMenu.map((category, idx) => (
                  <div key={idx} className="relative group/sub border-b border-gray-100 last:border-0">
                    <button className="w-full text-left px-4 py-3 hover:bg-gray-50 flex justify-between items-center text-xs font-bold text-gray-800 hover:text-nactax-red">
                      {category.label}
                      <ChevronRight size={14} />
                    </button>
                    
                    {/* Level 2 Dropdown (Side) */}
                    <div className="absolute left-full top-0 hidden group-hover/sub:block w-72 bg-white shadow-xl border-l border-gray-100 animate-fade-in-left -ml-1 mt-0">
                      {category.items.map((item, i) => (
                        <button 
                          key={i}
                          onClick={() => handleServiceClick(item)}
                          className="w-full text-left px-4 py-3 hover:bg-gray-50 border-b border-gray-100 last:border-0 text-xs text-gray-600 hover:text-nactax-red transition-colors block"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <a href="#profile" onClick={(e) => { e.preventDefault(); onNavigate('home'); setTimeout(() => document.getElementById('profile')?.scrollIntoView({behavior: 'smooth'}), 100); }} className="hover:text-nactax-red transition-colors">Profile</a>
            <button onClick={() => onNavigate('payment')} className="hover:text-nactax-red transition-colors">Make A Payment</button>
            <a href="#contact" className="hover:text-nactax-red transition-colors">Contact Us</a>
          </nav>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isMenuOpen && (
        <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsMenuOpen(false)}>
          <div 
            className="bg-white w-[85%] max-w-[320px] h-full shadow-xl flex flex-col text-sm font-medium text-gray-700 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
               <h1 className="text-xl font-extrabold text-nactax-red">NACTAX</h1>
               <button onClick={() => setIsMenuOpen(false)}><X size={24} /></button>
            </div>
            
            <div className="flex flex-col">
              <button className="px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50" onClick={() => { onNavigate('home'); setIsMenuOpen(false); }}>Home</button>
              <button className="px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50" onClick={() => { onNavigate('home'); setIsMenuOpen(false); setTimeout(() => document.getElementById('about')?.scrollIntoView(), 100); }}>About</button>
              
              {/* Mobile Services */}
              <div className="border-b border-gray-100 bg-gray-50/50">
                <div className="px-6 py-4 font-bold text-nactax-red">Services</div>
                {serviceMenu.map((category, idx) => (
                  <div key={idx}>
                    <button 
                      className="w-full flex justify-between items-center px-8 py-3 text-xs font-bold uppercase text-gray-800 border-t border-gray-100 hover:bg-gray-100"
                      onClick={() => setActiveMobileSubmenu(activeMobileSubmenu === category.label ? null : category.label)}
                    >
                      {category.label}
                      <ChevronDown size={14} className={`transform transition-transform ${activeMobileSubmenu === category.label ? 'rotate-180' : ''}`} />
                    </button>
                    
                    {activeMobileSubmenu === category.label && (
                      <div className="bg-gray-100">
                        {category.items.map((item, i) => (
                          <button
                            key={i}
                            onClick={() => handleServiceClick(item)}
                            className="w-full text-left px-10 py-3 text-xs text-gray-600 border-b border-gray-200 last:border-0 hover:text-nactax-red"
                          >
                            {item}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button className="px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50" onClick={() => { onNavigate('home'); setIsMenuOpen(false); setTimeout(() => document.getElementById('profile')?.scrollIntoView(), 100); }}>Profile</button>
              <button className="px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50" onClick={() => { onNavigate('payment'); setIsMenuOpen(false); }}>Make A Payment</button>
              <button className="px-6 py-4 border-b border-gray-100 text-left hover:bg-gray-50" onClick={() => { setIsMenuOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView(), 100); }}>Contact Us</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
