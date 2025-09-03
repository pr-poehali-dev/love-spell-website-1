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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
          <Icon name="AlertTriangle" size={32} className="text-orange-500 sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
          Внимание<span className="text-orange-500">!</span>
        </h2>
      </div>
      
      <div className="bg-white/5 rounded-lg p-4 mb-6 sm:mb-8">
        <p className="text-white/90 text-base sm:text-lg leading-relaxed">
          Все обращения принимаются строго с <span className="font-bold text-orange-400">18 лет</span>.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={onClose}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
        >
          Назад
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
        >
          Мне есть 18
        </button>
      </div>
    </div>
  );
}