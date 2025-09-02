import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Divider from '@/components/Divider';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);

  // Поддержка хеш-навигации
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // убираем #
      if (hash) {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) {
            const header = document.querySelector('header');
            const headerHeight = header ? header.offsetHeight : 120;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            const offsetPosition = elementPosition - headerHeight - 20;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 100);
      }
    };

    // Обработка хеша при загрузке страницы
    handleHashChange();
    
    // Обработка изменения хеша
    window.addEventListener('hashchange', handleHashChange);
    
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header currentTitle={currentTitle} setCurrentTitle={setCurrentTitle} />
      
      <HeroSection currentTitle={currentTitle} />

      <Divider />

      <main className="space-y-12">
        <section id="ktoya" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-2">
          <AboutMeSection />
        </section>

        <Divider />

        <section id="obryad" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-2">
          <RitualsPageSection 
            showMoreRituals={showMoreRituals} 
            setShowMoreRituals={setShowMoreRituals} 
          />
        </section>

        <Divider />

        <section id="otziv" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-2">
          <TestimonialsSection />
        </section>

        <Divider />
        
        <section id="contact" className="scroll-mt-32 max-w-4xl mx-auto px-4 py-2">
          <ContactSection />
        </section>
      </main>
    </div>
  );
}