import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function CustomNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        {/* Магическое число 404 */}
        <div className="relative">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/20 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center animate-pulse">
              <Icon name="Sparkles" size={32} className="text-primary" />
            </div>
          </div>
        </div>

        {/* Заголовок */}
        <div className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Магия не сработала
          </h2>
          <p className="text-muted-foreground text-lg leading-relaxed">
            Эта страница растворилась в астральном пространстве. 
            Возможно, она была заколдована или просто не существует.
          </p>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            to="/"
            className="group flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/25"
          >
            <Icon name="Home" size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Вернуться домой
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="group flex items-center gap-2 bg-card hover:bg-card/80 text-foreground px-6 py-3 rounded-full font-medium transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-primary/25 border border-border"
          >
            <Icon name="ArrowLeft" size={20} className="group-hover:-translate-x-1 transition-transform duration-300" />
            Назад
          </button>
        </div>

        {/* Декоративные элементы */}
        <div className="relative mt-12 opacity-60">
          <div className="flex justify-center items-center space-x-4 text-primary/40">
            <Icon name="Star" size={16} className="animate-pulse" style={{animationDelay: '0s'}} />
            <Icon name="Sparkles" size={20} className="animate-pulse" style={{animationDelay: '0.5s'}} />
            <Icon name="Star" size={14} className="animate-pulse" style={{animationDelay: '1s'}} />
            <Icon name="Sparkles" size={18} className="animate-pulse" style={{animationDelay: '1.5s'}} />
            <Icon name="Star" size={16} className="animate-pulse" style={{animationDelay: '2s'}} />
          </div>
        </div>
      </div>
    </div>
  );
}