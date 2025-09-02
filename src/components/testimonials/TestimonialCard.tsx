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
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
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
  onTouchEnd,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur
}: TestimonialCardProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  // Функция для обрезки текста (объявляем до useState)
  const getTruncatedText = (text: string) => {
    if (text.length <= maxTextLength) {
      return text; // Короткий текст показываем полностью
    }
    if (isExpanded) {
      return text; // При раскрытии показываем ВЕСЬ текст
    }
    // Умная обрезка - ищем последнее предложение или точку
    const truncated = text.slice(0, maxTextLength);
    const lastSentence = truncated.lastIndexOf('.');
    const lastSpace = truncated.lastIndexOf(' ');
    
    if (lastSentence > maxTextLength - 50) {
      return text.slice(0, lastSentence + 1); // Обрезаем по предложению
    } else if (lastSpace > 0) {
      return text.slice(0, lastSpace) + '...'; // Обрезаем по слову
    }
    return truncated + '...'; // Стандартная обрезка
  };

  const shouldTruncateText = (text: string) => {
    return text.length > maxTextLength;
  };

  const shouldShowReadMore = (text: string) => {
    return text.length > maxTextLength && !isExpanded;
  };

  // Состояние для синхронизации анимации градиента
  const [showGradient, setShowGradient] = useState(!isExpanded && shouldTruncateText(testimonial.text));

  // Синхронизируем градиент с анимацией высоты
  useEffect(() => {
    if (isExpanded) {
      // При раскрытии: убираем градиент через 200ms (середина анимации)
      const timer = setTimeout(() => {
        setShowGradient(false);
      }, 200);
      return () => clearTimeout(timer);
    } else {
      // При сворачивании: показываем градиент сразу
      if (shouldTruncateText(testimonial.text)) {
        setShowGradient(true);
      }
    }
  }, [isExpanded, testimonial.text]);

  return (
    <div className="relative w-full">
      <div 
        ref={containerRef}
        className={`relative bg-gradient-to-br from-card to-muted/20 rounded-2xl sm:rounded-3xl border border-border/50 mb-6 sm:mb-8 hover:shadow-lg hover:shadow-black/5 hover:border-border/70 w-full transition-all duration-500 ease-in-out ${
          isExpanded 
            ? '' 
            : cardHeight.collapsed
        }`}
        style={{
          overflow: isExpanded ? 'visible' : 'hidden'
        }}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onFocus={onFocus}
        onBlur={onBlur}
        tabIndex={0}
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
                  <div className="relative">
                    <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded ? 'max-h-[2000px]' : 'max-h-[120px]'
                    }`}>
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground italic text-left">
                        {testimonial.text}
                      </p>
                    </div>
                    {/* Градиент для плавного затухания текста */}
                    {shouldTruncateText(testimonial.text) && (
                      <div className={`absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-card via-card/80 to-transparent pointer-events-none transition-opacity duration-500 ease-in-out ${
                        showGradient ? 'opacity-100' : 'opacity-0'
                      }`}></div>
                    )}
                  </div>
                </div>
                
                {/* Кнопка "Читать далее" с иконкой */}
                {!isExpanded && shouldTruncateText(testimonial.text) && (
                  <div className="text-center mt-3 sm:mt-4">
                    <button
                      onClick={onToggleExpanded}
                      disabled={isTransitioning}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      Читать далее
                      <Icon name="ChevronDown" size={14} className="transition-transform duration-200 group-hover:translate-y-0.5" />
                    </button>
                  </div>
                )}
                
                {/* Кнопка "Свернуть" с иконкой */}
                {isExpanded && shouldTruncateText(testimonial.text) && (
                  <div className="text-center mt-3 sm:mt-4">
                    <button
                      onClick={onToggleExpanded}
                      disabled={isTransitioning}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-medium px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-primary/10 text-primary border border-primary/20 transition-all duration-200 hover:bg-primary/15 hover:border-primary/30 focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                      Свернуть
                      <Icon name="ChevronUp" size={14} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
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
        <div className={`flex flex-col items-center pt-4 sm:pt-6 border-t border-border/30 mt-auto transition-all duration-400 ease-in-out ${
          isTransitioning 
            ? 'opacity-0 transform scale-95 translate-y-2 blur-sm' 
            : 'opacity-100 transform scale-100 translate-y-0 blur-none'
        }`}>
          <div 
            className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-base sm:text-lg font-bold border-2 mb-2 text-primary border-primary/30 bg-primary/5 backdrop-blur-sm transition-all duration-300 ease-in-out ${
              isTransitioning 
                ? 'transform rotate-12 scale-90' 
                : 'transform rotate-0 scale-100'
            }`}
          >
            {testimonial.initial}
          </div>
          <h3 className={`text-sm sm:text-base font-semibold text-foreground mb-1 transition-all duration-350 ease-in-out ${
            isTransitioning 
              ? 'transform translate-x-2 opacity-0' 
              : 'transform translate-x-0 opacity-100'
          }`}>
            {testimonial.name}
          </h3>
          <p className={`text-xs sm:text-sm text-muted-foreground transition-all duration-300 ease-in-out ${
            isTransitioning 
              ? 'transform translate-x-3 opacity-0' 
              : 'transform translate-x-0 opacity-100'
          }`}>
            {testimonial.location}
          </p>
        </div>
        </div>
      </div>
    </div>
  );
}