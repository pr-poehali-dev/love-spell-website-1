import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { useState, useEffect } from 'react';

export default function Index() {
  const [currentTitle, setCurrentTitle] = useState('Маг');

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTitle(prev => prev === 'Маг' ? 'Ворожея' : 'Маг');
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header Profile Section */}
      <div className="bg-background border-b border-border">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/20">
              <img 
                src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                alt="Раиса Ильинская"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Раиса Ильинская</h1>
              <div className="text-sm font-medium text-accent">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <div className="bg-background border-b border-border">
        <div className="max-w-sm mx-auto px-4 py-4">
          <div className="grid grid-cols-4 gap-1">
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="User" size={20} className="text-accent" />
              <span className="text-xs font-medium text-foreground">КТО Я</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Leaf" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОБРЯДЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="MessageCircle" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">ОТЗЫВЫ</span>
            </button>
            <button className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-muted/50 transition-colors">
              <Icon name="Mail" size={20} className="text-foreground" />
              <span className="text-xs font-medium text-foreground">СВЯЗЬ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Hero Section with V-Mask Design */}
      <div className="relative">
        {/* Background Image with V-Mask */}
        <div className="relative h-[60vh] sm:h-[70vh]">
          <div 
            className="absolute inset-0 hero-bg v-mask"
            style={{
              backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`
            }}
          >
          </div>
        </div>
        
        {/* Profile Section Overlapping */}
        <div className="relative -mt-20 sm:-mt-24 z-10">
          <div className="max-w-xs mx-auto px-4 text-center">
            {/* Large Profile Image */}
            <div className="mb-6">
              <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto rounded-full overflow-hidden ring-4 ring-accent/30 shadow-2xl bg-background">
                <img 
                  src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                  alt="Раиса Ильинская"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            {/* Name and Title */}
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 drop-shadow-lg">
                Раиса Ильинская
              </h2>
              <div className="text-accent font-semibold text-base sm:text-lg drop-shadow-lg">
                <span className="typewriter" key={currentTitle}>{currentTitle}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Section */}
        <div className="bg-background pt-8 pb-8">
          <div className="max-w-xs mx-auto px-4">
            {/* Call to Action */}
            <Button 
              size="lg" 
              className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 font-semibold text-sm sm:text-base py-4 sm:py-6"
            >
              НАПИШИТЕ МНЕ
              <Icon name="ChevronRight" size={18} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}