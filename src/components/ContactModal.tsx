import React, { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';
import ContactModalStep1 from '@/components/ContactModalStep1';
import ContactModalStep2 from '@/components/ContactModalStep2';
import ContactModalStep3 from '@/components/ContactModalStep3';
import ContactModalStep4 from '@/components/ContactModalStep4';
import ContactModalStep5 from '@/components/ContactModalStep5';

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

  const renderCurrentStep = () => {
    switch (currentStep) {
      case 1:
        return <ContactModalStep1 onNext={handleNext} onClose={handleClose} />;
      case 2:
        return <ContactModalStep2 onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <ContactModalStep3 onNext={handleNext} onClose={handleClose} />;
      case 4:
        return <ContactModalStep4 
          onWhatsApp={handleWhatsApp}
          onTelegram={handleTelegram}
          onEmailChoice={handleEmailChoice}
        />;
      case 5:
        return <ContactModalStep5 
          formData={formData}
          errors={errors}
          isSubmitting={isSubmitting}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onBack={handleBack}
          onSendEmail={handleSendEmail}
        />;
      default:
        return null;
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
            {renderCurrentStep()}
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