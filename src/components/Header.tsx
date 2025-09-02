import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentTitle: string;
  setCurrentTitle: (title: string) => void;
}

const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    const headerHeight = 154;
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
  const [activeSection, setActiveSection] = useState('about');

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
          const sections = ['about', 'rituals', 'testimonials', 'contact'];
          const scrollPosition = window.scrollY + 200;
          
          for (const sectionId of sections) {
            let element;
            if (sectionId === 'contact') {
              element = document.querySelector('[data-contact]');
            } else {
              element = document.getElementById(sectionId);
            }
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
        <div className="max-w-full mx-auto px-2 xs:px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center gap-2 xs:gap-3">
            <div className="w-8 h-8 xs:w-10 xs:h-10 sm:w-12 sm:h-12 rounded-full overflow-hidden flex-shrink-0">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
                loading="eager"
                decoding="async"
              />
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-sm xs:text-base sm:text-lg font-semibold text-foreground truncate tracking-wide">Раиса Ильинская</h1>
              <div className="text-xs xs:text-sm font-medium text-accent">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}  
      <div className="bg-background sticky top-[69px] xs:top-[77px] z-20 shadow-md">
        <div className="max-w-full mx-auto px-1 xs:px-2 sm:px-4 py-2 xs:py-3 sm:py-4">
          <div className="grid grid-cols-4 gap-0.5 xs:gap-1">
            <button 
              onClick={() => scrollToSection('about')}
              className={`flex flex-col items-center gap-1 xs:gap-1.5 p-1.5 xs:p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'about' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="User" 
                size={16} 
                className={`xs:w-5 xs:h-5 transition-colors ${
                  activeSection === 'about' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-[10px] xs:text-xs font-medium leading-tight">КТО Я</span>
              {activeSection === 'about' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 xs:w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('rituals')}
              className={`flex flex-col items-center gap-1 xs:gap-1.5 p-1.5 xs:p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'rituals' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="Leaf" 
                size={16} 
                className={`xs:w-5 xs:h-5 transition-colors ${
                  activeSection === 'rituals' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-[10px] xs:text-xs font-medium leading-tight">ОБРЯДЫ</span>
              {activeSection === 'rituals' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 xs:w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              data-section="testimonials"
              onClick={() => scrollToSection('testimonials')}
              className={`flex flex-col items-center gap-1 xs:gap-1.5 p-1.5 xs:p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'testimonials' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="MessageCircle" 
                size={16} 
                className={`xs:w-5 xs:h-5 transition-colors ${
                  activeSection === 'testimonials' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-[10px] xs:text-xs font-medium leading-tight">ОТЗЫВЫ</span>
              {activeSection === 'testimonials' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 xs:w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => {
                const contactElement = document.querySelector('[data-contact]');
                if (contactElement) {
                  contactElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
              }}
              className={`flex flex-col items-center gap-1 xs:gap-1.5 p-1.5 xs:p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'contact' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="Mail" 
                size={16} 
                className={`xs:w-5 xs:h-5 transition-colors ${
                  activeSection === 'contact' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-[10px] xs:text-xs font-medium leading-tight">СВЯЗЬ</span>
              {activeSection === 'contact' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 xs:w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}