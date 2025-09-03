import { useState } from 'react';
import ReviewModal from '@/components/ReviewModal';
import TestimonialCard from '@/components/testimonials/TestimonialCard';
import TestimonialNavigation from '@/components/testimonials/TestimonialNavigation';
import VideoTestimonials from '@/components/testimonials/VideoTestimonials';
import { useTestimonialLogic } from '@/components/testimonials/useTestimonialLogic';

const testimonials = [
  {
    text: "У меня одна из самых типичных проблем была, выла как волк по ночам, не могла смириться с той болью которую мне причинили, как сумашедшая рылась в интернете, хотела найти помощи у магов, в итоге натыкалась на одних шарлатанов, сама обряд боялась делать, почитала что могут быть последствия если не опытный. Нашла этот сайт, написала Раисе на сайте, сразу чувствовалась поддержка и какая то теплота от нее, неравнодушие что-ли. Описала я ей свою проблему, и получила ответ с подробным описанием, как мне себя вести и что делать в дальнейшие 7 дней, результат был, за что Раисе огромное спасибо. А тому кто читает мой отзыв хочу сказать, не отчаивайся, выход есть всегда!",
    name: "Дарья",
    location: "Новосибирск",
    initial: "Д"
  },
  {
    text: "Нужна была срочная помощь, не знала к кому обратиться, нашла этот сайт, написала по контактам Раисе, долго мы с ней переписывались, в итоге Раиса дала некоторые указания - как и когда мне их выполнить. Сразу эффект не наступил, так как я в некоторых моментах сделала что то не правильно, Раиса на это отреагировала к стати спокойно, и просто попросила меня немного изменить проводимый обряд, после чего, в течении не могу сказать точно сколько дней, наверное дней 15 наступил долгожданный результат. Спасибо вам Раиса еще раз, во первых за то что так трепетно относитесь к чужим проблемам, а так же спасибо за поддержку, после ваших слов сразу становиться легче на душе!",
    name: "Валерия",
    location: "Пермь",
    initial: "В"
  },
  {
    text: "Подумала тоже не пройти мимо, и оставить свой отзыв о работе с Раисой, нашла ее сайт в сети, написала в Ватсап, Раиса с начала продиагностировала меня, что бы понять что можно сделать, потом я согласилась на обряд, обряд делали мы вместе с Раисой, то есть она у себя, а я у себя, спасибо Раиса что терпели меня все это время)) P.S, сейчас у меня слава богу все хорошо.",
    name: "Ольга",
    location: "Иркутск",
    initial: "О"
  },
  {
    text: "Решила написать отзыв о Раисе, посоветовали мне ее, мои знакомые, обратилась я к ней с семейными проблемами, ответила Раиса где то в течении дня, посоветовалась с ней, что мне можно сделать, Раиса предложила ее рядовой обряд, который подействовал примерно через 10 дней. Денег не взяла, но я воспитана иначе, посчитала что нужно отблагодарить за помощь.",
    name: "Наталья",
    location: "Санкт-Петербург",
    initial: "Н"
  },
  {
    text: "В общем к сути дела. Продавал машину, захотел найти сайт на подобие этого, что бы узнать как скоро я смогу продать машину, нашел сайт Раисы, написал ей вопрос, на что она дала мне шокирующий ответ, что бы я ждал клиента через неделю, и что бы я поднял цену на машину на 20%. Боже каково было мое удивление, когда примерно меньше чем через неделю мне позвонил мужчина и согласился на встречу, не смотря на то что цена была чуть завышена, честно сказать не ожидал такого результата.",
    name: "Андрей",
    location: "Волгоград",
    initial: "А"
  },
  {
    text: "Были некоторые проблемы со здоровьем, обратился к Раисе за помощью, и где то на следующий день получил ответ в развернутой форме, выполнил все по инструкции, результата прям сразу не было, ну оно и понятно, должно же пройти время, на данный момент спустя 3 дня, за целых 2 года я наконец то чувствую улучшения. Бесконечно благодарен вам Раиса.",
    name: "Виктор",
    location: "Благовещенск",
    initial: "В"
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
      <div className="max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl mx-auto px-4 sm:px-6 py-2 sm:py-4 space-y-12 sm:space-y-16">
        
        {/* Отзывы */}
        <h2 className="text-xl font-bold text-foreground mb-8 relative pt-0">
            <span className="relative inline-block">
              <span className="text-2xl font-bold relative z-10 text-primary">О</span>
              <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
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
        
        <div className="mt-12 sm:mt-16">
          {/* Видео благодарности */}
          <VideoTestimonials
            videoTestimonials={videoTestimonials}
            onAddReview={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      
      {/* Modal */}
      <ReviewModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}