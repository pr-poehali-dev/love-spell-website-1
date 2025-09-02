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
          className="absolute inset-0 hero-bg v-mask transform scale-105 smooth-transition-slow hover:scale-100"
          style={{
            backgroundImage: `url('/img/360087e3-3b50-4f2f-932f-be1fbf78267b.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            willChange: 'transform'
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
            {/* Container for avatar and shadow rings */}
            <div className="relative w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 mx-auto group">
              
              {/* Shadow ring с анимацией */}
              <div className="absolute w-[104%] h-[104%] rounded-full opacity-65 smooth-transition group-hover:opacity-80 group-hover:scale-105"
                   style={{ 
                     left: '-10px', 
                     top: '6px',
                     zIndex: 1,
                     background: 'linear-gradient(180deg, rgba(255, 152, 0, 0.85) 0%, rgba(255, 152, 0, 0.6) 30%, rgba(255, 152, 0, 0.3) 70%, rgba(255, 152, 0, 0.15) 100%)'
                   }}>
              </div>
              
              {/* Дополнительное свечение при hover */}
              <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-30 smooth-transition"
                   style={{
                     background: 'radial-gradient(circle, rgba(255, 152, 0, 0.4) 0%, transparent 70%)',
                     transform: 'scale(1.2)',
                     zIndex: 0
                   }}>
              </div>
              
              {/* Main Avatar */}
              <div className="relative w-full h-full rounded-full overflow-hidden bg-background smooth-transition group-hover:scale-105"
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
          <div className="mb-6 sm:mb-8 fade-in-up">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 drop-shadow-lg tracking-wide">
              Раиса Ильинская
            </h2>
            <div className="text-accent font-semibold text-lg sm:text-xl md:text-2xl drop-shadow-lg min-h-[1.5em]">
              <span className="typewriter gradient-text" key={currentTitle}>{currentTitle}</span>
            </div>
            {/* Декоративная линия под заголовком */}
            <div className="w-24 h-1 gradient-accent rounded-full mx-auto mt-4 opacity-80"></div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="bg-background pt-2 pb-8">
        <div className="max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4">
          {/* Call to Action */}
          <Button 
            size="lg" 
            className="w-full gradient-accent hover:shadow-lg hover:shadow-accent/25 text-white smooth-transition font-semibold text-sm sm:text-base py-4 sm:py-6 active:scale-[0.98] transform-gpu hover:-translate-y-1 focus-visible group"
          >
            <span className="relative z-10">НАПИШИТЕ МНЕ</span>
            <Icon name="MessageSquare" size={18} className="ml-2 relative z-10 group-hover:rotate-12 smooth-transition" />
            {/* Блик на кнопке */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
          </Button>
        </div>
      </div>
    </div>
  );
}