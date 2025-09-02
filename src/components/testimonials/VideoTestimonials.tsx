import Icon from '@/components/ui/icon';

interface VideoTestimonial {
  title: string;
  thumbnail: string;
}

interface VideoTestimonialsProps {
  videoTestimonials: VideoTestimonial[];
  onAddReview: () => void;
}

export default function VideoTestimonials({ videoTestimonials, onAddReview }: VideoTestimonialsProps) {
  return (
    <div>
      <h2 className="text-xl font-bold text-foreground mb-8 relative">
        <span className="relative inline-block">
          <span className="text-2xl font-bold relative z-10 text-primary">В</span>
          <div className="absolute w-9 h-9 rounded-full opacity-40" style={{
            background: 'linear-gradient(135deg, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.1) 100%)',
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
                  <Icon name="Play" size={18} className="text-primary ml-0.5" />
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
          onClick={onAddReview}
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
  );
}