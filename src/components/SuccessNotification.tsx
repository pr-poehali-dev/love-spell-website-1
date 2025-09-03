import React, { useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface SuccessNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export default function SuccessNotification({ isOpen, onClose, email }: SuccessNotificationProps) {
  // Автозакрытие через 5 секунд
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-background/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl w-full max-w-md relative overflow-hidden">
        {/* Декоративные элементы */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-gradient-to-br from-success/20 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 right-0 w-16 h-16 bg-gradient-to-tl from-success/15 to-transparent rounded-full blur-xl"></div>
        
        {/* Кнопка закрытия */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 z-10"
          aria-label="Закрыть"
        >
          <Icon name="X" size={18} />
        </button>

        <div className="p-6 pt-8 text-center relative">
          {/* Иконка успеха с анимацией */}
          <div className="relative mx-auto mb-6">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto relative overflow-hidden">
              {/* Анимированный фон */}
              <div className="absolute inset-0 bg-gradient-to-r from-success/20 via-success/30 to-success/20 animate-pulse"></div>
              <div className="relative z-10">
                <Icon name="CheckCircle" size={40} className="text-success animate-bounce" />
              </div>
            </div>
            
            {/* Декоративные кружки вокруг иконки */}
            <div className="absolute top-2 left-2 w-3 h-3 bg-success/30 rounded-full animate-ping"></div>
            <div className="absolute bottom-2 right-2 w-2 h-2 bg-success/40 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          </div>

          {/* Заголовок */}
          <h3 className="text-2xl font-bold text-foreground mb-3">
            Сообщение отправлено!
          </h3>

          {/* Описание */}
          <div className="space-y-3 mb-6">
            <p className="text-muted-foreground leading-relaxed">
              Ваше сообщение успешно доставлено. Раиса Ильинская ответит вам в ближайшее время.
            </p>
            
            {email && (
              <div className="bg-muted/30 border border-border/50 rounded-lg p-3">
                <p className="text-sm text-muted-foreground">
                  Ответ будет отправлен на:
                </p>
                <p className="text-sm font-medium text-foreground flex items-center justify-center gap-2 mt-1">
                  <Icon name="Mail" size={14} className="text-primary" />
                  {email}
                </p>
              </div>
            )}
          </div>

          {/* Дополнительная информация */}
          <div className="bg-card/50 border border-border/50 rounded-xl p-4 mb-6">
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Clock" size={14} className="text-primary" />
                </div>
                <span className="text-muted-foreground">
                  Обычно отвечаю в течение 1-3 часов
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-success/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Shield" size={14} className="text-success" />
                </div>
                <span className="text-muted-foreground">
                  Ваши данные защищены и конфиденциальны
                </span>
              </div>
              
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name="Heart" size={14} className="text-accent" />
                </div>
                <span className="text-muted-foreground">
                  Благодарю за доверие
                </span>
              </div>
            </div>
          </div>

          {/* Кнопки действий */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 bg-muted/50 hover:bg-muted/70 text-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Понятно
            </button>
            
            <button
              onClick={onClose}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <Icon name="ArrowLeft" size={16} className="group-hover:-translate-x-1 transition-transform" />
              На главную
            </button>
          </div>

          {/* Автозакрытие индикатор */}
          <div className="mt-4">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Icon name="Timer" size={12} />
              <span>Окно закроется автоматически через 5 секунд</span>
            </div>
            <div className="w-full h-1 bg-muted/30 rounded-full mt-2 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary/50 to-primary rounded-full animate-pulse" 
                   style={{ 
                     animation: 'shrink 5s linear forwards',
                     width: '100%'
                   }}>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}