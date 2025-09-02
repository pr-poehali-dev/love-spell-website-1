import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import Divider from '@/components/Divider';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      <main className="max-w-4xl mx-auto px-4 py-8 space-y-12">
        <section id="about" className="scroll-mt-32">
          <AboutMeSection />
        </section>

        <Divider />

        <section id="rituals" className="scroll-mt-32">
          <RitualsPageSection 
            showMoreRituals={showMoreRituals} 
            setShowMoreRituals={setShowMoreRituals} 
          />
        </section>

        <Divider />

        <section id="testimonials" className="scroll-mt-32">
          <TestimonialsSection />
        </section>
      </main>
    </div>
  );
}