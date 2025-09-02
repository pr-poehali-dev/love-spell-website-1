import { useState } from 'react';
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
  const [showAllTestimonials, setShowAllTestimonials] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const displayedTestimonials = showAllTestimonials ? testimonials : testimonials.slice(0, 3);

  return (
    <div className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        
        {/* Отзывы */}
        <div className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent">
              Отзывы и благодарности
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Истории людей, которым удалось изменить свою жизнь к лучшему
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-8">
            {displayedTestimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-card to-muted/10 rounded-2xl p-6 border border-border/30 hover:border-accent/30 transition-all duration-300 group">
                {/* Автор */}
                <div className="flex items-center mb-4">
                  <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold text-background mr-3"
                    style={{ backgroundColor: 'rgb(255, 152, 0)' }}
                  >
                    {testimonial.initial}
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground group-hover:text-accent transition-colors">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                {/* Текст отзыва */}
                <p className="text-sm leading-relaxed text-muted-foreground mb-4">
                  {testimonial.text.length > 200 ? `${testimonial.text.substring(0, 200)}...` : testimonial.text}
                </p>
                
                {/* Рейтинг звездами */}
                <div className="flex items-center pt-4 border-t border-border/20">
                  {[1,2,3,4,5].map((star) => (
                    <Icon key={star} name="Star" size={16} className="text-accent fill-accent mr-1" />
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          {/* Показать больше отзывов */}
          {testimonials.length > 3 && (
            <div className="text-center">
              <button 
                onClick={() => setShowAllTestimonials(!showAllTestimonials)}
                className="text-accent hover:text-accent/80 font-medium transition-colors underline decoration-accent/30 hover:decoration-accent/60"
              >
                {showAllTestimonials ? 'Скрыть дополнительные отзывы' : 'Показать еще отзывы'}
              </button>
            </div>
          )}
        </div>

        {/* Видео благодарности */}
        <div>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent via-accent/90 to-accent/70 bg-clip-text text-transparent">
              Видео благодарности
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Искренние слова благодарности от наших клиентов
            </p>
          </div>

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
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: 'linear-gradient(135deg, rgb(255, 152, 0) 0%, rgb(255, 120, 0) 100%)',
                color: 'white'
              }}
            >
              <Icon name="MessageCircle" size={20} />
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