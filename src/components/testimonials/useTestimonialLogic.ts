import { useState, useEffect, useRef } from 'react';

interface Testimonial {
  text: string;
  name: string;
  location: string;
  initial: string;
}

interface UseTestimonialLogicProps {
  testimonials: Testimonial[];
  isModalOpen: boolean;
}

export function useTestimonialLogic({ testimonials, isModalOpen }: UseTestimonialLogicProps) {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  // Адаптивные высоты карточек
  const getCardHeight = () => {
    if (typeof window === 'undefined') return { collapsed: 'h-[420px]', expanded: 'min-h-[500px]' };
    
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    
    if (isMobile) {
      return {
        collapsed: 'h-[380px]',
        expanded: 'min-h-[450px] max-h-[80vh]'
      };
    } else if (isTablet) {
      return {
        collapsed: 'h-[420px]',
        expanded: 'min-h-[500px] max-h-[75vh]'
      };
    } else {
      return {
        collapsed: 'h-[450px]',
        expanded: 'min-h-[550px] max-h-[70vh]'
      };
    }
  };

  const [cardHeight, setCardHeight] = useState(getCardHeight());

  // Обновляем высоты при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      setCardHeight(getCardHeight());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Адаптивная логика показа текста
  const getMaxTextLength = () => {
    if (typeof window === 'undefined') return 180;
    
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;
    
    if (isMobile) {
      return 140; // Меньше текста для мобильных
    } else if (isTablet) {
      return 160; // Средне для планшетов
    } else {
      return 200; // Больше для десктопов
    }
  };

  const [maxTextLength, setMaxTextLength] = useState(getMaxTextLength());

  // Обновляем максимальную длину при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      setMaxTextLength(getMaxTextLength());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Автоперелистывание каждые 15 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen && !isTransitioning) {
        nextTestimonial();
      }
    }, 15000);

    return () => clearInterval(interval);
  }, [isModalOpen, isTransitioning]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    
    const wasExpanded = expandedTestimonials.size > 0;
    setIsTransitioning(true);
    
    if (wasExpanded) {
      // Сначала свертываем отзыв
      setExpandedTestimonials(new Set());
      
      // Скроллим к началу карточки
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const cardTop = rect.top + scrollTop - 100;
        window.scrollTo({ 
          top: cardTop, 
          behavior: 'smooth' 
        });
      }
      
      // Ждем окончания анимации свертывания, затем переключаем отзыв
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 600);
    } else {
      // Обычное переключение без анимации свертывания
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    const wasExpanded = expandedTestimonials.size > 0;
    setIsTransitioning(true);
    
    if (wasExpanded) {
      // Сначала свертываем отзыв
      setExpandedTestimonials(new Set());
      
      // Скроллим к началу карточки
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const cardTop = rect.top + scrollTop - 100;
        window.scrollTo({ 
          top: cardTop, 
          behavior: 'smooth' 
        });
      }
      
      // Ждем окончания анимации свертывания, затем переключаем отзыв
      setTimeout(() => {
        setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 600);
    } else {
      // Обычное переключение без анимации свертывания
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    
    const wasExpanded = expandedTestimonials.size > 0;
    setIsTransitioning(true);
    
    if (wasExpanded) {
      // Сначала свертываем отзыв
      setExpandedTestimonials(new Set());
      
      // Скроллим к началу карточки
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const cardTop = rect.top + scrollTop - 100;
        window.scrollTo({ 
          top: cardTop, 
          behavior: 'smooth' 
        });
      }
      
      // Ждем окончания анимации свертывания, затем переключаем отзыв
      setTimeout(() => {
        setCurrentTestimonial(index);
        setTimeout(() => {
          setIsTransitioning(false);
        }, 300);
      }, 600);
    } else {
      // Обычное переключение без анимации свертывания
      setCurrentTestimonial(index);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const toggleExpanded = (index: number) => {
    setExpandedTestimonials(prev => {
      const newSet = new Set(prev);
      const isExpanding = !newSet.has(index);
      
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
        
        // Для мобильных устройств при раскрытии скроллим к началу карточки
        if (isExpanding && containerRef.current && window.innerWidth < 768) {
          setTimeout(() => {
            const rect = containerRef.current!.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const cardTop = rect.top + scrollTop - 20;
            window.scrollTo({ 
              top: cardTop, 
              behavior: 'smooth' 
            });
          }, 100);
        }
      }
      return newSet;
    });
  };

  // Функции для свайпов
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };

  return {
    currentTestimonial,
    isTransitioning,
    expandedTestimonials,
    cardHeight,
    maxTextLength,
    containerRef,
    nextTestimonial,
    prevTestimonial,
    goToTestimonial,
    toggleExpanded,
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}