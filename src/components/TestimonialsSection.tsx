import { useState, useEffect, useRef } from 'react';
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
  const [expandedTestimonials, setExpandedTestimonials] = useState<Set<number>>(new Set());
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [fixedCardHeight, setFixedCardHeight] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Фиксированная высота для предотвращения скролла
  const CARD_HEIGHT = {
    mobile: 450, // px для мобильных
    desktop: 500 // px для десктопов
  };

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
    
    // Сохраняем позицию скролла ДО любых изменений
    const scrollY = window.scrollY;
    const currentScrollBehavior = document.documentElement.style.scrollBehavior;
    
    // Блокируем плавный скролл
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    // Если есть раскрытый отзыв, сначала плавно свертываем его
    if (expandedTestimonials.size > 0) {
      // Сбрасываем фиксированную высоту для плавного свертывания
      setFixedCardHeight(null);
      
      // Плавное свертывание
      setExpandedTestimonials(new Set());
      
      // Ждем завершения анимации свертывания, затем переключаем
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY, behavior: 'auto' });
          
          setTimeout(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
            
            requestAnimationFrame(() => {
              window.scrollTo({ top: scrollY, behavior: 'auto' });
              
              setTimeout(() => {
                setIsTransitioning(false);
                document.documentElement.style.scrollBehavior = currentScrollBehavior;
                document.body.style.scrollBehavior = '';
              }, 100);
            });
          }, 200);
        });
      }, 300); // Ждем анимацию свертывания
    } else {
      // Нет раскрытых отзывов, переключаем сразу
      setExpandedTestimonials(new Set());
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
        
        setTimeout(() => {
          setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
          
          requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY, behavior: 'auto' });
            
            setTimeout(() => {
              setIsTransitioning(false);
              document.documentElement.style.scrollBehavior = currentScrollBehavior;
              document.body.style.scrollBehavior = '';
            }, 100);
          });
        }, 250);
      });
    }
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    
    // Сохраняем позицию скролла ДО любых изменений
    const scrollY = window.scrollY;
    const currentScrollBehavior = document.documentElement.style.scrollBehavior;
    
    // Блокируем плавный скролл
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    // Если есть раскрытый отзыв, сначала плавно свертываем его
    if (expandedTestimonials.size > 0) {
      // Сбрасываем фиксированную высоту для плавного свертывания
      setFixedCardHeight(null);
      
      // Плавное свертывание
      setExpandedTestimonials(new Set());
      
      // Ждем завершения анимации свертывания, затем переключаем
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY, behavior: 'auto' });
          
          setTimeout(() => {
            setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
            
            requestAnimationFrame(() => {
              window.scrollTo({ top: scrollY, behavior: 'auto' });
              
              setTimeout(() => {
                setIsTransitioning(false);
                document.documentElement.style.scrollBehavior = currentScrollBehavior;
                document.body.style.scrollBehavior = '';
              }, 100);
            });
          }, 200);
        });
      }, 300); // Ждем анимацию свертывания
    } else {
      // Нет раскрытых отзывов, переключаем сразу
      setExpandedTestimonials(new Set());
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
        
        setTimeout(() => {
          setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
          
          requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY, behavior: 'auto' });
            
            setTimeout(() => {
              setIsTransitioning(false);
              document.documentElement.style.scrollBehavior = currentScrollBehavior;
              document.body.style.scrollBehavior = '';
            }, 100);
          });
        }, 250);
      });
    }
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    
    // Сохраняем позицию скролла ДО любых изменений
    const scrollY = window.scrollY;
    const currentScrollBehavior = document.documentElement.style.scrollBehavior;
    
    // Блокируем плавный скролл
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    setIsTransitioning(true);
    
    // Если есть раскрытый отзыв, сначала плавно свертываем его
    if (expandedTestimonials.size > 0) {
      // Сбрасываем фиксированную высоту для плавного свертывания
      setFixedCardHeight(null);
      
      // Плавное свертывание
      setExpandedTestimonials(new Set());
      
      // Ждем завершения анимации свертывания, затем переключаем
      setTimeout(() => {
        requestAnimationFrame(() => {
          window.scrollTo({ top: scrollY, behavior: 'auto' });
          
          setTimeout(() => {
            setCurrentTestimonial(index);
            
            requestAnimationFrame(() => {
              window.scrollTo({ top: scrollY, behavior: 'auto' });
              
              setTimeout(() => {
                setIsTransitioning(false);
                document.documentElement.style.scrollBehavior = currentScrollBehavior;
                document.body.style.scrollBehavior = '';
              }, 100);
            });
          }, 200);
        });
      }, 300); // Ждем анимацию свертывания
    } else {
      // Нет раскрытых отзывов, переключаем сразу
      setExpandedTestimonials(new Set());
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
        
        setTimeout(() => {
          setCurrentTestimonial(index);
          
          requestAnimationFrame(() => {
            window.scrollTo({ top: scrollY, behavior: 'auto' });
            
            setTimeout(() => {
              setIsTransitioning(false);
              document.documentElement.style.scrollBehavior = currentScrollBehavior;
              document.body.style.scrollBehavior = '';
            }, 100);
          });
        }, 250);
      });
    }
  };

  // Функции для "Читать далее"
  const MAX_TEXT_LENGTH = 400; // Максимальная длина текста без "Читать далее" (только для очень длинных)
  
  const toggleExpanded = (index: number) => {
    // Сохраняем позицию скролла ДО изменений
    const scrollY = window.scrollY;
    const currentScrollBehavior = document.documentElement.style.scrollBehavior;
    
    // Фиксируем текущую высоту карточки при первом раскрытии
    if (!fixedCardHeight && containerRef.current) {
      const currentHeight = containerRef.current.offsetHeight;
      setFixedCardHeight(currentHeight);
    }
    
    // Временно блокируем плавный скролл
    document.documentElement.style.scrollBehavior = 'auto';
    document.body.style.scrollBehavior = 'auto';
    
    const newExpanded = new Set(expandedTestimonials);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
      // При раскрытии фиксируем высоту карточки
      if (containerRef.current) {
        const expandedHeight = containerRef.current.scrollHeight + 100; // добавляем запас для длинного текста
        setFixedCardHeight(expandedHeight);
      }
    }
    
    setExpandedTestimonials(newExpanded);
    
    // Множественная фиксация позиции для надежности
    requestAnimationFrame(() => {
      window.scrollTo({ top: scrollY, behavior: 'auto' });
      
      requestAnimationFrame(() => {
        window.scrollTo({ top: scrollY, behavior: 'auto' });
        
        // Восстанавливаем поведение скролла через небольшую задержку
        setTimeout(() => {
          document.documentElement.style.scrollBehavior = currentScrollBehavior;
          document.body.style.scrollBehavior = '';
        }, 100);
      });
    });
  };

  const getTruncatedText = (text: string, index: number) => {
    const isExpanded = expandedTestimonials.has(index);
    if (isExpanded || text.length <= MAX_TEXT_LENGTH) {
      return text;
    }
    return text.slice(0, MAX_TEXT_LENGTH) + '...';
  };

  const shouldShowReadMore = (text: string, index: number) => {
    return text.length > MAX_TEXT_LENGTH && !expandedTestimonials.has(index);
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

  return (
    <div className="bg-background">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Отзывы */}
        <div className="mb-12 sm:mb-16">
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

          {/* Карусель отзывов */}
          <div 
            ref={containerRef}
            className="relative bg-gradient-to-br from-card to-muted/20 rounded-2xl sm:rounded-3xl border border-border/50 mb-6 sm:mb-8 cursor-grab active:cursor-grabbing select-none transition-all duration-300"
            style={{ 
              height: fixedCardHeight ? `${fixedCardHeight}px` : 'auto',
              minHeight: fixedCardHeight ? 'unset' : '400px'
            }}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="p-4 sm:p-6 md:p-8 flex flex-col h-full">
              
              {/* Текст отзыва */}
              <div className="flex-1 flex flex-col justify-center">
                <div 
                  className={`relative transition-all duration-500 ease-in-out ${
                    isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
                  }`}
                >
                  {/* Открывающая скобка */}
                  <span className="absolute -left-1 sm:-left-2 -top-1 text-2xl sm:text-3xl font-serif text-accent/30 select-none pointer-events-none">"</span>
                  
                  {/* Основной текст */}
                  <div className="px-3 sm:px-6 py-2">
                    <div className="space-y-3">
                      <p className="text-sm sm:text-base leading-relaxed text-muted-foreground italic text-center">
                        {getTruncatedText(testimonials[currentTestimonial].text, currentTestimonial)}
                      </p>
                      
                      {/* Кнопка "Читать далее" */}
                      {shouldShowReadMore(testimonials[currentTestimonial].text, currentTestimonial) && (
                        <div className="text-center mt-3">
                          <button
                            onClick={() => toggleExpanded(currentTestimonial)}
                            className="inline-block text-sm font-medium px-3 py-1 rounded-md transition-all duration-200 hover:bg-accent/10 focus:outline-none focus:bg-accent/10"
                            style={{ color: '#ff9800' }}
                          >
                            Читать далее
                          </button>
                        </div>
                      )}
                      
                      {/* Кнопка "Свернуть" */}
                      {expandedTestimonials.has(currentTestimonial) && testimonials[currentTestimonial].text.length > MAX_TEXT_LENGTH && (
                        <div className="text-center mt-3">
                          <button
                            onClick={() => toggleExpanded(currentTestimonial)}
                            className="inline-block text-sm font-medium px-3 py-1 rounded-md transition-all duration-200 hover:bg-accent/10 focus:outline-none focus:bg-accent/10"
                            style={{ color: '#ff9800' }}
                          >
                            Свернуть
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
                className={`flex flex-col items-center pt-4 sm:pt-6 border-t border-border/30 mt-4 transition-all duration-500 ease-in-out ${
                  isTransitioning ? 'opacity-0 transform scale-95' : 'opacity-100 transform scale-100'
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
                  {testimonials[currentTestimonial].initial}
                </div>
                <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1">
                  {testimonials[currentTestimonial].name}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {testimonials[currentTestimonial].location}
                </p>
              </div>
            </div>
          </div>

          {/* Индикаторы */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex gap-1.5 sm:gap-2">
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
                  className={`w-3 h-3 sm:w-4 sm:h-4 rounded-full transition-all duration-300 disabled:cursor-not-allowed focus:outline-none focus:ring-1 focus:ring-accent/50 ${
                    index === currentTestimonial 
                      ? 'bg-accent scale-110' 
                      : 'bg-accent/30 hover:bg-accent/50 hover:scale-105'
                  }`}
                />
              ))}
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
                    <div className="w-16 h-16 bg-white/90 hover:bg-white transition-colors rounded-full flex items-center justify-center group-hover:scale-110 transform duration-300">
                      <Icon name="Play" size={24} className="text-accent ml-1" />
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