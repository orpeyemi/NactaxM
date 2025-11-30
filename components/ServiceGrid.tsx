import React from 'react';
import { GridServiceItem } from '../types';

interface ServiceGridProps {
  onNavigate?: (page: string, data?: any) => void;
}

const services: GridServiceItem[] = [
  { title: "PERSONAL AND BUSINESS TAX RETURN", imageUrl: "https://picsum.photos/id/20/400/300", colorClass: "bg-gray-800" },
  { title: "CERTIFIED E-FILER", imageUrl: "https://picsum.photos/id/119/400/300", colorClass: "bg-nactax-green" },
  { title: "LOCAL/FEDERAL RETURN PREPARATION AND FILING", imageUrl: "https://picsum.photos/id/180/400/300", colorClass: "bg-yellow-500" },
  { title: "MAX. TAX REFUNDS & SAVING", imageUrl: "https://picsum.photos/id/24/400/300", colorClass: "bg-nactax-red" },
  { title: "BUSINESS START UP AND INCORPORATION", imageUrl: "https://picsum.photos/id/3/400/300", colorClass: "bg-orange-600" },
  { title: "PREPARATION AND ANALYSIS OF FINANCIAL STATEMENTS", imageUrl: "https://picsum.photos/id/48/400/300", colorClass: "bg-nactax-teal" },
  { title: "FINANCIAL & TAX PLANNING AND NET WORTH TRACKING", imageUrl: "https://picsum.photos/id/60/400/300", colorClass: "bg-nactax-purple" },
  { title: "IRS ISSUES AND AUDIT ASSISTANCE", imageUrl: "https://picsum.photos/id/160/400/300", colorClass: "bg-gray-400" },
  { title: "BUSINESS ACCOUNTING AND PAYROLL", imageUrl: "https://picsum.photos/id/119/400/300", colorClass: "bg-amber-700" },
  { title: "BUSINESS CONSULTING", imageUrl: "https://picsum.photos/id/107/400/300", colorClass: "bg-indigo-800" },
  { title: "BUYING AND SELLING A BUSINESS", imageUrl: "https://picsum.photos/id/201/400/300", colorClass: "bg-teal-700" },
  { title: "WILL, POA, CONTRACT DRAFTING AND OTHER LEGAL SERVICES", imageUrl: "https://picsum.photos/id/445/400/300", colorClass: "bg-sky-600" },
];

const ServiceGrid: React.FC<ServiceGridProps> = ({ onNavigate }) => {
  return (
    <section className="bg-gray-50 pb-20">
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-4xl font-serif text-nactax-darkRed font-bold mb-12">Our Services</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {services.map((service, index) => (
            <div 
              key={index} 
              onClick={() => onNavigate && onNavigate('service-detail', service.title)}
              className="flex flex-col h-full bg-white shadow-lg group hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden rounded-sm"
            >
              {/* Image Area */}
              <div className="h-24 md:h-40 overflow-hidden relative">
                <img 
                  src={service.imageUrl} 
                  alt={service.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              
              {/* Text Area */}
              <div className={`${service.colorClass} flex-grow flex items-center justify-center p-4 relative overflow-hidden`}>
                {/* Subtle sheen effect on hover */}
                <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                
                <h4 className="text-white font-bold text-xs md:text-sm uppercase leading-tight tracking-wide relative z-10">
                  {service.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceGrid;
