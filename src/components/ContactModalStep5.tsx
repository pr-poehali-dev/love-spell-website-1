import React from 'react';
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

interface ContactModalStep5Props {
  formData: FormData;
  errors: FormErrors;
  isSubmitting: boolean;
  onFieldChange: (field: keyof FormData, value: string) => void;
  onFieldBlur: (field: keyof FormData) => void;
  onBack: () => void;
  onSendEmail: () => void;
}

export default function ContactModalStep5({ 
  formData, 
  errors, 
  isSubmitting,
  onFieldChange, 
  onFieldBlur, 
  onBack, 
  onSendEmail 
}: ContactModalStep5Props) {
  return (
    <div className="pt-2 sm:pt-0">
      <div className="text-center mb-6">
        <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary via-primary/90 to-primary/80 rounded-2xl flex items-center justify-center shadow-lg">
          <Icon name="Mail" size={24} className="text-primary-foreground" />
        </div>
        <h2 className="text-2xl font-bold text-foreground">Написать на Email</h2>
        <p className="text-muted-foreground text-sm mt-2">Заполните все поля для отправки сообщения</p>
      </div>
      
      <div className="space-y-5 mb-6">
        {/* Имя */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            Ваше имя <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => onFieldChange('name', e.target.value)}
            onBlur={() => onFieldBlur('name')}
            className={`w-full px-4 py-3 bg-input border-2 rounded-xl text-foreground placeholder-muted-foreground focus:outline-none transition-all duration-200 ${
              errors.name 
                ? 'border-destructive focus:border-destructive' 
                : 'border-border focus:border-primary'
            }`}
            placeholder="Введите ваше имя"
            maxLength={50}
          />
          {errors.name && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors.name}
            </p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
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
            onChange={(e) => onFieldChange('situation', e.target.value)}
            onBlur={() => onFieldBlur('situation')}
            className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 resize-none h-24 ${
              errors.situation 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-orange-500/30 focus:border-orange-500'
            }`}
            placeholder="Расскажите подробнее о вашей ситуации..."
            maxLength={500}
          />
          {errors.situation && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors.situation}
            </p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
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
            onChange={(e) => onFieldChange('birthDate', e.target.value)}
            onBlur={() => onFieldBlur('birthDate')}
            className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
              errors.birthDate 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-orange-500/30 focus:border-orange-500'
            }`}
            placeholder="Например: 15.03.1990 и 22.07.1988"
          />
          {errors.birthDate && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors.birthDate}
            </p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
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
            onChange={(e) => onFieldChange('email', e.target.value)}
            onBlur={() => onFieldBlur('email')}
            className={`w-full bg-white/5 border-2 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none transition-all duration-200 ${
              errors.email 
                ? 'border-red-500 focus:border-red-400' 
                : 'border-orange-500/30 focus:border-orange-500'
            }`}
            placeholder="your@email.com"
          />
          {errors.email && (
            <p className="text-destructive text-xs mt-1 flex items-center gap-1">
              <Icon name="AlertCircle" size={12} />
              {errors.email}
            </p>
          )}
          <p className="text-muted-foreground text-xs mt-1">
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
          onClick={onBack}
          className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95"
        >
          Назад
        </button>
        <button
          onClick={onSendEmail}
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
  );
}