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
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-red-500/20 rounded-full flex items-center justify-center">
          <Icon name="XCircle" size={32} className="text-red-500 sm:w-10 sm:h-10" />
        </div>
        <h2 className="text-red-400 text-lg sm:text-xl font-bold">То, чем я НЕ ЗАНИМАЮСЬ!</h2>
      </div>
      
      <div className="space-y-3 mb-4 sm:mb-6">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-red-300">1.</span> Не гадаю на будущее, настоящее или прошлое. Если вы ищете гадалку, это не ко мне.
          </p>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-red-300">2.</span> Не доказываю свои способности. Без веры в духовность наш разговор не имеет смысла.
          </p>
        </div>
        
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
          <p className="text-red-400 text-xs sm:text-sm leading-relaxed">
            <span className="font-semibold text-red-300">3.</span> Не даю советы по общим вопросам жизни. Ко мне обращаются когда точно знают чего хотят.
          </p>
        </div>
      </div>

      <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-lg p-3 sm:p-4 mb-6 sm:mb-8">
        <p className="text-center text-orange-400 text-sm sm:text-base font-medium">
          Моя специализация — ТОЛЬКО ЛЮБОВНЫЕ ОБРЯДЫ!
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
        <button 
          onClick={onClose}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
        >
          Выйти
        </button>
        <button 
          onClick={onNext}
          className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
        >
          Я по делу
        </button>
      </div>
    </div>
  );
}