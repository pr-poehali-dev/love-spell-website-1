import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import AboutMeSection from '@/components/AboutMeSection';
import RitualsPageSection from '@/components/RitualsPageSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';
import Divider from '@/components/Divider';
import SEO from '@/components/SEO';
import Layout from '@/components/Layout';

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
    <Layout>
      <div className="min-h-screen bg-background text-foreground">
        <SEO 
          title="Раиса Ильинская - Потомственная Ворожея | Приворот и Любовная Магия"
          description="Опытная потомственная ворожея Раиса Ильинская. Приворот на любовь, возврат мужа, снятие порчи. Работаю только белой магией. Результат гарантирован. ⭐ 4.9/5"
          keywords="приворот, ворожея, любовная магия, возврат мужа, снятие порчи, белая магия, гадание, экстрасенс, потомственная ведунья, магические услуги"
          url="/"
          structuredData={structuredData}
        />
        
        {/* Mobile Version - показывается только на мобильных */}
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

        {/* Desktop Version - показывается только на десктопе */}
        <div className="hidden lg:flex min-h-screen">
          <div className="flex-1 flex">
            
            {/* Left Side - Profile Card */}
            <div className="w-[480px] relative">
              <div className="absolute inset-0">
                <img 
                  src="https://cdn.poehali.dev/files/a69b07ec-541f-4bfc-b09a-43d368173050.png"
                  alt="Sunset background"
                  className="w-full h-full object-cover rounded-l-3xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent rounded-l-3xl"></div>
              </div>
              
              {/* Profile Content */}
              <div className="relative z-10 h-full min-h-screen flex flex-col justify-end p-12">
                <div className="mb-8 flex justify-center">
                  <div className="w-40 h-40 rounded-full border-4 border-amber-400/60 overflow-hidden shadow-2xl">
                    <img 
                      src="/images/raisa-profile.jpg" 
                      alt="Раиса Ильинская"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-12">
                  <h1 className="text-4xl font-bold text-white mb-3">Раиса Ильинская</h1>
                  <p className="text-amber-400 font-medium text-xl">Ворожея</p>
                </div>

                <button 
                  onClick={() => {
                    const element = document.getElementById('contact');
                    if (element) element.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-transparent border-2 border-white/40 hover:border-amber-400 hover:bg-amber-400/15 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                >
                  НАПИШИТЕ МНЕ
                  <span className="text-xl">→</span>
                </button>
              </div>
            </div>

            {/* Right Side - Content */}
            <div className="flex-1 p-12 overflow-y-auto max-h-screen">
              
              {/* About Section */}
              <div id="ktoya" className="mb-16">
                <h2 className="text-3xl font-bold text-amber-400 mb-8 flex items-center gap-3">
                  <span className="text-4xl">👤</span>
                  Обо мне
                </h2>
                <div className="text-slate-300 leading-relaxed text-lg space-y-4">
                  <p>
                    Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и 
                    как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня 
                    откажутся. Уже с возрастом стала осознавать, что могу быть нужной, могу 
                    помогать людям и получать от них позитивную энергию, которая питает меня, как 
                    батарея питает теплом холодный дом.
                  </p>
                  <p>
                    Мои дорогие сестры, товарищи, не стесняйтесь просить помощи, ведь нашла вас в единстве. 
                    Постараюсь помочь вам, чем смогу. Делаю всё, что в моих силах. Моя магия не имеет цены. 
                    Если захотите, сможете отблагодарить меня после помощи, как пожелаете.
                  </p>
                </div>
              </div>

              {/* What I Do Section */}
              <div id="obryad" className="mb-16">
                <h3 className="text-3xl font-bold text-amber-400 mb-8 flex items-center gap-3">
                  <span className="text-4xl">✨</span>
                  Чем я занимаюсь
                </h3>
                
                <div className="grid grid-cols-2 gap-8">
                  {/* Christian Magic */}
                  <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/40 hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">✕</span>
                      </div>
                      <h4 className="font-bold text-white text-xl">Христианской магией</h4>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Основана на работе с архангелами, ангелами, святыми, а также 
                      известными архетипами Пресвятой Богородицы и Иисуса Христа.
                    </p>
                  </div>

                  {/* Runic Magic */}
                  <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/40 hover:border-amber-500/30 transition-all duration-300">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-white text-2xl">$</span>
                      </div>
                      <h4 className="font-bold text-white text-xl">Рунической магией</h4>
                    </div>
                    <p className="text-slate-400 leading-relaxed">
                      Использование специальных знаков и символов (рун) для получения 
                      информации, предсказаний, влияния на судьбу и привлечения энергий.
                    </p>
                  </div>
                </div>
              </div>

              {/* Rituals Section */}
              <div className="mb-16">
                <RitualsPageSection 
                  showMoreRituals={showMoreRituals} 
                  setShowMoreRituals={setShowMoreRituals} 
                />
              </div>

              {/* Testimonials Section */}
              <div id="otziv" className="mb-16">
                <TestimonialsSection />
              </div>
              
              {/* Contact Section */}
              <div id="contact">
                <ContactSection />
              </div>

            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}