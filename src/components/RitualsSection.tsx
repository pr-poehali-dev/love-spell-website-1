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

export default function RitualsSection({ showMoreRituals, setShowMoreRituals }: RitualsSectionProps) {
  const visibleRituals = showMoreRituals ? ritualCards : ritualCards.slice(0, 4);
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
      
      <div className="space-y-4">
        {/* Ritual Cards */}
        {visibleRituals.slice(0, 4).map((ritual, index) => (
          <div key={index} className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
            boxShadow: 'none'
          }} onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
          }} onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
          }}>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
              }}>
                <Icon name={ritual.icon as any} size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">{ritual.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ritual.description}</p>
              </div>
              <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
            </div>
          </div>
        ))}

        {/* Hidden Rituals */}
        {showMoreRituals && (
          <>
            {hiddenRituals.map((ritual, index) => (
              <div key={index + 4} className="border border-border rounded-lg p-4 hover:bg-muted/20 hover:shadow-lg transition-all duration-300 cursor-pointer group" style={{
                boxShadow: 'none'
              }} onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(255, 152, 0, 0.2)';
              }} onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
              }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transform-gpu" style={{
                    background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.15) 0%, rgba(255, 152, 0, 0.03) 100%)'
                  }}>
                    <Icon name={ritual.icon as any} size={24} className="sm:!w-7 sm:!h-7" style={{color: '#ff9800', strokeWidth: 2}} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">{ritual.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{ritual.description}</p>
                  </div>
                  <Icon name="ChevronRight" size={20} className="text-muted-foreground group-hover:text-accent transition-colors" />
                </div>
              </div>
            ))}
          </>
        )}

        {/* Show More Button */}
        <div className="pt-4">
          <Button 
            variant="outline" 
            className="w-full border-accent text-accent hover:bg-accent hover:text-white transition-all duration-300"
            onClick={() => setShowMoreRituals(!showMoreRituals)}
          >
            {showMoreRituals ? 'Скрыть' : 'Показать больше'}
            <Icon name={showMoreRituals ? 'ChevronUp' : 'ChevronDown'} size={16} className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}