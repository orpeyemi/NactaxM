import React from 'react';
import { FileText, Calculator, Gavel } from 'lucide-react';
import { ServiceHighlight } from '../types';

const highlights: ServiceHighlight[] = [
  {
    title: "PERSONAL & BUSINESS TAX RETURNS",
    description: "Our core specialty is the preparation of tax returns for individuals as well as business and corporate taxpayers, with due care and taking our client's maximum benefits into account.",
    icon: 'file',
    colorClass: "bg-nactax-green"
  },
  {
    title: "BUSINESS ACCOUNTING AND PAYROLL SERVICES",
    description: "Financial Statement preparation for small business clients is a long-standing service of this firm. Depending on the client's needs, monthly, quarterly and year-end balance reporting.",
    icon: 'calculator',
    colorClass: "bg-nactax-purple"
  },
  {
    title: "BUSINESS STARTUP, IRS ISSUES & OTHER LEGAL SERVICES",
    description: "Apart from our core Tax and Business Accounting services, we also assist our valued clients with IRS matters and inquiries, business formation and incorporation, sales tax registration and filing, and ongoing compliance support.",
    icon: 'legal',
    colorClass: "bg-nactax-teal"
  }
];

const ServiceHighlights: React.FC = () => {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 w-full text-white">
      {highlights.map((item, index) => (
        <div key={index} className={`${item.colorClass} p-8 md:p-12 flex flex-col items-center text-center`}>
          <div className="mb-6 border-2 border-white/30 p-3 rounded-lg">
            {item.icon === 'file' && <FileText size={32} />}
            {item.icon === 'calculator' && <Calculator size={32} />}
            {item.icon === 'legal' && <Gavel size={32} />}
          </div>
          
          <h3 className="text-xl md:text-2xl font-bold uppercase mb-4 leading-tight font-serif tracking-wide">
            {item.title}
          </h3>
          
          <p className="text-sm md:text-base opacity-90 mb-8 leading-relaxed flex-grow">
            {item.description}
          </p>
          
          <button className="bg-white text-gray-800 px-6 py-2 text-xs font-bold uppercase hover:bg-gray-100 transition-colors">
            Read More
          </button>
        </div>
      ))}
    </section>
  );
};

export default ServiceHighlights;