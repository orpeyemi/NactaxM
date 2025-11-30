import React, { useState } from 'react';
import { CreditCard, Lock, ShieldCheck, DollarSign, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

const PaymentSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    invoice: '',
    amount: '',
    cardNum: '',
    expiry: '',
    cvc: '',
    zip: ''
  });
  
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  // Format helpers
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const parts = [];
    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substring(i, i + 4));
    }
    return parts.length > 1 ? parts.join(' ') : value;
  };

  const formatExpiry = (value: string) => {
    const v = value.replace(/\D/g, '');
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`;
    }
    return v;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    let formattedValue = value;
    if (name === 'cardNum') {
      formattedValue = formatCardNumber(value);
    } else if (name === 'expiry') {
      formattedValue = formatExpiry(value);
    }

    setFormData(prev => ({ ...prev, [name]: formattedValue }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setStatus('processing');

    // Basic Validation simulation
    if (formData.cardNum.replace(/\s/g, '').length < 15) {
      setErrorMsg('Invalid card number');
      setStatus('idle');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      // 90% chance of success for demo
      if (Math.random() > 0.1) {
        setStatus('success');
      } else {
        setStatus('error');
        setErrorMsg('Transaction declined. Please check your card details.');
      }
    }, 2000);
  };

  if (status === 'success') {
    return (
      <section id="payment" className="py-20 pt-32 bg-gray-50 flex justify-center items-center min-h-screen">
        <div className="bg-white p-12 rounded-2xl shadow-xl max-w-lg w-full text-center border-t-8 border-green-500 animate-fade-in">
          <div className="mx-auto bg-green-100 w-24 h-24 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="text-green-600" size={48} />
          </div>
          <h2 className="text-3xl font-serif font-bold text-gray-800 mb-4">Payment Successful</h2>
          <p className="text-gray-600 mb-8">
            Thank you, {formData.name}. Your payment of <span className="font-bold text-gray-900">${formData.amount}</span> has been processed securely.
          </p>
          <p className="text-sm text-gray-500 mb-8">Transaction ID: TXN-{Math.floor(Math.random() * 10000000)}</p>
          <button 
            onClick={() => {
              setFormData({ name: '', email: '', invoice: '', amount: '', cardNum: '', expiry: '', cvc: '', zip: '' });
              setStatus('idle');
            }}
            className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg"
          >
            Make Another Payment
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="payment" className="py-20 pt-32 bg-gradient-to-b from-gray-50 to-gray-200 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed font-bold mb-4">Make A Payment</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Securely pay your invoices online. We accept all major credit cards. 
              Your transaction is encrypted and secure.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row animate-fade-in">
            
            {/* Left Side - Info */}
            <div className="bg-nactax-darkRed text-white p-8 md:p-12 md:w-1/3 flex flex-col justify-between">
              <div>
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <ShieldCheck size={24} /> Secure Portal
                </h3>
                <p className="text-white/80 text-sm mb-8 leading-relaxed">
                  NACTAX uses bank-level encryption to ensure your data remains safe. We do not store your full credit card information on our servers.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
                      <Lock size={16} />
                    </div>
                    <span>256-bit SSL Encryption</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded bg-white/20 flex items-center justify-center">
                      <CheckCircle size={16} />
                    </div>
                    <span>Instant Confirmation</span>
                  </div>
                </div>
              </div>
              <div className="mt-12 text-xs text-white/60">
                Powered by SecurePay
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="p-8 md:p-12 md:w-2/3">
              <form onSubmit={handleSubmit}>
                
                {/* Error Message */}
                {status === 'error' && (
                  <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 text-red-700 flex items-center gap-3">
                    <AlertCircle size={20} />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <h4 className="text-gray-900 font-bold mb-6 uppercase text-sm tracking-wider border-b pb-2">Client Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Full Name</label>
                    <input 
                      type="text" 
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                      placeholder="Jane Doe"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Receipt To</label>
                    <input 
                      type="email" 
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                      placeholder="jane@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Invoice / Reference #</label>
                    <input 
                      type="text" 
                      name="invoice"
                      required
                      value={formData.invoice}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded p-3 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                      placeholder="INV-2025-001"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Payment Amount ($)</label>
                    <div className="relative">
                      <DollarSign size={16} className="absolute left-3 top-3.5 text-gray-400" />
                      <input 
                        type="number" 
                        name="amount"
                        required
                        min="1"
                        step="0.01"
                        value={formData.amount}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-3 pl-8 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                        placeholder="0.00"
                      />
                    </div>
                  </div>
                </div>

                <h4 className="text-gray-900 font-bold mb-6 uppercase text-sm tracking-wider border-b pb-2">Card Details</h4>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Card Number</label>
                    <div className="relative">
                      <CreditCard size={20} className="absolute left-3 top-3 text-gray-400" />
                      <input 
                        type="text" 
                        name="cardNum"
                        required
                        maxLength={19}
                        value={formData.cardNum}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition font-mono"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Expiry</label>
                      <div className="relative">
                        <Calendar size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input 
                          type="text" 
                          name="expiry"
                          required
                          maxLength={5}
                          value={formData.expiry}
                          onChange={handleChange}
                          className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                          placeholder="MM/YY"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVC</label>
                      <div className="relative">
                        <Lock size={18} className="absolute left-3 top-3 text-gray-400" />
                        <input 
                          type="text" 
                          name="cvc"
                          required
                          maxLength={4}
                          value={formData.cvc}
                          onChange={(e) => setFormData({...formData, cvc: e.target.value.replace(/\D/g, '')})}
                          className="w-full border border-gray-300 rounded p-3 pl-10 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                          placeholder="123"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Zip Code</label>
                      <input 
                        type="text" 
                        name="zip"
                        required
                        maxLength={10}
                        value={formData.zip}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded p-3 text-sm focus:border-nactax-red focus:ring-1 focus:ring-nactax-red outline-none transition"
                        placeholder="Zip"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <button 
                    type="submit" 
                    disabled={status === 'processing'}
                    className="w-full bg-nactax-red text-white py-4 rounded-lg font-bold text-lg uppercase tracking-wide hover:bg-nactax-darkRed transition-all shadow-md disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-3"
                  >
                    {status === 'processing' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock size={20} /> Pay Now
                      </>
                    )}
                  </button>
                  <div className="text-center mt-4 flex justify-center gap-4 text-gray-400">
                     {/* Simulated Card Logos */}
                     <span className="font-serif italic font-bold">Visa</span>
                     <span className="font-sans font-bold">Mastercard</span>
                     <span className="font-serif font-bold text-blue-800">Amex</span>
                     <span className="font-bold text-blue-500">Discover</span>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PaymentSection;
