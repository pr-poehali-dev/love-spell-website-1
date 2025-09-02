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
    <div className="group relative border border-border rounded-xl p-5 hover:border-accent/50 transition-all duration-300 cursor-pointer bg-background hover:bg-gradient-to-r hover:from-background hover:to-accent/5">
      <div className="flex items-center gap-4">
        <div className="relative">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-accent/20 group-hover:border-accent/40 transition-colors duration-300" style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.08) 0%, rgba(255, 152, 0, 0.02) 100%)'
          }}>
            <Icon name={ritual.icon as any} size={22} className="sm:!w-6 sm:!h-6 group-hover:scale-110 transition-transform duration-300" style={{color: '#ff9800', strokeWidth: 2.5}} />
          </div>
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1 group-hover:text-accent transition-colors duration-300 truncate">{ritual.title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed group-hover:text-foreground/80 transition-colors duration-300">{ritual.description}</p>
        </div>
        <div className="flex-shrink-0">
          <Icon name="ChevronRight" size={18} className="text-muted-foreground group-hover:text-accent group-hover:translate-x-1 transition-all duration-300" />
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
      <h2 className="text-xl font-bold text-foreground mb-6 relative">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
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
            className="w-full border-accent/50 text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 rounded-xl py-3 font-medium group"
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