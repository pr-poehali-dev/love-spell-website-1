import { useState } from 'react';
import ReviewModal from '@/components/ReviewModal';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialNavigation from '@/components/testimonials/TestimonialNavigation';
import VideoTestimonials from '@/components/testimonials/VideoTestimonials';
import { useTestimonialLogic } from '@/components/testimonials/useTestimonialLogic';

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const {
    currentTestimonial,
    isTransitioning,
    expandedTestimonials,
    cardHeight,
    maxTextLength,
    nextTestimonial,
    prevTestimonial,
    goToTestimonial,
    toggleExpanded,
    onTouchStart,
    onTouchMove,
    onTouchEnd,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  } = useTestimonialLogic({ testimonials, isModalOpen });

  return (
    <div className="bg-background">
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        
        {/* Отзывы */}
        <div className="mb-12 sm:mb-16">
          <h2 className="text-xl font-bold text-foreground mb-8 relative">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10" style={{color: '#ff9800'}}>О</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.6) 0%, rgba(255, 152, 0, 0.1) 100%)',
                top: '-1px',
                left: '-10px'
              }}></div>
            </span>тзывы и благодарности
          </h2>

          {/* Карточка отзыва */}
          <TestimonialCard
            testimonial={testimonials[currentTestimonial]}
            isExpanded={expandedTestimonials.has(currentTestimonial)}
            isTransitioning={isTransitioning}
            maxTextLength={maxTextLength}
            cardHeight={cardHeight}
            onToggleExpanded={() => toggleExpanded(currentTestimonial)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onFocus={onFocus}
            onBlur={onBlur}
          />
          
          {/* Навигация */}
          <TestimonialNavigation
            currentTestimonial={currentTestimonial}
            totalTestimonials={testimonials.length}
            isTransitioning={isTransitioning}
            onPrevTestimonial={prevTestimonial}
            onNextTestimonial={nextTestimonial}
            onGoToTestimonial={goToTestimonial}
          />
        </div>

        {/* Видео благодарности */}
        <VideoTestimonials
          videoTestimonials={videoTestimonials}
          onAddReview={() => setIsModalOpen(true)}
        />
      </div>
      
      {/* Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}