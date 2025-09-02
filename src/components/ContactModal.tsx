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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 relative">
        <button 
          onClick={handleClose}
          className="absolute right-4 top-4 text-white/60 hover:text-white transition-colors"
        >
          <Icon name="X" size={24} />
        </button>

        {/* Шаг 1: Предупреждение о возрасте */}
        {currentStep === 1 && (
          <div className="text-center">
            <h2 className="text-white text-2xl font-bold mb-6">
              Внимание<span className="text-orange-500">!</span>
            </h2>
            <p className="text-white/80 text-lg mb-8">
              Все обращения принимаются строго с <span className="font-semibold">18 лет</span>.
            </p>
            <div className="flex gap-4">
              <button 
                onClick={handleClose}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Назад
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Мне есть 18
              </button>
            </div>
          </div>
        )}

        {/* Шаг 2: Важная информация */}
        {currentStep === 2 && (
          <div className="text-center">
            <h2 className="text-white text-xl font-bold mb-6">Важная информация:</h2>
            
            <div className="text-left space-y-4 mb-8">
              <p className="text-white/90 text-sm underline">
                Сейчас я занимаюсь исключительно любовными обрядами и ритуалами.
              </p>
              
              <p className="text-orange-400 text-sm">
                Гадание на будущее, настоящее или расклады карт для простого любопытства, к сожалению, не провожу.
              </p>
              
              <p className="text-white/90 text-sm">
                Но если вам нужно вернуть отношения или провести любовный обряд, я готова помочь.
              </p>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleBack}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Назад
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Далее
              </button>
            </div>
          </div>
        )}

        {/* Шаг 3: Что НЕ делаю */}
        {currentStep === 3 && (
          <div className="text-center">
            <h2 className="text-red-500 text-xl font-bold mb-6">То, чем я НЕ ЗАНИМАЮСЬ!</h2>
            
            <div className="text-left space-y-4 mb-4 text-sm">
              <div className="border-b border-white/20 pb-3">
                <p className="text-red-400">
                  <strong>1. Не гадаю на будущее, настоящее или прошлое.</strong> Если вы ищете гадалку, это не ко мне. Я не занимаюсь предсказаниями.
                </p>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <p className="text-red-400">
                  <strong>2. Не доказываю свою способности.</strong> Если вам нужно подтверждение или доказательство моей силы, я не помогу. Без веры в духовность наш разговор не имеет смысла.
                </p>
              </div>
              
              <div className="border-b border-white/20 pb-3">
                <p className="text-red-400">
                  <strong>3. Не даю советы по общим вопросам жизни.</strong> Если вам нужно просто "узнать", "подсказать", "разобраться" – это не мой профиль. Ко мне обращаются когда точно знают чего хотят
                </p>
              </div>
            </div>

            <p className="text-center text-orange-400 text-sm mb-8">
              Моя специализация это ТОЛЬКО ЛЮБОВНЫЕ ОБРЯДЫ! Давайте уважать время друг друга!
            </p>

            <div className="flex gap-4">
              <button 
                onClick={handleClose}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Выйти
              </button>
              <button 
                onClick={handleNext}
                className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Я по делу
              </button>
            </div>
          </div>
        )}

        {/* Шаг 4: Выбор способа связи */}
        {currentStep === 4 && (
          <div className="text-center">
            <div className="mb-6">
              <div className="flex justify-center mb-4">
                <div className="relative">
                  <div className="w-16 h-16 bg-orange-500 rounded-2xl transform rotate-12 flex items-center justify-center">
                    <Icon name="MessageSquare" size={32} className="text-white" />
                  </div>
                  <div className="w-12 h-12 bg-orange-600 rounded-xl transform -rotate-12 absolute -right-2 -top-2 flex items-center justify-center">
                    <Icon name="MessageCircle" size={20} className="text-white" />
                  </div>
                </div>
              </div>
              <h2 className="text-white text-xl font-bold">Выберите способ связи</h2>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex justify-center gap-8">
                <button
                  onClick={handleWhatsApp}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                    <Icon name="MessageCircle" size={28} className="text-white" />
                  </div>
                  <span className="text-white font-medium">WhatsApp</span>
                </button>

                <button
                  onClick={handleTelegram}
                  className="flex flex-col items-center gap-2 p-4 rounded-xl hover:bg-white/5 transition-colors"
                >
                  <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
                    <Icon name="Send" size={28} className="text-white" />
                  </div>
                  <span className="text-white font-medium">Telegram</span>
                </button>
              </div>

              <button
                onClick={handleEmail}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 px-6 rounded-full font-medium transition-colors"
              >
                Написать на Email
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}