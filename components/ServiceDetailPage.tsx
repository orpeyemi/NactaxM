import React from 'react';
import { ChevronLeft, CheckCircle } from 'lucide-react';

interface ServiceDetailPageProps {
  title: string;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({ title, onBack, onNavigate }) => {
  // Generate a deterministic image based on title length (simple pseudo-random)
  const imageId = (title.length * 7) % 50 + 10;
  
  return (
    <div className="bg-gray-50 min-h-screen pb-20 pt-24 md:pt-32 animate-fade-in">
      {/* Banner */}
      <div className="bg-gray-900 text-white py-12 md:py-20 px-4 relative overflow-hidden">
        <img 
          src={`https://picsum.photos/id/${imageId}/1920/600`} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-20"
        />
        <div className="container mx-auto relative z-10">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-gray-300 hover:text-white mb-6 transition-colors text-sm uppercase tracking-wider font-bold"
          >
            <ChevronLeft size={16} /> Back to Home
          </button>
          <h1 className="text-3xl md:text-5xl font-serif font-bold text-white max-w-4xl leading-tight">
            {title}
          </h1>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Main Content */}
          <div className="lg:w-2/3">
            <div className="bg-white p-8 md:p-12 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif font-bold text-nactax-darkRed mb-6">Service Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                At NACTAX, we specialize in <strong>{title}</strong> with a focus on accuracy, compliance, and strategic planning. Our team of experienced professionals works diligently to ensure that your specific needs are met with the highest standards of service.
              </p>
              <p className="text-gray-600 leading-relaxed mb-6">
                Whether you are an individual looking for assistance or a business seeking to optimize your financial operations, our comprehensive approach to {title.toLowerCase()} is designed to provide you with peace of mind and tangible results.
              </p>
              
              <h3 className="text-xl font-bold text-gray-800 mb-4 mt-8">What We Offer</h3>
              <ul className="space-y-3 mb-8">
                {[
                  "Professional and accurate preparation",
                  "Timely filing and compliance checks",
                  "Strategic advice and consulting",
                  "Support for audits and inquiries",
                  "Customized solutions for your unique situation"
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start text-gray-700">
                    <CheckCircle className="text-nactax-green shrink-0 mt-1" size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 leading-relaxed">
                Contact us today to discuss how we can assist you with {title}. Our team is ready to provide the expertise and support you need.
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:w-1/3 space-y-8">
            <div className="bg-nactax-red text-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4 font-serif">Need Help?</h3>
              <p className="mb-6 text-white/90">
                Speak with one of our experts today to get started with your {title.toLowerCase()}.
              </p>
              <a href="tel:614-699-0603" className="block text-2xl font-bold mb-2 hover:underline">614-699-0603</a>
              <a href="mailto:info@nactax.net" className="block text-lg hover:underline mb-6">info@nactax.net</a>
              
              <button 
                onClick={() => onNavigate('contact')}
                className="w-full bg-white text-nactax-red py-3 rounded font-bold uppercase tracking-wide hover:bg-gray-100 transition-colors"
              >
                Contact Us
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h3 className="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Related Services</h3>
              <ul className="space-y-3">
                <li className="text-gray-600 hover:text-nactax-red cursor-pointer transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                   Business Consulting
                </li>
                <li className="text-gray-600 hover:text-nactax-red cursor-pointer transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                   Tax Planning
                </li>
                <li className="text-gray-600 hover:text-nactax-red cursor-pointer transition-colors" onClick={() => window.scrollTo({top:0, behavior:'smooth'})}>
                   Financial Analysis
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetailPage;
