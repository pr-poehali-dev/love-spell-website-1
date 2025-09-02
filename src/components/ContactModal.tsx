import React, { useState } from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [currentStep, setCurrentStep] = useState(1);

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentStep(1);
    onClose();
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/79000000000', '_blank');
    handleClose();
  };

  const handleTelegram = () => {
    window.open('https://t.me/username', '_blank');
    handleClose();
  };

  const handleEmail = () => {
    window.open('mailto:example@example.com', '_blank');
    handleClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-2 sm:p-4">
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl max-w-xs sm:max-w-md w-full p-4 sm:p-6 relative shadow-2xl border border-white/10 max-h-[95vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-white/60 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
        >
          <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
        </button>

        {/* Шаг 1: Предупреждение о возрасте */}
        {currentStep === 1 && (
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
                onClick={handleClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
              >
                Назад
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
              >
                Мне есть 18
              </button>
            </div>
          </div>
        )}

        {/* Шаг 2: Важная информация */}
        {currentStep === 2 && (
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
                onClick={handleBack}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
              >
                Назад
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Шаг 3: Что НЕ делаю */}
        {currentStep === 3 && (
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
                onClick={handleClose}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
              >
                Выйти
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
              >
                Я по делу
              </button>
            </div>
          </div>
        )}

        {/* Шаг 4: Выбор способа связи */}
        {currentStep === 4 && (
          <div className="text-center pt-2 sm:pt-0">
            <div className="mb-4 sm:mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl transform rotate-12 flex items-center justify-center shadow-lg">
                    <Icon name="MessageSquare" size={24} className="text-white sm:w-8 sm:h-8" />
                  </div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-orange-600 to-orange-700 rounded-xl transform -rotate-12 absolute -right-1 sm:-right-2 -top-1 sm:-top-2 flex items-center justify-center shadow-lg">
                    <Icon name="MessageCircle" size={16} className="text-white sm:w-5 sm:h-5" />
                  </div>
                </div>
              </div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Выберите способ связи</h2>
            </div>

            <div className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                <button
                  onClick={handleWhatsApp}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95 border border-white/10 hover:border-green-500/30"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="MessageCircle" size={20} className="text-white sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">WhatsApp</span>
                </button>

                <button
                  onClick={handleTelegram}
                  className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95 border border-white/10 hover:border-blue-500/30"
                >
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="Send" size={20} className="text-white sm:w-7 sm:h-7" />
                  </div>
                  <span className="text-white font-medium text-sm sm:text-base">Telegram</span>
                </button>
              </div>

              <button
                onClick={handleEmail}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Icon name="Mail" size={18} className="text-white" />
                <span>Написать на Email</span>
              </button>
            </div>
          </div>
        )}
        
        {/* Индикатор прогресса */}
        <div className="flex justify-center mt-6 sm:mt-8 pt-4 border-t border-white/10">
          <div className="flex gap-2">
            {[1, 2, 3, 4].map((step) => (
              <div 
                key={step}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  step === currentStep 
                    ? 'bg-orange-500 w-6' 
                    : step < currentStep 
                    ? 'bg-orange-500/60' 
                    : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}