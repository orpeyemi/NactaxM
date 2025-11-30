import React from 'react';
import { Play } from 'lucide-react';

const WelcomeSection: React.FC = () => {
  return (
    <section id="about" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          
          {/* Text Content */}
          <div className="lg:w-1/2">
            <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed mb-2 font-bold">Welcome to</h2>
            <h2 className="text-4xl md:text-5xl font-serif text-nactax-darkRed mb-8 font-bold">Nactax</h2>
            
            <div className="space-y-6 text-gray-600 text-sm md:text-base leading-relaxed text-justify font-sans">
              <p>
                Located in the heart of Fort Lauderdale, Florida, NACTAX proudly serves clients across Broward County and surrounding areas. We offer reliable, timely, and precise tax, accounting, financial, and business support services at affordable rates. From individuals to small and mid-sized businesses, we are equipped to handle all your tax and accounting needs with expert care and attention.
              </p>
              <p>
                We are highly accomplished senior finance professionals with extensive expertise and a proven track record in the finance and accounting industry. Our team is skilled in handling all individual and corporate tax needs, including support for small and mid-sized businesses, cost control, and financial management. We specialize in financial planning, reporting, budgeting, forecasting, treasury, and cash flow management, and have comprehensive experience managing the full accounting cycle.
              </p>
              <p>
                We are proficient in internal and external audit support and work confidently with a wide range of accounting and ERP systems. Our firm is well-versed in U.S. federal and state personal and business tax compliance, ensuring accuracy, efficiency, and full regulatory compliance for every client.
              </p>
              <p>
                At NACTAX, we take pride in offering a wide range of services to our clients, including self-employed professionals, small businesses, non-profit organizations, and individuals. Depending on each client's needs, we provide everything from bookkeeping to full-cycle accounting and complete payroll services. For some clients, our role is to review work they have already completed and prepare accurate financial statements along with required federal and state tax filings. For others, we handle only personal and business tax preparation and ongoing compliance.
              </p>
              <p>
                We also support clients with business formation and incorporation, EIN and state tax registration, sales tax setup and filing, and financial planning services. Our team offers expert guidance to help clients select the best options and make informed decisions for long-term success.
              </p>
              <p>
                  If you have any questions or would like to learn more about how we can help, please contact us by phone, email, or by visiting one of our listed locations.
              </p>
            </div>
          </div>

          {/* Image Content */}
          <div className="lg:w-1/2 relative mt-8 lg:mt-24">
             <div className="relative rounded-lg overflow-hidden shadow-xl">
                 <img 
                    src="https://picsum.photos/id/60/800/600" 
                    alt="Business meeting" 
                    className="w-full h-auto object-cover"
                 />
                 <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex flex-col justify-end p-6">
                    <div className="flex items-center gap-4">
                        <div className="bg-red-600 p-3 rounded-full text-white cursor-pointer hover:bg-red-700 transition">
                            <Play fill="white" size={24} />
                        </div>
                        <span className="text-white font-bold text-lg drop-shadow-md">
                            Business Startup <br/>and Incorporate
                        </span>
                    </div>
                 </div>
                 {/* Logo Overlay */}
                 <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded shadow">
                    <span className="text-nactax-red font-bold text-xs">NACTAX</span>
                 </div>
             </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WelcomeSection;