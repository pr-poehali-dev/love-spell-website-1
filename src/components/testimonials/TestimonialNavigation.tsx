import Icon from '@/components/ui/icon';

interface TestimonialNavigationProps {
  currentTestimonial: number;
  totalTestimonials: number;
  isTransitioning: boolean;
  onPrevTestimonial: () => void;
  onNextTestimonial: () => void;
  onGoToTestimonial: (index: number) => void;
}

export default function TestimonialNavigation({
  currentTestimonial,
  totalTestimonials,
  isTransitioning,
  onPrevTestimonial,
  onNextTestimonial,
  onGoToTestimonial
}: TestimonialNavigationProps) {
  return (
    <div className="flex items-center justify-between mb-6 sm:mb-8">
      {/* Кнопка назад */}
      <button
        onClick={onPrevTestimonial}
        disabled={isTransitioning}
        className="p-2 sm:p-3 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label="Предыдущий отзыв"
      >
        <Icon name="ChevronLeft" size={18} className="sm:w-5 sm:h-5" />
      </button>

      {/* Индикаторы */}
      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalTestimonials }, (_, index) => (
          <button
            key={index}
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onGoToTestimonial(index);
            }}
            disabled={isTransitioning}
            className={`relative w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30 overflow-hidden ${
              index === currentTestimonial 
                ? 'bg-accent scale-110 shadow-lg shadow-accent/20' 
                : 'bg-accent/30 hover:bg-accent/50 hover:scale-105'
            } ${isTransitioning ? 'animate-pulse' : ''}`}
          />
        ))}
      </div>

      {/* Кнопка вперед */}
      <button
        onClick={onNextTestimonial}
        disabled={isTransitioning}
        className="p-2 sm:p-3 rounded-full bg-card border border-border/50 text-muted-foreground hover:text-foreground hover:bg-accent/5 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-accent/30"
        aria-label="Следующий отзыв"
      >
        <Icon name="ChevronRight" size={18} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
}