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
  photos: File[];
}

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (email: string) => void;
}

export default function ContactModal({ isOpen, onClose, onSuccess }: ContactModalProps) {
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
    email: '',
    photos: []
  });
  const [uploadProgress, setUploadProgress] = useState<{ [key: string]: number }>({});
  const [isUploading, setIsUploading] = useState(false);
  const [successTimer, setSuccessTimer] = useState<NodeJS.Timeout | null>(null);

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
    if (successTimer) {
      clearTimeout(successTimer);
      setSuccessTimer(null);
    }
    setIsVisible(false);
    setTimeout(() => {
      setCurrentStep(1);
      setFormData({
        name: '',
        situation: '',
        birthDate: '',
        email: '',
        photos: []
      });
      setErrors({});
      setTouched({});
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

  const handlePhotoUpload = async (files: FileList) => {
    const validFiles = Array.from(files).filter(file => {
      // Валидация типа файла
      const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
      if (!validTypes.includes(file.type)) {
        alert('Поддерживаются только файлы: JPG, PNG, WEBP');
        return false;
      }
      
      // Валидация размера файла (макс 8МБ)
      if (file.size > 8 * 1024 * 1024) {
        alert('Размер файла не должен превышать 8МБ');
        return false;
      }
      
      return true;
    });
    
    if (validFiles.length === 0) return;
    
    setIsUploading(true);
    
    // Имитация загрузки с прогрессом
    for (let i = 0; i < validFiles.length; i++) {
      const file = validFiles[i];
      const fileKey = `${file.name}-${file.size}`;
      
      // Прогресс от 0 до 100
      for (let progress = 0; progress <= 100; progress += 5) {
        setUploadProgress(prev => ({ ...prev, [fileKey]: progress }));
        await new Promise(resolve => setTimeout(resolve, 30 + Math.random() * 20));
      }
      
      // Добавляем файл к списку
      setFormData(prev => ({
        ...prev,
        photos: [...prev.photos, file].slice(0, 4) // Макс 4 фото
      }));
      
      // Очищаем прогресс после завершения
      setTimeout(() => {
        setUploadProgress(prev => {
          const newProgress = { ...prev };
          delete newProgress[fileKey];
          return newProgress;
        });
      }, 500);
    }
    
    setIsUploading(false);
  };

  const handleRemovePhoto = (index: number) => {
    setFormData(prev => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== index)
    }));
  };

  const handleSendEmail = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Фальшивая отправка с имитацией загрузки
      await new Promise(resolve => setTimeout(resolve, 2000 + Math.random() * 1000));
      
      // Успешная отправка - переходим на страницу успеха
      setCurrentStep(6);
      setIsSubmitting(false);
      
      onSuccess?.(formData.email);
      
      // Автозакрытие через 10 секунд
      const timer = setTimeout(() => {
        handleClose();
      }, 10000);
      setSuccessTimer(timer);
      
    } catch (error) {
      console.error('Ошибка отправки:', error);
      alert('❌ Ошибка отправки. Попробуйте еще раз.');
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
          uploadProgress={uploadProgress}
          isUploading={isUploading}
          onFieldChange={handleFieldChange}
          onFieldBlur={handleFieldBlur}
          onPhotoUpload={handlePhotoUpload}
          onRemovePhoto={handleRemovePhoto}
          onBack={handleBack}
          onSendEmail={handleSendEmail}
        />;
      case 6:
        return (
          <div className="text-center space-y-8">
            {/* Иконка успеха */}
            <div className="mx-auto w-24 h-24 bg-gradient-to-br from-green-500/20 to-green-600/10 rounded-full flex items-center justify-center border border-green-500/20">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                <Icon name="CheckCircle2" size={32} className="text-green-500" />
              </div>
            </div>
            
            {/* Заголовок и описание */}
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
                Заявка отправлена! ✨
              </h3>
              
              <div className="space-y-3">
                <p className="text-muted-foreground leading-relaxed">
                  Спасибо за доверие! Мы внимательно изучим ваш запрос и свяжемся с вами в течение 24 часов с персональным предложением.
                </p>
                
                {/* Email подтверждение */}
                <div className="bg-card/50 border border-border rounded-xl p-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Icon name="Mail" size={16} />
                    <span>Ответ придет на почту:</span>
                  </div>
                  <div className="font-semibold text-foreground">
                    {formData.email}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Дополнительная информация */}
            <div className="space-y-4">
              <div className="bg-primary/5 border border-primary/10 rounded-xl p-4">
                <div className="flex items-start gap-3">
                  <Icon name="Clock" size={18} className="text-primary mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <div className="font-medium text-foreground text-sm mb-1">
                      Что дальше?
                    </div>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>• Изучим ваш случай в течение 2-4 часов</div>
                      <div>• Подготовим персональное предложение</div>
                      <div>• Свяжемся для уточнения деталей</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Таймер автозакрытия */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Icon name="Timer" size={14} />
                  <span>Окно закроется автоматически через 10 секунд</span>
                </div>
                
                <div className="h-1 bg-muted/50 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-primary/80 to-primary rounded-full animate-[shrink_10s_linear_forwards]" />
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${
        isVisible ? 'bg-black/60 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
      }`}
      onClick={handleClose}
    >
          <div 
            className={`relative w-full max-w-xs sm:max-w-md transition-all duration-300 transform ${
              isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-card rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-2xl border border-border max-h-[95vh] overflow-y-auto">
              <button 
                onClick={handleClose}
                className="absolute right-4 top-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/10 rounded-full transition-all duration-200 z-10"
              >
                <Icon name="X" size={20} />
              </button>

              <div className={`transition-all duration-300 ${
                stepTransition ? 'opacity-0 translate-x-2' : 'opacity-100 translate-x-0'
              }`}>
                {renderCurrentStep()}
              </div>
              
              {/* Индикатор прогресса */}
              {currentStep < 6 && (
                <div className="flex justify-center mt-6 sm:mt-8 pt-4 border-t border-border">
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((step) => (
                      <div 
                        key={step}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          step === currentStep 
                            ? 'bg-primary w-6' 
                            : step < currentStep 
                            ? 'bg-primary/60' 
                            : 'bg-muted'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
    </div>
  );
}