import { useState, useEffect } from 'react';
import Icon from '@/components/ui/icon';

interface FormErrors {
  name?: string;
  review?: string;
  location?: string;
  email?: string;
  rating?: string;
}

interface FormData {
  name: string;
  review: string;
  location: string;
  email: string;
  rating: number;
}

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    review: '',
    location: '',
    email: '',
    rating: 0
  });
  
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
      // Сброс состояния при закрытии
      setTimeout(() => {
        setFormData({ name: '', review: '', location: '', email: '', rating: 0 });
        setErrors({});
        setTouched({});
        setIsSubmitted(false);
      }, 300);
    }
  }, [isOpen]);

  if (!isOpen && !isVisible) return null;

  const validateField = (field: keyof FormData, value: string | number): string | undefined => {
    switch (field) {
      case 'name':
        const nameValue = value as string;
        if (!nameValue.trim()) return 'Имя обязательно для заполнения';
        if (nameValue.trim().length < 2) return 'Имя должно содержать минимум 2 символа';
        if (nameValue.trim().length > 50) return 'Имя не должно превышать 50 символов';
        break;
      case 'review':
        const reviewValue = value as string;
        if (!reviewValue.trim()) return 'Отзыв обязателен для заполнения';
        if (reviewValue.trim().length < 10) return 'Отзыв должен содержать минимум 10 символов';
        if (reviewValue.trim().length > 1000) return 'Отзыв не должен превышать 1000 символов';
        break;
      case 'location':
        const locationValue = value as string;
        if (locationValue && locationValue.trim().length > 100) return 'Название города не должно превышать 100 символов';
        break;
      case 'email':
        const emailValue = value as string;
        if (emailValue && emailValue.trim()) {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(emailValue)) return 'Введите корректный email адрес';
        }
        break;
      case 'rating':
        const ratingValue = value as number;
        if (ratingValue === 0) return 'Пожалуйста, поставьте оценку';
        break;
    }
    return undefined;
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    
    (Object.keys(formData) as Array<keyof FormData>).forEach(key => {
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFieldChange = (field: keyof FormData, value: string | number) => {
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Симуляция отправки
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // В реальном приложении здесь был бы API запрос
      console.log('Review submitted:', formData);
      
      setIsSubmitted(true);
      
      // Автозакрытие через 3 секунды
      setTimeout(() => {
        handleClose();
      }, 3000);
    } catch (error) {
      console.error('Error submitting review:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleRatingClick = (rating: number) => {
    handleFieldChange('rating', rating);
    if (!touched.rating) {
      setTouched(prev => ({ ...prev, rating: true }));
    }
  };

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 transition-all duration-300 ${
      isVisible ? 'bg-black/80 backdrop-blur-sm' : 'bg-black/0 backdrop-blur-none'
    }`}>
      {/* Backdrop */}
      <div 
        className="fixed inset-0"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className={`relative w-full max-w-sm sm:max-w-md bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl sm:rounded-2xl shadow-2xl border border-white/10 transition-all duration-300 transform max-h-[95vh] overflow-y-auto ${
        isVisible ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4'
      }`}>
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-3 sm:top-4 right-3 sm:right-4 text-white/60 hover:text-white transition-colors z-10 p-1 rounded-full hover:bg-white/10"
        >
          <Icon name="X" size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="p-4 sm:p-6 pt-12 sm:pt-14">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 bg-orange-500/20 rounded-full flex items-center justify-center">
                  <Icon name="MessageSquare" size={32} className="text-orange-500 sm:w-10 sm:h-10" />
                </div>
                <h2 className="text-white text-xl sm:text-2xl font-bold mb-3 sm:mb-4">
                  Оставьте свой отзыв
                </h2>
                <p className="text-white/70 text-sm">
                  Поделитесь своим опытом с другими людьми
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-3">
                    Ваша оценка <span className="text-red-400">*</span>
                  </label>
                  <div className="flex items-center justify-center gap-2 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => handleRatingClick(star)}
                        className="transition-all duration-200 hover:scale-110"
                      >
                        <Icon 
                          name="Star" 
                          size={32}
                          className={`${
                            star <= formData.rating 
                              ? 'text-yellow-500 fill-yellow-500' 
                              : 'text-white/40 hover:text-yellow-400'
                          } transition-colors duration-200`}
                        />
                      </button>
                    ))}
                  </div>
                  {formData.rating > 0 && (
                    <p className="text-center text-sm text-white/70">
                      {formData.rating === 1 && 'Плохо'}
                      {formData.rating === 2 && 'Неудовлетворительно'}
                      {formData.rating === 3 && 'Нормально'}
                      {formData.rating === 4 && 'Хорошо'}
                      {formData.rating === 5 && 'Отлично'}
                    </p>
                  )}
                  {errors.rating && (
                    <p className="text-red-400 text-xs mt-1 flex items-center justify-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      {errors.rating}
                    </p>
                  )}
                </div>

                {/* Name */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
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
                    <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      {errors.name}
                    </p>
                  )}
                  <p className="text-muted-foreground text-xs mt-1">
                    {formData.name.length}/50 символов
                  </p>
                </div>

                {/* Review */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Ваш отзыв <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={formData.review}
                    onChange={(e) => handleFieldChange('review', e.target.value)}
                    onBlur={() => handleFieldBlur('review')}
                    rows={4}
                    className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 resize-none ${
                      errors.review 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-orange-500/30 focus:border-orange-500'
                    }`}
                    placeholder="Расскажите подробно о вашем опыте, результатах и впечатлениях..."
                    maxLength={1000}
                  />
                  {errors.review && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      {errors.review}
                    </p>
                  )}
                  <p className="text-white/40 text-xs mt-1">
                    {formData.review.length}/1000 символов
                  </p>
                </div>

                {/* Location */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Откуда вы? <span className="text-white/60 text-xs">(необязательно)</span>
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => handleFieldChange('location', e.target.value)}
                    onBlur={() => handleFieldBlur('location')}
                    className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
                      errors.location 
                        ? 'border-red-500 focus:border-red-400' 
                        : 'border-orange-500/30 focus:border-orange-500'
                    }`}
                    placeholder="Ваш город"
                    maxLength={100}
                  />
                  {errors.location && (
                    <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                      <Icon name="AlertCircle" size={12} />
                      {errors.location}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-white/90 text-sm font-medium mb-2">
                    Ваш email <span className="text-white/60 text-xs">(необязательно)</span>
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
                    Для связи, если потребуется уточнение
                  </p>
                </div>

                {/* Privacy notice */}
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3">
                  <div className="flex items-start gap-2">
                    <Icon name="Shield" size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-blue-300 text-xs leading-relaxed">
                      Ваш отзыв может быть опубликован на сайте. Персональные данные не передаются третьим лицам.
                    </p>
                  </div>
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || Object.keys(errors).some(key => errors[key as keyof FormErrors])}
                  className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Отправляем...
                    </>
                  ) : (
                    <>
                      <Icon name="Send" size={18} />
                      Отправить отзыв
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="Check" size={36} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                Спасибо за отзыв!
              </h3>
              <p className="text-white/90 mb-4">
                Ваш отзыв был успешно отправлен и вскоре появится на сайте
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-white/70">
                <Icon name="Clock" size={16} />
                <span>Окно закроется автоматически</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}