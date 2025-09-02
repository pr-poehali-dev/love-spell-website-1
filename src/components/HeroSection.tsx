import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  currentTitle: string;
}

export default function HeroSection({ currentTitle }: HeroSectionProps) {
  return (
    <div className="relative -mt-[240px] sm:-mt-[280px] md:-mt-[320px] z-10">
      {/* Background Image with V-Mask */}
      <div className="relative h-[70vh] sm:h-[75vh]">
        <div 
          className="absolute inset-0 hero-bg v-mask"
          style={{
            backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform'
          }}
        >
        </div>
      </div>
      
      {/* Profile Section Overlapping */}
      <div className="relative -mt-16 sm:-mt-20 md:-mt-24 z-10">
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 text-center">
          {/* Large Profile Image with Realistic Shadow */}
          <div className="mb-6 relative">
            {/* Container for avatar and shadow rings */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto">
              
              {/* Shadow ring */}
              <div className="absolute w-[104%] h-[104%] rounded-full opacity-65"
                   style={{ 
                     left: '-10px', 
                     top: '6px',
                     zIndex: 1,
                     background: 'linear-gradient(180deg, rgba(255, 152, 0, 0.85) 0%, rgba(255, 152, 0, 0.6) 30%, rgba(255, 152, 0, 0.3) 70%, rgba(255, 152, 0, 0.15) 100%)'
                   }}>
              </div>
              
              {/* Main Avatar */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background"
                   style={{ 
                     zIndex: 10,
                     filter: 'drop-shadow(0 14px 24px rgba(0, 0, 0, 0.35))'
                   }}>
                <img 
                  src="/img/ad82ffc8-0c3b-4ed9-9e55-893635b263d1.jpg" 
                  alt="Раиса Ильинская"
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
                {/* Sunset reflection overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-400/30 via-yellow-300/20 to-red-500/25 rounded-full mix-blend-overlay"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-amber-600/40 via-transparent to-transparent rounded-full mix-blend-soft-light"></div>
              </div>
            </div>
          </div>
          
          {/* Name and Title */}
          <div className="mb-6 sm:mb-8">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg">
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
            className="w-full bg-primary hover:bg-primary/90 text-white transition-all duration-300 font-semibold text-sm sm:text-base py-4 sm:py-6 active:scale-[0.98] transform-gpu"
          >
            НАПИШИТЕ МНЕ
            <Icon name="ChevronRight" size={18} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}