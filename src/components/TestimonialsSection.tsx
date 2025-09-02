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

  // Автоперелистывание каждые 5 секунд
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isModalOpen) {
        nextTestimonial();
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [isModalOpen]);

  const nextTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
  };

  const prevTestimonial = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
      setIsTransitioning(false);
    }, 150);
  };

  const goToTestimonial = (index: number) => {
    if (isTransitioning || index === currentTestimonial) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentTestimonial(index);
      setIsTransitioning(false);
    }, 150);
  };

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Отзывы */}
        <div className="mb-20">
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
          <div className="relative bg-gradient-to-br from-card to-muted/20 rounded-3xl p-8 md:p-12 border border-border/50 mb-8">
            {/* Текст отзыва с красивыми скобками */}
            <div className="relative z-10 mb-8">
              <div 
                className={`relative max-w-4xl mx-auto transition-all duration-300 ${
                  isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
                }`}
              >
                {/* Открывающая скобка */}
                <span className="absolute -left-4 top-0 text-4xl md:text-6xl font-serif text-accent/30 select-none">"</span>
                
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground italic text-center px-6">
                  {testimonials[currentTestimonial].text}
                </p>
                
                {/* Закрывающая скобка */}
                <span className="absolute -right-4 bottom-0 text-4xl md:text-6xl font-serif text-accent/30 select-none">"</span>
              </div>
            </div>

            {/* Автор */}
            <div 
              className={`flex flex-col items-center mb-8 transition-all duration-300 ${
                isTransitioning ? 'opacity-0 transform translate-y-4' : 'opacity-100 transform translate-y-0'
              }`}
            >
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold border-2 mb-4 transition-all duration-300"
                style={{ 
                  color: '#ff9800',
                  borderColor: '#ff9800',
                  backgroundColor: 'transparent'
                }}
              >
                {testimonials[currentTestimonial].initial}
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-1">
                {testimonials[currentTestimonial].name}
              </h3>
              <p className="text-muted-foreground">
                {testimonials[currentTestimonial].location}
              </p>
            </div>

            {/* Навигация */}
            <div className="flex items-center justify-center gap-4">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  prevTestimonial();
                }}
                disabled={isTransitioning}
                className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronLeft" size={20} />
              </button>

              {/* Индикаторы */}
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.preventDefault();
                      goToTestimonial(index);
                    }}
                    disabled={isTransitioning}
                    className={`w-3 h-3 rounded-full transition-colors disabled:cursor-not-allowed ${
                      index === currentTestimonial 
                        ? 'bg-accent' 
                        : 'bg-accent/30 hover:bg-accent/50'
                    }`}
                  />
                ))}
              </div>

              <button 
                onClick={(e) => {
                  e.preventDefault();
                  nextTestimonial();
                }}
                disabled={isTransitioning}
                className="p-2 rounded-full bg-accent/10 hover:bg-accent/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Icon name="ChevronRight" size={20} />
              </button>
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