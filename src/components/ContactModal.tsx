import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface FormErrors {
  name?: string;
  situation?: string;
  birthDate?: string;
  email?: string;
}

interface FormData {
  name: string;
  situation: string;
  birthDate: string;
  email: string;
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVisible, setIsVisible] = useState(false);
  const [stepTransition, setStepTransition] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formData, setFormData] = useState<FormData>({
    name: '',
    situation: '',
    birthDate: '',
    email: ''
  });

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
    if (currentStep < 5) {
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

  const handleWhatsApp = () => {
    window.open('https://wa.me/79000000000', '_blank');
    handleClose();
  };

  const handleTelegram = () => {
    window.open('https://t.me/username', '_blank');
    handleClose();
  };

  const handleEmailChoice = () => {
    setStepTransition(true);
    setTimeout(() => {
      setCurrentStep(5);
      setStepTransition(false);
    }, 150);
  };

  const validateField = (field: keyof FormData, value: string): string | undefined => {
    switch (field) {
      case 'name':
        if (!value.trim()) return 'Имя обязательно для заполнения';
        if (value.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
        if (value.trim().length > 50) return 'Имя не должно превышать 50 символов';
        break;
      case 'situation':
        if (!value.trim()) return 'Опишите вашу ситуацию';
        if (value.trim().length < 10) return 'Опишите ситуацию подробнее (минимум 10 символов)';
        if (value.trim().length > 500) return 'Описание не должно превышать 500 символов';
        break;
      case 'birthDate':
        if (!value.trim()) return 'Даты рождения обязательны';
        if (value.trim().length < 5) return 'Укажите даты в формате: ДД.ММ.ГГГГ и ДД.ММ.ГГГГ';
        break;
      case 'email':
        if (!value.trim()) return 'Email обязателен для заполнения';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) return 'Введите корректный email адрес';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    Object.keys(formData).forEach(key => {
      const field = key as keyof FormData;
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Очищаем ошибку при изменении поля
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
    
    // Валидируем поле только если оно было затронуто
    if (touched[field]) {
      const error = validateField(field, value);
      setErrors(prev => ({ ...prev, [field]: error }));
    }
  };

  const handleFieldBlur = (field: keyof FormData) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSendEmail = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Симуляция отправки
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const subject = encodeURIComponent('Консультация по любовным обрядам');
      const body = encodeURIComponent(
        `Имя: ${formData.name}\n\nСитуация: ${formData.situation}\n\nДата рождения: ${formData.birthDate}\n\nEmail для ответа: ${formData.email}`
      );
      
      window.open(`mailto:raisa.ilinskaya@example.com?subject=${subject}&body=${body}`, '_blank');
      handleClose();
    } catch (error) {
      console.error('Ошибка отправки:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={handleClose}
    >
      <div 
        className={`relative w-full max-w-xs sm:max-w-md transition-all duration-300 transform ${
          isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-2xl border border-white/10 max-h-[95vh] overflow-y-auto">
        <button 
          onClick={handleClose}
          className="absolute right-3 sm:right-4 top-3 sm:top-4 text-white/60 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
        >
          <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
        </button>

          <div className={`transition-all duration-300 ${
            stepTransition ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
          }`}>
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
                onClick={handleEmailChoice}
                className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                <Icon name="Mail" size={18} className="text-white" />
                <span>Написать на Email</span>
              </button>
            </div>
          </div>
        )}

        {/* Шаг 5: Email форма */}
        {currentStep === 5 && (
          <div className="pt-2 sm:pt-0">
            <div className="text-center mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
                <Icon name="Mail" size={32} className="text-orange-500 sm:w-10 sm:h-10" />
              </div>
              <h2 className="text-white text-lg sm:text-xl font-bold">Написать на Email</h2>
              <p className="text-white/70 text-sm mt-2">Заполните все поля для отправки сообщения</p>
            </div>
            
            <div className="space-y-5 mb-6">
              {/* Имя */}
              <div>
                <label className="block text-white/90 text-sm mb-2 font-medium">
                  Ваше имя <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  onBlur={() => handleFieldBlur('name')}
                  className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
                    errors.name 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-orange-500/30 focus:border-orange-500'
                  }`}
                  placeholder="Введите ваше имя"
                  maxLength={50}
                />
                {errors.name && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    {errors.name}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-1">
                  {formData.name.length}/50 символов
                </p>
              </div>
              
              {/* Ситуация */}
              <div>
                <label className="block text-white/90 text-sm mb-2 font-medium">
                  Опишите что у вас случилось <span className="text-red-400">*</span>
                </label>
                <textarea
                  value={formData.situation}
                  onChange={(e) => handleFieldChange('situation', e.target.value)}
                  onBlur={() => handleFieldBlur('situation')}
                  className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 resize-none h-24 ${
                    errors.situation 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-orange-500/30 focus:border-orange-500'
                  }`}
                  placeholder="Расскажите подробнее о вашей ситуации..."
                  maxLength={500}
                />
                {errors.situation && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    {errors.situation}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-1">
                  {formData.situation.length}/500 символов
                </p>
              </div>
              
              {/* Дата рождения */}
              <div>
                <label className="block text-white/90 text-sm mb-2 font-medium">
                  Даты рождения <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.birthDate}
                  onChange={(e) => handleFieldChange('birthDate', e.target.value)}
                  onBlur={() => handleFieldBlur('birthDate')}
                  className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
                    errors.birthDate 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-orange-500/30 focus:border-orange-500'
                  }`}
                  placeholder="Например: 15.03.1990 и 22.07.1988"
                />
                {errors.birthDate && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    {errors.birthDate}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-1">
                  Укажите вашу дату рождения и дату второй половинки
                </p>
              </div>
              
              {/* Фото */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Icon name="Camera" size={20} className="text-orange-500" />
                  <h3 className="text-white/90 text-sm font-medium">Фотографии</h3>
                  <span className="text-white/60 text-xs">(опционально)</span>
                </div>
                <p className="text-white/70 text-sm mb-3">
                  Прикрепите ваше фото и фото второй половинки для более точной работы.
                </p>
                <button 
                  type="button"
                  className="bg-gradient-to-r from-orange-500/20 to-orange-600/20 border border-orange-500/30 hover:from-orange-500/30 hover:to-orange-600/30 text-orange-300 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 active:scale-95 flex items-center gap-2"
                >
                  <Icon name="Upload" size={16} />
                  Добавить фото
                </button>
              </div>
              
              {/* Email */}
              <div>
                <label className="block text-white/90 text-sm mb-2 font-medium">
                  Ваш email <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleFieldChange('email', e.target.value)}
                  onBlur={() => handleFieldBlur('email')}
                  className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
                    errors.email 
                      ? 'border-red-500 focus:border-red-400' 
                      : 'border-orange-500/30 focus:border-orange-500'
                  }`}
                  placeholder="your@email.com"
                />
                {errors.email && (
                  <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                    <Icon name="AlertCircle" size={12} />
                    {errors.email}
                  </p>
                )}
                <p className="text-white/40 text-xs mt-1">
                  На этот адрес придет ответ от Раисы
                </p>
              </div>
            </div>
            
            {/* Информация о конфиденциальности */}
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 mb-6">
              <div className="flex items-start gap-2">
                <Icon name="Shield" size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-blue-300 text-xs leading-relaxed">
                  Ваши данные защищены и не передаются третьим лицам. Все консультации строго конфиденциальны.
                </p>
              </div>
            </div>
            
            <div className="flex gap-3">
              <button
                onClick={handleBack}
                className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
              >
                Назад
              </button>
              <button
                onClick={handleSendEmail}
                disabled={isSubmitting || Object.keys(errors).some(key => errors[key as keyof FormErrors]) || !formData.name || !formData.situation || !formData.email}
                className="flex-1 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Отправка...
                  </>
                ) : (
                  <>
                    <Icon name="Send" size={16} />
                    Отправить
                  </>
                )}
              </button>
            </div>
          </div>
        )}
          </div>
          
          {/* Индикатор прогресса */}
          <div className="flex justify-center mt-6 sm:mt-8 pt-4 border-t border-white/10">
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((step) => (
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
    </div>
  );
}