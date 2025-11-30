import React from 'react';

interface HeroProps {
  onNavigate?: (page: string, data?: any) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="relative w-full h-[500px] md:h-[600px] flex items-center bg-gray-100 overflow-hidden mt-16 md:mt-20">
        {/* Background Image Layer */}
        <div className="absolute inset-0 z-0">
             <img 
                src="https://picsum.photos/id/4/1920/1080" 
                alt="Office work" 
                className="w-full h-full object-cover opacity-90"
             />
             <div className="absolute inset-0 bg-white/60 md:bg-transparent md:bg-gradient-to-r md:from-white/90 md:to-transparent"></div>
        </div>

        {/* Content */}
        <div className="container mx-auto px-4 relative z-10 pt-10 md:pt-20">
            <div className="max-w-xl">
                <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mb-6 leading-tight">
                    Personal and Business <br />
                    <span className="font-bold">Tax Returns</span>
                </h2>
                <p className="text-gray-700 mb-8 text-sm md:text-base leading-relaxed font-sans">
                    We will get your personal and business tax returns done in a timely manner and maximize your tax benefits.
                </p>
                
                <div className="flex flex-wrap gap-4">
                    <button 
                      onClick={() => onNavigate && onNavigate('products')}
                      className="bg-black text-white px-8 py-3 rounded-full font-bold uppercase text-xs md:text-sm tracking-wide hover:bg-gray-800 transition-colors"
                    >
                        Our Products &gt;
                    </button>
                    <a 
                      href="#contact" 
                      className="border-2 border-nactax-red text-nactax-red px-8 py-3 rounded-full font-bold uppercase text-xs md:text-sm tracking-wide hover:bg-nactax-red hover:text-white transition-colors flex items-center"
                    >
                        Get Quote Now &gt;
                    </a>
                </div>
                
                {/* Dots indicator simulation */}
                <div className="mt-12 flex gap-2">
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-nactax-red"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                </div>
            </div>
        </div>
    </section>
  );
};

export default Hero;
