import React, { useState } from 'react';
import { Facebook, Twitter, Youtube, Instagram, ShieldCheck } from 'lucide-react';
import { ContactFormSubmission } from '../types';

interface FooterContactProps {
  onAdminClick?: () => void;
  showContactForm?: boolean;
}

const FooterContact: React.FC<FooterContactProps> = ({ onAdminClick, showContactForm = true }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      return;
    }

    try {
      const newSubmission: ContactFormSubmission = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        message: formData.message,
        date: new Date().toISOString()
      };

      const existingData = JSON.parse(localStorage.getItem('nactax_inquiries') || '[]');
      localStorage.setItem('nactax_inquiries', JSON.stringify([...existingData, newSubmission]));
      
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('idle'), 3000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <footer id="contact" className="bg-gray-100 border-t border-gray-200">
      
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        
        {showContactForm && (
          <>
            {/* Top Header Section */}
            <div className="mb-12">
                <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed font-bold mb-2">
                    Full Service
                </h2>
                <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed font-bold mb-2">
                    Accounting &
                </h2>
                 <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed font-bold">
                    Tax Firm
                </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-12">
                
                {/* Left Text Column */}
                <div className="lg:w-1/2 text-gray-600 text-sm md:text-base text-justify leading-relaxed font-sans space-y-4">
                     <p>
                        NACTAX is a full-service U.S. Accounting and Tax firm providing comprehensive bookkeeping, accounting, and financial reporting services for individuals and businesses. We handle year-end accounting and prepare unaudited financial statements in accordance with U.S. GAAP, helping our clients stay compliant and financially organized.
                    </p>
                    <p>
                        We prepare a wide range of U.S. tax returns, including federal and state filings for individuals, corporations, partnerships, non-profits, and trusts. Our services also include sales tax filings, W-2 and 1099 preparation, and year-end tax reporting. We support small and mid-sized businesses with strategic tax planning to minimize liabilities and ensure long-term financial health.
                    </p>
                </div>

                {/* Right Form Column */}
                <div className="lg:w-1/2 bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <div className="mb-6 flex justify-center">
                         <div className="flex flex-col leading-none">
                            <h1 className="text-4xl font-extrabold tracking-tighter text-nactax-red border-b-4 border-nactax-red inline-block">
                            NACTAX
                            </h1>
                            <span className="text-[0.6rem] font-bold text-gray-600 tracking-wider uppercase text-center">
                            Tax, Accounting & Business Support Services
                            </span>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-xs font-bold text-gray-500 uppercase mb-1">Name</label>
                            <input 
                              type="text" 
                              id="name" 
                              value={formData.name}
                              onChange={handleInputChange}
                              placeholder="Name" 
                              className="w-full border border-gray-300 p-2 text-sm bg-white" 
                              required
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-xs font-bold text-gray-500 uppercase mb-1">Email</label>
                            <input 
                              type="email" 
                              id="email" 
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="Email" 
                              className="w-full border border-gray-300 p-2 text-sm bg-white" 
                              required
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-xs font-bold text-gray-500 uppercase mb-1">Message</label>
                            <textarea 
                              id="message" 
                              rows={4} 
                              value={formData.message}
                              onChange={handleInputChange}
                              placeholder="Message" 
                              className="w-full border border-gray-300 p-2 text-sm bg-white"
                              required
                            ></textarea>
                        </div>
                        <button type="submit" className="bg-[#2a7a8a] text-white px-6 py-2 text-sm font-bold uppercase hover:bg-[#226270] transition-colors w-full md:w-auto">
                            {status === 'success' ? 'Sent Successfully!' : 'Submit'}
                        </button>
                        {status === 'success' && <p className="text-green-600 text-xs mt-2">Thank you! We will get back to you shortly.</p>}
                        {status === 'error' && <p className="text-red-600 text-xs mt-2">An error occurred. Please try again.</p>}
                    </form>
                </div>
            </div>
          </>
        )}

        {/* Bottom Info Grid */}
        <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 ${showContactForm ? 'mt-16 pt-8 border-t border-gray-300' : ''}`}>
            
            {/* About Us */}
            <div>
                <h3 className="text-xl font-serif text-gray-500 mb-6">About us</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                    NACTAX is centrally located in the heart of Fort Lauderdale, Florida, serving individuals and businesses throughout Broward County and the surrounding areas. We provide reliable, timely, and precise tax, accounting, financial, and business support services at competitive rates. Our team is fully equipped to handle all of your tax, accounting, and business needs with professionalism and accuracy.
                </p>
                
                <div className="flex gap-4 mt-4">
                    <a href="#" className="bg-blue-800 p-2 rounded-full text-white hover:opacity-80"><Facebook size={16} /></a>
                    <a href="#" className="bg-sky-400 p-2 rounded-full text-white hover:opacity-80"><Twitter size={16} /></a>
                    <a href="#" className="bg-red-600 p-2 rounded-full text-white hover:opacity-80"><Youtube size={16} /></a>
                    <a href="#" className="bg-pink-600 p-2 rounded-full text-white hover:opacity-80"><Instagram size={16} /></a>
                </div>
            </div>

            {/* Our Mission */}
            <div>
                <h3 className="text-xl font-serif text-gray-500 mb-6">Our Mission</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                    We are committed to provide the highest level of quality services of Accounting, Tax, Business support and Legal services to the entire satisfaction of our valued clients. We listen to your concerns, ask the right questions and take the time to understand your requirements in order to give you the most legitimate solutions.
                </p>
            </div>

            {/* Contact Us */}
            <div>
                <h3 className="text-xl font-serif text-gray-500 mb-6">Contact Us</h3>
                <div className="text-sm text-gray-600 leading-relaxed space-y-4">
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">Email:</span>
                        <a href="mailto:info@nactax.net" className="hover:text-nactax-red transition-colors">info@nactax.net</a>
                    </div>
                    <div className="flex flex-col">
                        <span className="font-bold text-gray-900">Tel:</span>
                        <a href="tel:614-699-0603" className="hover:text-nactax-red transition-colors">614-699-0603</a>
                    </div>
                    <div>
                        <p className="font-bold text-gray-900 mb-1">Please visit us at our location:</p>
                        <p>5081 island club drive</p>
                        <p>Fort Lauderdale</p>
                        <p>33319 USA</p>
                    </div>
                </div>
            </div>

        </div>
        
        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-center text-white bg-[#1a3c5e] py-4 -mx-4 -mb-16 flex flex-col items-center">
            <p className="text-xs md:text-sm">© 2025 Nactax LLC. All Rights Reserved.</p>
            {onAdminClick && (
              <button 
                onClick={onAdminClick} 
                className="mt-2 text-[10px] text-blue-200 hover:text-white flex items-center gap-1 opacity-50 hover:opacity-100 transition-opacity"
              >
                <ShieldCheck size={10} /> Admin Login
              </button>
            )}
        </div>
      </div>
    </footer>
  );
};

export default FooterContact;