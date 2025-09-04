import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Divider from '@/components/Divider';
import SEO from '@/components/SEO';

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
        {/* Обо мне секция */}
        <section id="ktoya" className="scroll-mt-32 max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 py-2 lg:py-8">
          <div className="lg:grid lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="lg:col-span-8">
              <AboutMeSection />
            </div>
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-32">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mx-auto mb-4 bg-primary/10 flex items-center justify-center">
                    <img 
                      src="/images/raisa-profile.jpg" 
                      alt="Раиса Ильинская"
                      className="w-16 h-16 lg:w-20 lg:h-20 rounded-full object-cover"
                    />
                  </div>
                  <h3 className="text-lg lg:text-xl font-bold text-foreground mb-1">Раиса Ильинская</h3>
                  <p className="text-sm text-muted-foreground mb-4">{currentTitle}</p>
                </div>
                <div className="space-y-3 text-sm lg:text-base">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>Опыт более 15 лет</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>Помогла более 1000 людям</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <span className="w-2 h-2 bg-primary rounded-full"></span>
                    <span>Работаю только белой магией</span>
                  </div>
                </div>
                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full mt-6 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-6 rounded-lg transition-all duration-300"
                >
                  Получить консультацию
                </button>
              </div>
            </div>
          </div>
        </section>

        <Divider />

        {/* Обряды секция */}
        <section id="obryad" className="scroll-mt-32 max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 py-2 lg:py-8">
          <RitualsPageSection 
            showMoreRituals={showMoreRituals} 
            setShowMoreRituals={setShowMoreRituals} 
          />
        </section>

        <Divider />

        {/* Отзывы секция */}
        <section id="otziv" className="scroll-mt-32 max-w-4xl lg:max-w-7xl mx-auto px-4 lg:px-8 py-2 lg:py-8">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <TestimonialsSection />
            </div>
            <div className="lg:col-span-1 mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-32">
                <h3 className="text-lg lg:text-xl font-bold text-foreground mb-6">Гарантии качества</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    </div>
                    <div className="text-sm lg:text-base text-muted-foreground">
                      Индивидуальный подход к каждому клиенту
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    </div>
                    <div className="text-sm lg:text-base text-muted-foreground">
                      Полная анонимность и конфиденциальность
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    </div>
                    <div className="text-sm lg:text-base text-muted-foreground">
                      Поддержка на всех этапах работы
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="w-2 h-2 bg-primary rounded-full"></span>
                    </div>
                    <div className="text-sm lg:text-base text-muted-foreground">
                      Результат или возврат средств
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border border-primary/20">
                  <p className="text-sm lg:text-base text-center text-foreground font-medium">
                    "Моя магия не имеет цены. Если захотите, сможете отблагодарить меня после помощи, как пожелаете."
                  </p>
                  <p className="text-xs text-center text-muted-foreground mt-2">— Раиса Ильинская</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Divider />
        
        {/* Контакты секция */}
        <section id="contact" className="scroll-mt-32 max-w-4xl lg:max-w-6xl mx-auto px-4 lg:px-8 py-2 lg:py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-start">
            <div>
              <ContactSection />
            </div>
            <div className="mt-8 lg:mt-0">
              <div className="bg-card border border-border rounded-2xl p-6 lg:p-8">
                <h3 className="text-lg lg:text-xl font-bold text-foreground mb-6">Важная информация</h3>
                <div className="space-y-4 text-sm lg:text-base text-muted-foreground">
                  <p>
                    <strong className="text-foreground">Время ответа:</strong> Обычно отвечаю в течение 2-3 часов в рабочие дни
                  </p>
                  <p>
                    <strong className="text-foreground">Консультация:</strong> Первичная консультация бесплатная (до 15 минут)
                  </p>
                  <p>
                    <strong className="text-foreground">Конфиденциальность:</strong> Все обращения строго конфиденциальны
                  </p>
                  <p>
                    <strong className="text-foreground">Методы работы:</strong> Использую только белую магию и проверенные обряды
                  </p>
                </div>
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm text-center text-muted-foreground">
                    Помогу решить вопросы любви, семьи, здоровья и духовного развития
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}