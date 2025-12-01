import React from 'react';
import { CheckCircle, Download } from 'lucide-react';

const ProductsSection: React.FC = () => {
  return (
    <section id="products" className="bg-white min-h-screen pt-16 md:pt-20">
      {/* Banner */}
      <div className="relative w-full h-[300px] md:h-[400px] flex items-center justify-center bg-gray-900 overflow-hidden">
        <img 
          src="https://drive.google.com/file/d/1-4YYWwStTjcVs9kTYJ0ZjEZ06BT68wRF/view?usp=sharing" 
          alt="Calculator and Accounting" 
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-nactax-darkRed mb-2 drop-shadow-md">
            OUR RECOMMENDED
          </h2>
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-nactax-darkRed drop-shadow-md">
            ACCOUNTING TOOL
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-16 md:py-24 max-w-4xl animate-fade-in">
        
        {/* Intro */}
        <div className="mb-12 text-center md:text-left">
          <p className="text-lg md:text-xl font-serif text-gray-700 leading-relaxed mb-8">
            At NACTAX, we understand that keeping your finances organized is the first step toward stress-free tax filing, accurate accounting, and efficient payroll management. That’s why we recommend <span className="font-bold text-gray-900">Wave Accounting</span> — a free, user-friendly accounting platform designed for small businesses, freelancers, and non-profits.
          </p>
          
          <div className="flex justify-center my-10">
            <a 
              href="https://www.waveapps.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="bg-nactax-red hover:bg-nactax-darkRed text-white text-base md:text-lg font-bold py-4 px-8 rounded shadow-lg transform hover:scale-105 transition-all flex items-center gap-3"
            >
              <Download size={24} />
              [Download Wave Accounting for Free]
            </a>
          </div>
        </div>

        {/* Why Use Wave */}
        <div className="mb-16">
          <h3 className="text-2xl md:text-3xl font-serif text-gray-800 font-bold mb-6 border-b-2 border-gray-100 pb-2">
            Why Use Wave Accounting?
          </h3>
          <ul className="space-y-4 text-gray-600 leading-relaxed">
            <li className="flex gap-3 items-start">
              <CheckCircle className="text-nactax-green shrink-0 mt-1" size={20} />
              <span><strong className="text-gray-900">Track Income & Expenses:</strong> See where your money is going with real-time insights.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle className="text-nactax-green shrink-0 mt-1" size={20} />
              <span><strong className="text-gray-900">Simplify Payroll & Taxes:</strong> Generate payroll reports and keep tax compliance simple.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle className="text-nactax-green shrink-0 mt-1" size={20} />
              <span><strong className="text-gray-900">Create Professional Invoices:</strong> Send polished invoices to clients and track payments.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle className="text-nactax-green shrink-0 mt-1" size={20} />
              <span><strong className="text-gray-900">Easy Integration:</strong> Wave works seamlessly with your bank and credit card accounts.</span>
            </li>
            <li className="flex gap-3 items-start">
              <CheckCircle className="text-nactax-green shrink-0 mt-1" size={20} />
              <span><strong className="text-gray-900">Completely Free:</strong> Access essential accounting features without monthly fees.</span>
            </li>
          </ul>
        </div>

        {/* How NACTAX Helps */}
        <div className="bg-gray-50 p-8 rounded-xl border border-gray-100">
          <h3 className="text-2xl md:text-3xl font-serif text-center text-gray-800 font-bold mb-8">
            How NACTAX Helps You Get the Most Out of Wave
          </h3>
          <p className="text-gray-600 leading-relaxed text-center">
            By using Wave in conjunction with our services, you can: Keep your bookkeeping organized throughout the year. Provide NACTAX with accurate data for tax preparation and financial statement preparation. Receive strategic financial advice based on real-time numbers. Simplify payroll and other compliance requirements for your business.
          </p>
          <div className="mt-8 text-center">
             <p className="text-sm font-bold text-nactax-red uppercase tracking-wide">Get Started Today</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default ProductsSection;
