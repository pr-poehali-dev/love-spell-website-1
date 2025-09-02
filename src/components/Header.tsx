import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentTitle: string;
  setCurrentTitle: (title: string) => void;
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    // Получаем актуальную высоту хедера
    const header = document.querySelector('header');
    const headerHeight = header ? header.offsetHeight : 120;
    
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const offsetPosition = elementPosition - headerHeight;
    
    // Добавляем визуальную обратную связь
    const button = document.querySelector(`[data-section="${sectionId}"]`);
    if (button) {
      button.classList.add('scale-95');
      setTimeout(() => button.classList.remove('scale-95'), 150);
    }
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export default function Header({ currentTitle, setCurrentTitle }: HeaderProps) {
  const [activeSection, setActiveSection] = useState('ktoya');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(currentTitle === 'Маг' ? 'Ворожея' : 'Маг');
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTitle, setCurrentTitle]);

  useEffect(() => {
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const sections = ['ktoya', 'obryad', 'otziv', 'contact'];
          const scrollPosition = window.scrollY + 200;
          
          for (const sectionId of sections) {
            const element = document.getElementById(sectionId);
            if (element) {
              const { offsetTop, offsetHeight } = element;
              if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
                setActiveSection(sectionId);
                break;
              }
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header Profile Section */}
      <div className="bg-background border-b border-border sticky top-0 z-30">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-semibold text-foreground truncate tracking-wide">Раиса Ильинская</h1>
              <div className="text-sm font-medium text-accent">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}  
      <div className="bg-background sticky top-[77px] z-20 shadow-md">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button 
              onClick={() => scrollToSection('ktoya')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'ktoya' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="User" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'ktoya' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">КТО Я</span>
              {activeSection === 'ktoya' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('obryad')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'obryad' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="Leaf" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'obryad' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">ОБРЯДЫ</span>
              {activeSection === 'obryad' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              data-section="testimonials"
              onClick={() => scrollToSection('otziv')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'otziv' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="MessageCircle" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'otziv' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">ОТЗЫВЫ</span>
              {activeSection === 'otziv' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'contact' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="Mail" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'contact' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">СВЯЗЬ</span>
              {activeSection === 'contact' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}