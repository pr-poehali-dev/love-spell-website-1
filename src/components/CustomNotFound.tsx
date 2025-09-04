import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function CustomNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        {/* Простое число 404 */}
        <div className="space-y-4">
          <h1 className="text-8xl md:text-9xl font-bold text-primary/30 select-none">
            404
          </h1>
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Icon name="Sparkles" size={24} className="text-primary" />
          </div>
        </div>

        {/* Заголовок */}
        <div className="space-y-3">
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            Страница не найдена
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Запрашиваемая страница не существует или была перемещена.
          </p>
        </div>

        {/* Кнопки действий */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Link
            to="/"
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Icon name="Home" size={18} />
            На главную
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 bg-muted hover:bg-muted/80 text-foreground px-6 py-3 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <Icon name="ArrowLeft" size={18} />
            Назад
          </button>
        </div>


      </div>
    </div>
  );
}