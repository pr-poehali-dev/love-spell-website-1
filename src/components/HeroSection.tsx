import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  currentTitle: string;
}

export default function HeroSection({ currentTitle }: HeroSectionProps) {
  return (
    <div className="relative -mt-[240px] sm:-mt-[280px] md:-mt-[320px] z-10">
      {/* Background Image with V-Mask */}
      <div className="relative h-[70vh] sm:h-[75vh] overflow-hidden">
        <div 
          className="absolute inset-0 hero-bg v-mask"
          style={{
            backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        >
          {/* Overlay для улучшения контраста */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40"></div>
        </div>
      </div>
      
      {/* Profile Section Overlapping */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-10">
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 text-center">
          {/* Large Profile Image with Realistic Shadow */}
          <div className="mb-6 relative">
            {/* Simplified avatar */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto">
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background"
                   style={{ 
                     filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35))'
                   }}>
                <img 
                  src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                  alt="Раиса Ильинская"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </div>
            </div>
          </div>
          
          {/* Name and Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
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
              const element = document.getElementById('contact');
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