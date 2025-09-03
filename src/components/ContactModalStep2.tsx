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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-blue-500/20 rounded-full flex items-center justify-center">
          <Icon name="Info" size={32} className="text-blue-500 sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-white text-lg sm:text-xl font-bold">Важная информация</h2>
      </div>
      
      <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 sm:p-4">
          <p className="text-white/90 text-sm sm:text-base leading-relaxed border-b border-white/10 pb-2 mb-2">
            Сейчас я занимаюсь исключительно любовными обрядами и ритуалами.
          </p>
        </div>
        
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 sm:p-4">
          <p className="text-orange-400 text-sm sm:text-base leading-relaxed">
            Гадание на будущее, настоящее или расклады карт для простого любопытства, к сожалению, не провожу.
          </p>
        </div>
        
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 sm:p-4">
          <p className="text-green-400 text-sm sm:text-base leading-relaxed">
            Но если вам нужно вернуть отношения или провести любовный обряд, я готова помочь.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={onBack}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
        >
          Назад
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
        >
          Далее
        </button>
      </div>
    </div>
  );
}