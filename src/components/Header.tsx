import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  currentTitle: string;
  setCurrentTitle: (title: string) => void;
}

export default function Header({ currentTitle, setCurrentTitle }: HeaderProps) {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(currentTitle === 'Маг' ? 'Ворожея' : 'Маг');
    }, 5000);

    return () => clearInterval(interval);
  }, [currentTitle, setCurrentTitle]);

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
              <h1 className="text-base sm:text-lg font-semibold text-foreground truncate">Раиса Ильинская</h1>
              <div className="text-sm font-medium text-accent">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}  
      <div className="bg-background border-b border-border sticky top-[77px] z-20">
        <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 active:scale-95">
              <Icon name="User" size={20} className="text-accent" />
              <span className="text-xs sm:text-xs font-medium text-foreground">КТО Я</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 active:scale-95">
              <Icon name="Leaf" size={20} className="text-foreground" />
              <span className="text-xs sm:text-xs font-medium text-foreground">ОБРЯДЫ</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 active:scale-95">
              <Icon name="MessageCircle" size={20} className="text-foreground" />
              <span className="text-xs sm:text-xs font-medium text-foreground">ОТЗЫВЫ</span>
            </button>
            <button className="flex flex-col items-center gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg hover:bg-muted/50 transition-colors duration-200 active:scale-95">
              <Icon name="Mail" size={20} className="text-foreground" />
              <span className="text-xs sm:text-xs font-medium text-foreground">СВЯЗЬ</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}