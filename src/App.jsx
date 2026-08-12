import { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import DocumentChecklist from './components/DocumentChecklist';
import Process from './components/Process';
import NewsSection from './components/NewsSection';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';
import AuthModal from './components/AuthModal';

function AppContent() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [prefilledMessage, setPrefilledMessage] = useState('');
  const [isChecklistOpen, setIsChecklistOpen] = useState(false);

  const handleSelectCountry = (countryName) => {
    setSelectedCountry(countryName);
    setPrefilledMessage(''); // clear previous message parameters
  };



  return (
    <div className="bg-slate-950 min-h-screen text-slate-100 font-sans selection:bg-blue-600 selection:text-white">
      {/* Header Navigation with triggers */}
      <Navbar 
        onOpenChecklist={() => setIsChecklistOpen(true)}
      />

      {/* Main Content Layout */}
      <main>
        {/* Hero Banner Section */}
        <Hero />

        {/* Services & Countries Grid Section */}
        <Services 
          onSelectCountry={handleSelectCountry} 
        />

        {/* Advisory Process Roadmap */}
        <Process />

        {/* Latest Visa News & Updates */}
        <NewsSection />

        {/* Client Success Stories */}
        <Testimonials />

        {/* Frequently Asked Questions Accordion */}
        <FAQ />

        {/* Lead Form & Assessment Request */}
        <ContactForm 
          preselectedCountry={selectedCountry} 
          prefilledMessage={prefilledMessage} 
        />
      </main>

      {/* Footer & Disclaimer */}
      <Footer />

      {/* Auth Portal Modal Overlay */}
      <AuthModal />



      {/* Document Checklist Modal Overlay */}
      <DocumentChecklist 
        isOpen={isChecklistOpen} 
        onClose={() => setIsChecklistOpen(false)} 
      />
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
