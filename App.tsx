import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ServiceHighlights from './components/ServiceHighlights';
import WelcomeSection from './components/WelcomeSection';
import ServiceGrid from './components/ServiceGrid';
import ProductsSection from './components/ProductsSection';
import PaymentSection from './components/PaymentSection';
import FooterContact from './components/FooterContact';
import ChatBot from './components/ChatBot';
import AdminDashboard from './components/AdminDashboard';
import ServiceDetailPage from './components/ServiceDetailPage';

type PageView = 'home' | 'payment' | 'products' | 'service-detail';

const App: React.FC = () => {
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [currentView, setCurrentView] = useState<PageView>('home');
  const [selectedService, setSelectedService] = useState<string>('');

  const handleNavigate = (page: string, data?: any) => {
    if (page === 'service-detail' && data) {
      setSelectedService(data);
      setCurrentView('service-detail');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'payment') {
      setCurrentView('payment');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'products') {
      setCurrentView('products');
      window.scrollTo({ top: 0, behavior: 'instant' });
    } else if (page === 'home') {
      setCurrentView('home');
      // Only scroll to top if we weren't just clicking an anchor link
      if (!window.location.hash) {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
    } else {
      // Fallback for contact/about/profile anchor links handled in Header
      setCurrentView('home');
    }
  };

  return (
    <div className="font-sans text-gray-900 bg-white relative min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} />
      
      <main className="flex-grow">
        {currentView === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <ServiceHighlights />
            <WelcomeSection />
            <div id="profile">
              <ServiceGrid onNavigate={handleNavigate} />
            </div>
          </>
        )}

        {currentView === 'payment' && (
          <PaymentSection />
        )}

        {currentView === 'products' && (
          <ProductsSection />
        )}

        {currentView === 'service-detail' && (
          <ServiceDetailPage 
            title={selectedService} 
            onBack={() => setCurrentView('home')}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      <FooterContact onAdminClick={() => setIsAdminOpen(true)} />
      
      {/* Floating Chat Bot */}
      <ChatBot />

      {/* Admin Dashboard Overlay */}
      {isAdminOpen && (
        <AdminDashboard onClose={() => setIsAdminOpen(false)} />
      )}
    </div>
  );
};

export default App;
