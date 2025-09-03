import React from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalStep2Props {
  onNext: () => void;
  onBack: () => void;
}

export default function ContactModalStep2({ onNext, onBack }: ContactModalStep2Props) {
  return (
    <div className="pt-2 sm:pt-0">
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-info via-info/90 to-info/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Info" size={24} className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Важная информация</h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="bg-info/10 border border-info/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Icon name="Heart" size={20} className="text-info mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Сейчас я занимаюсь исключительно любовными обрядами и ритуалами.
            </p>
          </div>
        </div>
        
        <div className="bg-warning/10 border border-warning/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Icon name="X" size={20} className="text-warning mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Гадание на будущее, настоящее или расклады карт для простого любопытства, к сожалению, не провожу.
            </p>
          </div>
        </div>
        
        <div className="bg-success/10 border border-success/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Icon name="Check" size={20} className="text-success mt-0.5 flex-shrink-0" />
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              Но если вам нужно вернуть отношения или провести любовный обряд, я готова помочь.
            </p>
          </div>
        </div>
      </div>

      <div className="flex gap-3">
        <button 
          onClick={onBack}
          className="flex-1 bg-secondary hover:bg-secondary/80 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 border border-border"
        >
          Назад
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
        >
          Далее
        </button>
      </div>
    </div>
  );
}