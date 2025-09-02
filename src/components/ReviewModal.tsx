import { useState } from 'react';
import { X, FileText, Plus } from 'lucide-react';
import Icon from '@/components/ui/icon';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ReviewModal({ isOpen, onClose }: ReviewModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    review: '',
    location: '',
    email: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Имитация отправки
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    
    // Сброс через 2 секунды
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', review: '', location: '', email: '' });
      onClose();
    }, 2000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-sm sm:max-w-md bg-card rounded-2xl sm:rounded-3xl shadow-2xl transform transition-all duration-300 scale-100 animate-in slide-in-from-bottom-4 max-h-[90vh] overflow-y-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors z-10"
        >
          <X size={20} />
        </button>

        <div className="p-4 sm:p-6 pt-10 sm:pt-12">
          {!isSubmitted ? (
            <>
              {/* Header */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-accent to-accent/80 rounded-2xl flex items-center justify-center">
                  <FileText className="w-8 h-8 text-background" />
                  <Plus className="w-4 h-4 text-background -ml-2 -mt-2" />
                </div>
                <h2 className="text-2xl font-bold text-foreground">
                  Оставьте свой отзыв
                </h2>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ваше Имя
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/30 focus:border-accent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition-colors"
                    placeholder="Введите ваше имя"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ваш Отзыв
                  </label>
                  <textarea
                    name="review"
                    value={formData.review}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/30 focus:border-accent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition-colors resize-none"
                    placeholder="Расскажите о вашем опыте..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Откуда вы?
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/30 focus:border-accent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition-colors"
                    placeholder="Ваш город"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Ваш Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-0 py-3 bg-transparent border-0 border-b-2 border-accent/30 focus:border-accent text-foreground placeholder-muted-foreground focus:outline-none focus:ring-0 transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-gradient-to-r from-accent to-accent/80 text-white font-semibold text-lg rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 disabled:opacity-70 disabled:hover:scale-100"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Отправляем...
                    </div>
                  ) : (
                    'Отправить'
                  )}
                </button>
              </form>
            </>
          ) : (
            /* Success state */
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-green-500 rounded-full flex items-center justify-center">
                <Icon name="Check" size={32} className="text-white" />
              </div>
              <h3 className="text-xl font-bold text-foreground mb-2">
                Спасибо за отзыв!
              </h3>
              <p className="text-muted-foreground">
                Ваш отзыв был успешно отправлен
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}