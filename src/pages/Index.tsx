import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Divider from '@/components/Divider';
import SEO from '@/components/SEO';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');
  const [showMoreRituals, setShowMoreRituals] = useState(false);
  const [activeDesktopSection, setActiveDesktopSection] = useState('ktoya');

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

  // Desktop navigation handler
  const scrollToSection = (sectionId: string) => {
    setActiveDesktopSection(sectionId);
    const element = document.getElementById(`desktop-${sectionId}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

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
      
      {/* МОБИЛЬНАЯ ВЕРСИЯ (остается без изменений) */}
      <div className="lg:hidden">
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

      {/* ДЕСКТОПНАЯ ВЕРСИЯ - кардинально новая структура */}
      <div className="hidden lg:flex min-h-screen">
        
        {/* Левая боковая панель навигации */}
        <div className="w-80 bg-card/30 backdrop-blur-sm border-r border-border flex flex-col">
          
          {/* Header секция в сайдбаре */}
          <div className="p-8 border-b border-border">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                <img 
                  src="/images/raisa-profile.jpg" 
                  alt="Раиса Ильинская"
                  className="w-20 h-20 rounded-full object-cover"
                />
              </div>
              <h1 className="text-xl font-bold text-foreground mb-1">Раиса Ильинская</h1>
              <p className="text-sm text-muted-foreground mb-4">Потомственная ворожея</p>
              <div className="text-xs text-primary font-medium">{currentTitle}</div>
            </div>
          </div>

          {/* Навигационное меню */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {[
                { id: 'ktoya', label: 'Обо мне', icon: 'User' },
                { id: 'obryad', label: 'Обряды и ритуалы', icon: 'Sparkles' },
                { id: 'otziv', label: 'Отзывы клиентов', icon: 'MessageCircle' },
                { id: 'contact', label: 'Связаться со мной', icon: 'Phone' }
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => scrollToSection(item.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 text-left ${
                      activeDesktopSection === item.id 
                        ? 'bg-primary text-primary-foreground shadow-lg' 
                        : 'hover:bg-muted text-foreground hover:text-primary'
                    }`}
                  >
                    <Icon name={item.icon as any} size={20} />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* CTA в сайдбаре */}
          <div className="p-6 border-t border-border">
            <button 
              onClick={() => scrollToSection('contact')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
            >
              <Icon name="MessageSquare" size={18} />
              Получить консультацию
            </button>
          </div>
        </div>

        {/* Основной контент */}
        <div className="flex-1 overflow-y-auto">
          
          {/* Hero секция для десктопа */}
          <section className="relative h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 via-background to-accent/5">
            <div className="absolute inset-0 bg-grid opacity-[0.02]" />
            <div className="relative z-10 text-center max-w-4xl mx-auto px-8">
              <h1 className="text-6xl font-bold text-foreground mb-6">
                Магия, которая <span className="text-primary">изменит</span> вашу жизнь
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Потомственная ворожея с многолетним опытом поможет в вопросах любви, 
                семьи и духовного развития
              </p>
              <div className="flex gap-6 justify-center">
                <button 
                  onClick={() => scrollToSection('obryad')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Icon name="Sparkles" size={20} />
                  Узнать об обрядах
                </button>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="border border-primary text-primary hover:bg-primary hover:text-primary-foreground font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center gap-2"
                >
                  <Icon name="Phone" size={20} />
                  Связаться сейчас
                </button>
              </div>
            </div>
          </section>

          {/* Основные секции */}
          <div className="max-w-7xl mx-auto px-8 py-16 space-y-24">
            
            {/* Обо мне - широкая секция */}
            <section id="desktop-ktoya" className="scroll-mt-8">
              <div className="grid grid-cols-3 gap-16 items-start">
                <div className="col-span-2">
                  <h2 className="text-4xl font-bold text-foreground mb-8">Обо мне</h2>
                  <AboutMeSection />
                </div>
                <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <div className="text-center mb-6">
                    <img 
                      src="/images/raisa-profile.jpg" 
                      alt="Раиса Ильинская"
                      className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                    />
                    <h3 className="text-xl font-bold text-foreground">Раиса Ильинская</h3>
                    <p className="text-muted-foreground">Потомственная ворожея</p>
                  </div>
                  <div className="space-y-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Icon name="Clock" size={16} />
                      <span>Опыт более 15 лет</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Users" size={16} />
                      <span>Помогла более 1000 людям</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Icon name="Heart" size={16} />
                      <span>Работаю только белой магией</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Обряды - полноширинная секция */}
            <section id="desktop-obryad" className="scroll-mt-8">
              <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Обряды и ритуалы</h2>
              <RitualsPageSection 
                showMoreRituals={showMoreRituals} 
                setShowMoreRituals={setShowMoreRituals} 
              />
            </section>

            {/* Отзывы - трехколоночная */}
            <section id="desktop-otziv" className="scroll-mt-8">
              <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Отзывы клиентов</h2>
              <div className="grid grid-cols-3 gap-8">
                <div className="col-span-2">
                  <TestimonialsSection />
                </div>
                <div className="bg-card/30 backdrop-blur-sm rounded-2xl p-8 border border-border">
                  <h3 className="text-xl font-bold text-foreground mb-6">Почему выбирают меня?</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={12} className="text-primary" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Индивидуальный подход к каждому клиенту
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={12} className="text-primary" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Полная конфиденциальность
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                        <Icon name="Check" size={12} className="text-primary" />
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Результат или возврат средств
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Контакты - центрированная секция */}
            <section id="desktop-contact" className="scroll-mt-8">
              <h2 className="text-4xl font-bold text-foreground mb-12 text-center">Связаться со мной</h2>
              <div className="max-w-4xl mx-auto">
                <ContactSection />
              </div>
            </section>

          </div>

          {/* Footer для десктопа */}
          <footer className="border-t border-border bg-card/20 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto px-8 py-12">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">Раиса Ильинская</h3>
                <p className="text-muted-foreground mb-6">Потомственная ворожея • Белая магия • Духовная помощь</p>
                <button 
                  onClick={() => scrollToSection('contact')}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-flex items-center gap-2"
                >
                  <Icon name="MessageSquare" size={18} />
                  Получить консультацию
                </button>
              </div>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}