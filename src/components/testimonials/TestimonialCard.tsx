import { useRef, useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface Testimonial {
  text: string;
  name: string;
  location: string;
  initial: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
  isExpanded: boolean;
  isTransitioning: boolean;
  maxTextLength: number;
  cardHeight: {
    collapsed: string;
    expanded: string;
  };
  onToggleExpanded: () => void;
  onTouchStart: (e: React.TouchEvent) => void;
  onTouchMove: (e: React.TouchEvent) => void;
  onTouchEnd: () => void;
}

export default function TestimonialCard({
  testimonial,
  isExpanded,
  isTransitioning,
  maxTextLength,
  cardHeight,
  onToggleExpanded,
  onTouchStart,
  onTouchMove,
  onTouchEnd
}: TestimonialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Управление анимацией расширения
  useEffect(() => {
    if (isExpanded !== isAnimating) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        setIsAnimating(false);
      }, 700); // Длительность анимации
      return () => clearTimeout(timer);
    }
  }, [isExpanded, isAnimating]);

  const shouldTruncateText = (text: string) => {
    return text.length > maxTextLength;
  };

  const getTruncatedText = (text: string) => {
    if (text.length <= maxTextLength) {
      return { visibleText: text, hiddenText: null };
    }
    
    // Умная обрезка - ищем последнее предложение или точку
    const truncated = text.slice(0, maxTextLength);
    const lastSentence = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    let cutPoint = maxTextLength;
    if (lastSentence > maxTextLength - 50) {
      cutPoint = lastSentence + 1;
    } else if (lastSpace > 0) {
      cutPoint = lastSpace;
    }
    
    const visibleText = text.slice(0, cutPoint);
    const hiddenText = text.slice(cutPoint);
    
    if (isExpanded) {
      return { visibleText, hiddenText };
    } else {
      return { 
        visibleText: visibleText + (hiddenText ? '...' : ''), 
        hiddenText: null 
      };
    }
  };

  const shouldShowReadMore = (text: string) => {
    return text.length > maxTextLength && !isExpanded;
  };

  return (
    <div className="relative w-full">
      <div 
        ref={containerRef}
        className={`relative bg-gradient-to-br from-card to-muted/20 rounded-2xl sm:rounded-3xl border border-border/50 mb-6 sm:mb-8 hover:shadow-lg hover:shadow-black/5 hover:border-border/70 w-full transition-all duration-700 ease-in-out ${
          isExpanded 
            ? `max-h-[200vh] overflow-y-auto` 
            : `${cardHeight.collapsed} overflow-hidden`
        }`}
      >
        {/* Внутренняя карточка отзыва с анимациями */}
        <div 
          className={`p-4 sm:p-6 md:p-8 flex flex-col relative cursor-grab active:cursor-grabbing select-none transition-all duration-300 ${
            isExpanded ? 'h-auto' : 'h-full'
          }`}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
        
        {/* Текст отзыва */}
        <div className="flex-1 flex flex-col justify-center">
          <div 
            className={`relative transition-all duration-400 ease-out ${
              isTransitioning ? 'opacity-0 transform translate-y-3 scale-98' : 'opacity-100 transform translate-y-0 scale-100'
            }`}
          >
            {/* Открывающая скобка */}
            <span className="absolute -left-1 sm:-left-2 -top-1 text-2xl sm:text-3xl font-serif text-accent/30 select-none pointer-events-none">"</span>
            
            {/* Основной текст */}
            <div className="px-3 sm:px-6 py-2">
              <div className="space-y-3">
                <div className="relative">
                  {(() => {
                    const { visibleText, hiddenText } = getTruncatedText(testimonial.text);
                    return (
                      <div className={`text-sm sm:text-base leading-relaxed text-muted-foreground italic transition-all duration-300 ease-out ${
                        isExpanded ? 'text-left' : 'text-center'
                      }`}>
                        <p className="mb-0">
                          {visibleText}
                        </p>
                        {hiddenText && (
                          <div 
                            className={`transition-all duration-700 ease-in-out ${
                              isExpanded 
                                ? 'opacity-100 transform translate-y-0 max-h-[500px]' 
                                : 'opacity-0 transform translate-y-2 max-h-0'
                            } overflow-hidden`}
                          >
                            <p className="mt-0">{hiddenText}</p>
                          </div>
                        )}
                      </div>
                    );
                  })()}
                </div>
                
                {/* Кнопка "Читать далее" с иконкой */}
                {shouldShowReadMore(testimonial.text) && (
                  <div className={`text-center mt-3 sm:mt-4 transition-all duration-300 ${
                    isAnimating ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                  }`}>
                    <button
                      onClick={onToggleExpanded}
                      disabled={isTransitioning || isAnimating}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:bg-accent/10 focus:outline-none focus:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                      style={{ color: '#ff9800' }}
                    >
                      Читать далее
                      <Icon name="ChevronDown" size={14} className="sm:w-4 sm:h-4 transition-transform duration-200 group-hover:translate-y-0.5" />
                    </button>
                  </div>
                )}
                
                {/* Кнопка "Свернуть" с иконкой */}
                {isExpanded && shouldTruncateText(testimonial.text) && (
                  <div className={`text-center mt-3 sm:mt-4 transition-all duration-300 delay-300 ${
                    isExpanded && !isAnimating ? 'opacity-100 transform scale-100' : 'opacity-0 transform scale-95'
                  }`}>
                    <button
                      onClick={onToggleExpanded}
                      disabled={isTransitioning || isAnimating}
                      className="inline-flex items-center gap-1 text-xs sm:text-sm font-medium px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg transition-all duration-200 hover:bg-accent/10 focus:outline-none focus:bg-accent/10 disabled:opacity-50 disabled:cursor-not-allowed group"
                      style={{ color: '#ff9800' }}
                    >
                      Свернуть
                      <Icon name="ChevronUp" size={14} className="sm:w-4 sm:h-4 transition-transform duration-200 group-hover:-translate-y-0.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {/* Закрывающая скобка */}
            <span className="absolute -right-1 sm:-right-2 -bottom-1 text-2xl sm:text-3xl font-serif text-accent/30 select-none pointer-events-none">"</span>
          </div>
        </div>

        {/* Автор */}
        <div 
          className={`flex flex-col items-center pt-4 sm:pt-6 border-t border-border/30 mt-4 transition-all duration-400 ease-in-out ${
            isTransitioning ? 'opacity-0 transform scale-95 translate-y-2' : 'opacity-100 transform scale-100 translate-y-0'
          }`}
        >
          <div 
            className="w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold border-2 mb-2"
            style={{ 
              color: '#ff9800',
              borderColor: '#ff9800',
              backgroundColor: 'transparent'
            }}
          >
            {testimonial.initial}
          </div>
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
            {testimonial.name}
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground">
            {testimonial.location}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}