import React from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalStep1Props {
  onNext: () => void;
  onClose: () => void;
}

export default function ContactModalStep1({ onNext, onClose }: ContactModalStep1Props) {
  return (
    <div className="text-center pt-2 sm:pt-0">
      <div className="mb-4 sm:mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Shield" size={24} className="text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground mb-3 sm:mb-4">
          Внимание<span className="text-primary">!</span>
        </h2>
      </div>
      
      <div className="bg-muted/20 rounded-lg p-4 mb-6 sm:mb-8">
        <p className="text-foreground text-base sm:text-lg leading-relaxed">
          Все обращения принимаются строго с <span className="font-bold text-primary">18 лет</span>.
        </p>
      </div>
      
      <div className="flex gap-3">
        <button 
          onClick={onClose}
          className="flex-1 bg-secondary hover:bg-secondary/80 text-white py-2.5 px-5 rounded-full font-medium transition-all duration-200 active:scale-95 border border-border"
        >
          Назад
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 text-primary-foreground py-2.5 px-5 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
        >
          Мне есть 18
        </button>
      </div>
    </div>
  );
}