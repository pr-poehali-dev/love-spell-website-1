import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface RitualsSectionProps {
  showMoreRituals: boolean;
  setShowMoreRituals: (show: boolean) => void;
}

const ritualCards = [
  {
    icon: 'Heart',
    title: 'Приворот на жену',
    description: 'Обряд для восстановления отношений и привлечения внимания супруги'
  },
  {
    icon: 'Users',
    title: 'Приворот на мужа',
    description: 'Обряд для укрепления семейных отношений и возвращения мужа'
  },
  {
    icon: 'Sparkles',
    title: 'Обряд на внушение любви',
    description: 'Магический ритуал для пробуждения искренних чувств'
  },
  {
    icon: 'Sun',
    title: 'Обряд на снятие одиночества',
    description: 'Ритуал для привлечения спутника жизни и избавления от одиночества'
  },
  {
    icon: 'HeartHandshake',
    title: 'Обряд на привлечение любви',
    description: 'Магический ритуал для привлечения истинной любви в жизнь'
  },
  {
    icon: 'Image',
    title: 'Обряд приворота на фото',
    description: 'Дистанционный обряд с использованием фотографии человека'
  },
  {
    icon: 'Shield',
    title: 'Обряд от соперницы',
    description: 'Защитный ритуал для устранения влияния соперницы'
  },
  {
    icon: 'Battery',
    title: 'Обряд на набор энергии',
    description: 'Ритуал для восстановления жизненной энергии и сил'
  },
  {
    icon: 'Handshake',
    title: 'Обряд на примирение',
    description: 'Ритуал для восстановления мира и согласия в отношениях'
  },
  {
    icon: 'Zap',
    title: 'Обряд на вольта',
    description: 'Мощный магический ритуал с использованием восковой куклы'
  }
];

function RitualCard({ ritual }: { ritual: typeof ritualCards[0] }) {
  return (
    <div className="group relative p-6 cursor-pointer transition-all duration-500 rounded-2xl bg-gradient-to-br from-background via-background to-accent/5 hover:from-accent/8 hover:via-background hover:to-accent/12 overflow-hidden border border-accent/15 hover:border-accent/25 shadow-sm hover:shadow-lg hover:shadow-accent/10 backdrop-blur-sm">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-transparent via-accent/3 to-transparent"></div>
      
      <div className="relative flex flex-col items-center text-center">
        {/* Icon with enhanced styling */}
        <div className="mb-5 group-hover:scale-110 transition-all duration-500 relative">
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all duration-500"></div>
          <div className="relative w-16 h-16 bg-gradient-to-br from-primary/10 to-primary/5 rounded-2xl flex items-center justify-center group-hover:from-primary/15 group-hover:to-primary/10 transition-all duration-500">
            <Icon name={ritual.icon as any} size={28} className="text-primary drop-shadow-sm" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="relative">
            <h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors duration-300 text-center px-4">
              {ritual.title}
            </h3>
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4">
              <Icon name="ChevronRight" size={18} className="text-accent/70 group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
            </div>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed max-w-xs mx-auto px-2">{ritual.description}</p>
        </div>

        {/* Enhanced CTA button */}
        <div className="mt-6 group-hover:scale-105 transition-transform duration-300">
          <div className="px-5 py-2.5 bg-gradient-to-r from-accent/12 to-accent/8 hover:from-accent/18 hover:to-accent/12 rounded-full text-accent text-sm font-medium transition-all duration-300 flex items-center gap-2.5 border border-accent/20 hover:border-accent/30">
            <span>Подробнее</span>
            <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1.5 transition-transform duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function RitualsSection({ showMoreRituals, setShowMoreRituals }: RitualsSectionProps) {
  const visibleRituals = ritualCards.slice(0, 4);
  const hiddenRituals = ritualCards.slice(4);

  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10 text-primary">О</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
            top: '-1px',
            left: '-10px'
          }}></div>
        </span>бряды
      </h2>
      
      <div className="space-y-3">
        {/* Always Visible Ritual Cards */}
        {visibleRituals.map((ritual, index) => (
          <RitualCard key={index} ritual={ritual} />
        ))}

        {/* Animated Hidden Rituals */}
        <div className={`space-y-3 transition-all duration-500 ease-in-out overflow-hidden ${
          showMoreRituals 
            ? 'max-h-[2000px] opacity-100' 
            : 'max-h-0 opacity-0'
        }`}>
          {hiddenRituals.map((ritual, index) => (
            <div
              key={index + 4}
              className={`transform transition-all duration-700 ease-out ${
                showMoreRituals 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              }`}
              style={{
                transitionDelay: showMoreRituals ? `${index * 100}ms` : '0ms'
              }}
            >
              <RitualCard ritual={ritual} />
            </div>
          ))}
        </div>

        {/* Show More Button */}
        <div className="pt-6">
          <Button 
            variant="outline" 
            className="w-full border-accent/50 text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 rounded-full py-3 font-medium group"
            onClick={() => setShowMoreRituals(!showMoreRituals)}
          >
            <span className="group-hover:scale-105 transition-transform duration-300">
              {showMoreRituals ? 'Скрыть' : 'Показать больше'}
            </span>
            <Icon 
              name={showMoreRituals ? 'ChevronUp' : 'ChevronDown'} 
              size={16} 
              className={`ml-2 transition-transform duration-300 ${
                showMoreRituals ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'
              }`}
            />
          </Button>
        </div>
      </div>
    </div>
  );
}