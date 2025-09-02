import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import Divider from '@/components/Divider';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      <div id="about">
        <AboutMeSection />
      </div>

      <Divider />

      <div id="rituals">
        <RitualsPageSection 
          showMoreRituals={showMoreRituals} 
          setShowMoreRituals={setShowMoreRituals} 
        />
      </div>
    </div>
  );
}