import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  currentTitle: string;
}

export default function HeroSection({ currentTitle }: HeroSectionProps) {
  return (
    <div className="relative -mt-[200px] xs:-mt-[240px] sm:-mt-[280px] md:-mt-[320px] z-10">
      {/* Background Image with V-Mask */}
      <div className="relative h-[60vh] xs:h-[65vh] sm:h-[70vh] md:h-[75vh] overflow-hidden">
        <div className="absolute inset-0 hero-bg v-mask">
          {/* Оптимизированное фоновое изображение */}
          <img 
            src="/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg"
            alt="Фоновое изображение"
            className="absolute inset-0 w-full h-full object-cover"
            loading="eager"
            decoding="async"
            fetchpriority="high"
          />
          {/* Overlay для улучшения контраста */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>
      </div>
      
      {/* Profile Section Overlapping */}
      <div className="relative -mt-12 xs:-mt-14 sm:-mt-16 md:-mt-20 lg:-mt-24 z-10">
        <div className="max-w-[280px] xs:max-w-xs sm:max-w-sm md:max-w-md mx-auto px-3 xs:px-4 text-center">
          {/* Large Profile Image with Realistic Shadow */}
          <div className="mb-4 xs:mb-5 sm:mb-6 relative">
            {/* Simplified avatar */}
            <div className="relative w-24 h-24 xs:w-28 xs:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background"
                   style={{ 
                     filter: 'drop-shadow(0 8px 16px rgba(0, 0, 0, 0.25)) drop-shadow(0 4px 8px rgba(0, 0, 0, 0.15))'
                   }}>
                <img 
                  src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                  alt="Раиса Ильинская"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  width={160}
                  height={160}
                />
              </div>
            </div>
          </div>
          
          {/* Name and Title */}
          <div className="mb-4 xs:mb-5 sm:mb-6 md:mb-8">
            <h2 className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 xs:mb-3 sm:mb-4 drop-shadow-lg tracking-wide break-words">
              Раиса Ильинская
            </h2>
            <div className="text-accent font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-lg min-h-[1.5em]">
              <span className="typewriter" key={currentTitle}>{currentTitle}</span>
            </div>

          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="bg-background pt-2 pb-8">
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          {/* Call to Action */}
          <Button 
            size="lg" 
            className="w-full bg-primary hover:bg-primary/90 text-white font-semibold transition-all duration-300 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20 active:scale-[0.98]"
            onClick={() => {
              const contactElement = document.querySelector('[data-contact]');
              if (contactElement) {
                contactElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }
            }}
          >
            НАПИШИТЕ МНЕ
            <Icon name="ArrowRight" size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}