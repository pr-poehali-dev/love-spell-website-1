import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [stepTransition, setStepTransition] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      setTimeout(() => setCurrentStep(1), 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(1);
      onClose();
    }, 300);
  };

  const handleNext = () => {
    if (currentStep < 4) {
      setStepTransition(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setStepTransition(false);
      }, 150);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setStepTransition(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setStepTransition(false);
      }, 150);
    }
  };

  const handleContactChoice = (type: 'whatsapp' | 'telegram') => {
    if (type === 'whatsapp') {
      window.open('https://wa.me/79000000000', '_blank');
    } else {
      window.open('https://t.me/username', '_blank');
    }
    handleClose();
  };

  const handleEmail = () => {
    window.open('mailto:example@example.com', '_blank');
    handleClose();
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/60' : 'bg-black/0'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-md transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] max-h-[95vh] overflow-y-auto">
          <button 
            onClick={handleClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-orange-500 transition-colors z-10 p-2 rounded-full hover:bg-orange-50 dark:hover:bg-orange-900/20"
          >
            <Icon name="X" size={20} />
          </button>

          <div className={`transition-all duration-300 ${stepTransition ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'}`}>
            {/* Шаг 1: Начальное приветствие */}
            {currentStep === 1 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="MessageSquare" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 text-center">
                    Свяжемся с вами
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base leading-relaxed text-center">
                    Выберите удобный способ связи
                  </p>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 mb-8">
                  <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed text-center">
                    💡 <strong>Рекомендую WhatsApp</strong> для быстрой связи
                  </p>
                </div>
                
                <div className="space-y-3 mb-8">
                  <button 
                    onClick={() => handleContactChoice('whatsapp')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 active:scale-95 border border-green-200 dark:border-green-800"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Icon name="MessageCircle" size={20} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Быстро и удобно</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </button>

                  <button 
                    onClick={() => handleContactChoice('telegram')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 active:scale-95 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <Icon name="Send" size={20} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Telegram</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Безопасно и надежно</p>
                    </div>
                    <Icon name="ChevronRight" size={20} className="text-gray-400" />
                  </button>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Далее
                  </button>
                </div>
              </div>
            )}

            {/* Остальные шаги остаются прежними */}
            {currentStep === 2 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-red-500 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="AlertTriangle" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Возрастное ограничение
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Все обращения принимаются строго с <strong>18 лет</strong>
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Мне есть 18
                  </button>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="Heart" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Моя специализация
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base">
                    Работаю только с <strong>любовными обрядами</strong> и отношениями
                  </p>
                </div>
                
                <div className="bg-orange-50 dark:bg-orange-900/20 rounded-2xl p-4 mb-8">
                  <p className="text-sm text-orange-700 dark:text-orange-300 leading-relaxed">
                    ✨ Возвращение отношений, любовные привязки, гармонизация пар
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={handleBack}
                    className="flex-1 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
                  >
                    Назад
                  </button>
                  <button
                    onClick={handleNext}
                    className="flex-1 bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg"
                  >
                    Это мой случай
                  </button>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="text-center">
                <div className="mb-6">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-orange-500 to-orange-600 rounded-full flex items-center justify-center shadow-lg">
                    <Icon name="CheckCircle" size={28} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                    Готово!
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-base mb-8">
                    Теперь выберите удобный способ связи
                  </p>
                </div>
                
                <div className="space-y-3">
                  <button 
                    onClick={() => handleContactChoice('whatsapp')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-200 active:scale-95 border border-green-200 dark:border-green-800"
                  >
                    <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-md">
                      <Icon name="MessageCircle" size={20} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">WhatsApp</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Рекомендую для быстрой связи</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleContactChoice('telegram')}
                    className="w-full flex items-center gap-4 p-4 rounded-2xl bg-blue-50 dark:bg-blue-900/20 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-200 active:scale-95 border border-blue-200 dark:border-blue-800"
                  >
                    <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-md">
                      <Icon name="Send" size={20} className="text-white" />
                    </div>
                    <div className="text-left flex-1">
                      <h4 className="font-semibold text-gray-900 dark:text-white">Telegram</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Безопасно и приватно</p>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>
          
          {/* Индикатор прогресса */}
          <div className="flex justify-center mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div 
                  key={step}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    step === currentStep 
                      ? 'bg-gradient-to-r from-orange-500 to-orange-600 w-8' 
                      : step < currentStep 
                      ? 'bg-orange-400 w-6' 
                      : 'bg-gray-300 dark:bg-gray-600 w-4'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}