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
          const sections = ['about', 'rituals'];
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
      <div className="bg-background/95 backdrop-blur-md border-b border-border sticky top-0 z-30">
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
      <div className="bg-background/90 backdrop-blur-md sticky top-[77px] z-20 shadow-sm border-b border-border/50">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button 
              onClick={() => scrollToSection('about')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'about' 
                  ? 'bg-accent/10 text-accent shadow-md' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="User" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'about' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">КТО Я</span>
              {activeSection === 'about' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('rituals')}
              className={`flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg transition-colors active:scale-95 focus-visible group relative overflow-hidden ${
                activeSection === 'rituals' 
                  ? 'bg-accent/10 text-accent' 
                  : 'hover:bg-muted/50 text-foreground hover:text-accent'
              }`}
            >
              <Icon 
                name="Leaf" 
                size={20} 
                className={`transition-colors  ${
                  activeSection === 'rituals' ? 'text-accent' : ''
                }`} 
              />
              <span className="text-xs sm:text-xs font-medium">ОБРЯДЫ</span>
              {activeSection === 'rituals' && (
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-8 h-0.5 bg-accent rounded-full"></div>
              )}
            </button>
            <button 
              onClick={() => scrollToSection('testimonials')}
              className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group text-foreground hover:text-accent"
            >
              <Icon name="MessageCircle" size={20} className="transition-colors" />
              <span className="text-xs sm:text-xs font-medium">ОТЗЫВЫ</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors group text-foreground hover:text-accent">
              <Icon name="Mail" size={20} className="transition-colors" />
              <span className="text-xs sm:text-xs font-medium">СВЯЗЬ</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}