import React, { useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface SuccessNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  email?: string;
}

export default function SuccessNotification({ isOpen, onClose, email }: SuccessNotificationProps) {
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    onClose();
  };

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
          {/* Иконка успеха */}
          <div className="relative mx-auto mb-6">
            <div className="w-20 h-20 bg-success/10 rounded-full flex items-center justify-center mx-auto">
              <Icon name="CheckCircle" size={40} className="text-success" />
            </div>
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

          {/* Кнопка действия */}
          <div className="flex justify-center">
            <button
              onClick={handleScrollToTop}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              <Icon name="ArrowUp" size={16} className="group-hover:-translate-y-1 transition-transform" />
              На главную
            </button>
          </div>


        </div>
      </div>


    </div>
  );
}