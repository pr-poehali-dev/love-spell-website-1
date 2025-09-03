import React from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalStep3Props {
  onNext: () => void;
  onClose: () => void;
}

export default function ContactModalStep3({ onNext, onClose }: ContactModalStep3Props) {
  return (
    <div className="pt-2 sm:pt-0">
      <div className="text-center mb-4 sm:mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-destructive via-destructive/90 to-destructive/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="XCircle" size={24} className="text-background" />
        </div>
        <h2 className="text-destructive text-2xl font-bold">То, чем я НЕ ЗАНИМАЮСЬ!</h2>
      </div>
      
      <div className="space-y-3 mb-4 sm:mb-6">
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-destructive text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-destructive">1.</span> Не гадаю на будущее, настоящее или прошлое. Если вы ищете гадалку, это не ко мне.
          </p>
        </div>
        
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-destructive text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-destructive">2.</span> Не доказываю свои способности. Без веры в духовность наш разговор не имеет смысла.
          </p>
        </div>
        
        <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3">
          <p className="text-destructive text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-destructive">3.</span> Не даю советы по общим вопросам жизни. Ко мне обращаются когда точно знают чего хотят.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-primary/20 to-warning/20 border border-primary/30 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
        <p className="text-center text-primary text-sm sm:text-base font-medium">
          Моя специализация — ТОЛЬКО ЛЮБОВНЫЕ ОБРЯДЫ!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={onClose}
          className="flex-1 bg-secondary hover:bg-secondary/80 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 border border-border"
        >
          Выйти
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-success to-success hover:from-success/90 hover:to-success/90 text-white py-3 px-6 rounded-full font-semibold transition-all duration-300 hover:shadow-lg transform hover:scale-[1.02] active:scale-95"
        >
          Я по делу
        </button>
      </div>
    </div>
  );
}