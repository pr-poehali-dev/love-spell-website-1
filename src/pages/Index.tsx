import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ServicesSection from '@/components/ServicesSection';
import RitualsSection from '@/components/RitualsSection';
import FAQSection from '@/components/FAQSection';
import Divider from '@/components/Divider';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      {/* Who Am I Section */}
      <div className="bg-background">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-12 sm:space-y-16">
          
          <AboutSection />

          <ServicesSection />

          <Divider />

          <RitualsSection 
            showMoreRituals={showMoreRituals} 
            setShowMoreRituals={setShowMoreRituals} 
          />

          <Divider />

          <FAQSection />
        </div>
      </div>
    </div>
  );
}