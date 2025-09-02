import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import ReviewModal from '@/components/ReviewModal';

const testimonials = [
  {
    text: "Нужна была срочная помощь, не знала к кому обратиться, нашла этот сайт, написала по контактам Раисе, долго мы с ней переписывались, в итоге Раиса дала некоторые указания - как и когда мне их выполнить. Сразу эффект не наступил, так как я в некоторых моментах сделала что то не правильно, Раиса на это отреагировала к стати спокойно, и просто попросила меня немного изменить проводимый обряд, после чего, в течении не могу сказать точно сколько дней, наверное дней 15 наступил долгожданный результат. Спасибо вам Раиса еще раз, во первых за то что так трепетно относитесь к чужим проблемам, а так же спасибо за поддержку, после ваших слов сразу становиться легче на душе!",
    name: "Валерия",
    location: "Пермь",
    initial: "В"
  },
  {
    text: "Обратилась к Раисе с проблемой в отношениях. Очень переживала, что ничего не получится. Но Раиса меня успокоила, объяснила что нужно делать, поддерживала на протяжении всего времени. Результат пришел через месяц - мой мужчина вернулся! Спасибо огромное за помощь и терпение!",
    name: "Анна",
    location: "Москва", 
    initial: "А"
  },
  {
    text: "Долго сомневалась, стоит ли обращаться. Но проблемы в семье становились все серьезнее. Раиса очень деликатно подошла к моей ситуации, дала четкие рекомендации. Сейчас в доме мир и покой. Очень благодарна за профессиональную помощь!",
    name: "Елена",
    location: "Санкт-Петербург",
    initial: "Е"
  },
  {
    text: "Обращался по работе - никак не мог получить повышение. Раиса провела обряд на удачу в делах. Через три недели меня назначили на новую должность с хорошей прибавкой к зарплате. Рекомендую всем, кто нуждается в помощи!",
    name: "Дмитрий", 
    location: "Екатеринбург",
    initial: "Д"
  },
  {
    text: "Была в отчаянии из-за проблем со здоровьем у ребенка. Врачи разводили руками. Раиса помогла, сделала защитный обряд. Сын стал чувствовать себя лучше, анализы улучшились. Безграничная благодарность за помощь моей семье!",
    name: "Марина",
    location: "Новосибирск", 
    initial: "М"
  }
];

