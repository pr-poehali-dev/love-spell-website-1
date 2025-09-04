import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Divider from '@/components/Divider';
import SEO from '@/components/SEO';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

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
            const offsetPosition = elementPosition - headerHeight - 32; // отступ чтобы показать начало блока после разделителя
            
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

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Раиса Ильинская",
    "jobTitle": "Потомственная ворожея",
    "description": "Опытная потомственная ворожея. Приворот на любовь, возврат мужа, снятие порчи. Работаю только белой магией.",
    "image": "https://poehali.dev/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg",
    "telephone": "+7 (XXX) XXX-XX-XX",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "RU"
    },
    "sameAs": [],
    "offers": {
      "@type": "Offer",
      "itemOffered": {
        "@type": "Service",
        "name": "Услуги ворожеи",
        "description": "Приворот, снятие порчи, любовная магия, гадание"
      }
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SEO 
        title="Раиса Ильинская - Потомственная Ворожея | Приворот и Любовная Магия"
        description="Опытная потомственная ворожея Раиса Ильинская. Приворот на любовь, возврат мужа, снятие порчи. Работаю только белой магией. Результат гарантирован. ⭐ 4.9/5"
        keywords="приворот, ворожея, любовная магия, возврат мужа, снятие порчи, белая магия, гадание, экстрасенс, потомственная ведунья, магические услуги"
        url="/"
        structuredData={structuredData}
      />
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

      {/* Временная кнопка админки */}
      <Link to="/admin" className="fixed bottom-4 right-4 z-50">
        <Button 
          variant="outline" 
          size="sm"
          className="shadow-lg bg-card border-2 hover:bg-accent"
        >
          <Icon name="Shield" size={16} className="mr-2" />
          Админка
        </Button>
      </Link>
    </div>
  );
}