const videoTestimonials = [
  {
    title: "Видео благодарность от Марии",
    thumbnail: "https://cdn.poehali.dev/files/9b8b6441-8764-40fc-859c-180dbcd877bc.png"
  }
];

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [cardHeight, setCardHeight] = useState(450);

  // Простой расчет высоты карточки под самый длинный отзыв
  const getMaxCardHeight = () => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 640;
    
    // Находим самый длинный отзыв
    const maxTextLength = Math.max(...testimonials.map(t => t.text.length));
    
    // Простая формула: базовая высота + дополнительная высота для текста
    const baseHeight = isMobile ? 320 : 380; // уменьшенная базовая высота для UI элементов
    const textHeight = Math.ceil(maxTextLength / (isMobile ? 50 : 70)) * (isMobile ? 25 : 30); // высота для текста
    
    return baseHeight + textHeight;
  };

  // Рассчитываем точную позицию для размещения точек навигации после города "Пермь"
  const getNavigationPosition = () => {
    const isVerySmall = typeof window !== 'undefined' && window.innerWidth <= 375; // iPhone 5s, SE
    const isSmall = typeof window !== 'undefined' && window.innerWidth < 640;
    const isMedium = typeof window !== 'undefined' && window.innerWidth < 1024;
    
    // Место для нижней части секции автора (после города "Пермь")
    const authorBottomSpace = isVerySmall ? 25 : isSmall ? 35 : isMedium ? 40 : 45;
    return authorBottomSpace;
  };

  // Состояния для свайпа
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  // Пересчитываем высоту при изменении размера экрана
  useEffect(() => {
    const updateHeight = () => {
      setCardHeight(getMaxCardHeight());
    };
    
    updateHeight(); // Инициальный расчет
    window.addEventListener('resize', updateHeight);
    
    return () => window.removeEventListener('resize', updateHeight);
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
    
    // Сохраняем и фиксируем позицию скролла
    const scrollY = window.scrollY;
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      // Принудительно восстанавливаем позицию
      window.scrollTo(0, scrollY);
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.scrollBehavior = '';
      }, 100);
    }, 250);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    // Сохраняем и фиксируем позицию скролла
    const scrollY = window.scrollY;
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      // Принудительно восстанавливаем позицию
      window.scrollTo(0, scrollY);
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.scrollBehavior = '';
      }, 100);
    }, 250);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    
    // Сохраняем и фиксируем позицию скролла
    const scrollY = window.scrollY;
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    setTimeout(() => {
      setCurrentTestimonial(index);
      // Принудительно восстанавливаем позицию
      window.scrollTo(0, scrollY);
      setTimeout(() => {
        setIsTransitioning(false);
        document.body.style.scrollBehavior = '';
      }, 100);
    }, 250);
  };

  // Обработчики свайпов
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextTestimonial();
    }
    if (isRightSwipe) {
      prevTestimonial();
    }
  };

  return (
    <div className="py-8 sm:py-12 md:py-16 lg:py-20 px-2 sm:px-3 lg:px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Отзывы */}
        <div className="mb-12 sm:mb-16 md:mb-20">
          <h2 className="text-xl font-bold text-foreground mb-6 relative">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>тзывы и благодарности
          </h2>

          {/* Карусель отзывов с свайпом */}
          <div 
            className="relative bg-gradient-to-br from-card to-muted/20 rounded-2xl sm:rounded-3xl border border-border/50 mb-6 sm:mb-8 overflow-hidden cursor-grab active:cursor-grabbing select-none"
            style={{ height: `${cardHeight}px` }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Единый блок с отзывом и автором */}
            <div 
              className={`absolute inset-0 p-3 sm:p-4 flex flex-col transition-all duration-500 ease-in-out ${
                isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
              }`}
            >
              {/* Текст отзыва с красивыми кавычками - сверху */}
              <div className="mb-6">
                <div className="relative max-w-4xl mx-auto w-full">
                  {/* Открывающая кавычка */}
                  <span className="absolute -left-2 sm:-left-4 -top-2 text-3xl sm:text-4xl md:text-5xl font-serif text-accent/40 select-none pointer-events-none">«</span>
                  
                  {/* Полный текст отзыва */}
                  <div className="px-4 sm:px-6">
                    <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground italic py-2 sm:py-4">
                      {testimonials[currentTestimonial].text}
                    </p>
                  </div>
                  
                  {/* Закрывающая кавычка */}
                  <span className="absolute -right-2 sm:-right-4 -bottom-2 text-3xl sm:text-4xl md:text-5xl font-serif text-accent/40 select-none pointer-events-none">»</span>
                </div>
              </div>

              {/* Автор - сразу после отзыва */}
              <div className="flex flex-col items-center">
                <div 
                  className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center text-lg sm:text-xl font-bold mb-2 sm:mb-3"
                  style={{ 
                    color: '#ff9800',
                    backgroundColor: 'rgba(255, 152, 0, 0.1)'
                  }}
                >
                  {testimonials[currentTestimonial].initial}
                </div>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-1">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>

            {/* Навигационные точки - фиксированная позиция после самого длинного отзыва */}
            <div 
              className="absolute left-1/2 transform -translate-x-1/2 z-10"
              style={{ bottom: `${getNavigationPosition()}px` }}
            >
              <div className="flex justify-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-3 py-2 shadow-sm">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      goToTestimonial(index);
                    }}
                    disabled={isTransitioning}
                    className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent/50 ${
                      index === currentTestimonial 
                        ? 'bg-accent scale-125 shadow-sm' 
                        : 'bg-accent/40 hover:bg-accent/60 hover:scale-110'
                    }`}
                    aria-label={`Перейти к отзыву ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>


        </div>

        {/* Видео благодарности */}
        <div>
          <h2 className="text-xl font-bold text-foreground mb-6 relative">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>В</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>идео благодарности
          </h2>

          <div className="flex justify-center mb-12">
            {videoTestimonials.map((video, index) => (
              <div 
                key={index}
                className="relative group cursor-pointer max-w-md w-full"
              >
                <div 
                  className="aspect-video rounded-2xl overflow-hidden relative"
                  style={{
                    background: 'linear-gradient(135deg, rgb(255, 152, 0) 0%, rgb(255, 120, 0) 100%)'
                  }}
                >
                  {/* Иконки сообщений */}
                  <div className="absolute top-4 left-1/2 -translate-x-1/2">
                    <Icon name="MessageCircle" size={40} className="text-white/80" />
                  </div>
                  
                  {/* Заголовок */}
                  <div className="absolute inset-x-4 top-16">
                    <h3 className="text-white font-bold text-lg text-center">
                      {video.title}
                    </h3>
                  </div>

                  {/* Кнопка воспроизведения */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 hover:bg-white transition-colors rounded-full flex items-center justify-center group-hover:scale-110 transform duration-300">
                      <Icon name="Play" size={18} className="text-accent ml-0.5" />
                    </div>
                  </div>

                  {/* Градиентный оверлей */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            ))}
          </div>

          {/* Кнопка добавить отзыв */}
          <div className="text-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgb(255, 152, 0) 0%, rgb(255, 120, 0) 100%)',
                color: 'white'
              }}
            >
              <Icon name="MessageCircle" size={16} />
              Добавить отзыв
            </button>
          </div>
        </div>
      </div>
      
      {/* Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}