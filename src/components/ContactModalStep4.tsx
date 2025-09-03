import React from 'react';
import Icon from '@/components/ui/icon';

interface ContactModalStep4Props {
  onWhatsApp: () => void;
  onTelegram: () => void;
  onEmailChoice: () => void;
}

export default function ContactModalStep4({ onWhatsApp, onTelegram, onEmailChoice }: ContactModalStep4Props) {
  return (
    <div className="text-center pt-2 sm:pt-0">
      <div className="mb-4 sm:mb-6">
        <div className="flex justify-center mb-4">
          <div className="relative">
            <div className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br from-primary to-primary/90 rounded-2xl transform rotate-12 flex items-center justify-center shadow-lg">
              <Icon name="MessageSquare" size={24} className="text-primary-foreground sm:w-8 sm:h-8" />
            </div>
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary/90 to-primary/80 rounded-xl transform -rotate-12 absolute -right-1 sm:-right-2 -top-1 sm:-top-2 flex items-center justify-center shadow-lg">
              <Icon name="MessageCircle" size={16} className="text-primary-foreground sm:w-5 sm:h-5" />
            </div>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-foreground">Выберите способ связи</h2>
      </div>

      <div className="space-y-4 sm:space-y-6">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              onClick={onWhatsApp}
              className="flex flex-col items-center gap-2 sm:gap-3 p-4 rounded-2xl bg-gradient-to-b from-background to-muted/20 hover:from-success/10 hover:to-success/5 transition-all duration-300 active:scale-95 border border-border hover:border-success/30 hover:shadow-lg transform hover:scale-[1.02]"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-success to-success/90 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="MessageCircle" size={20} className="text-background sm:w-7 sm:h-7" />
              </div>
              <span className="text-foreground font-semibold text-sm sm:text-base">WhatsApp</span>
              <span className="text-muted-foreground text-xs hidden sm:block">Мгновенно</span>
            </button>

            <button
              onClick={onTelegram}
              className="flex flex-col items-center gap-2 sm:gap-3 p-4 rounded-2xl bg-gradient-to-b from-background to-muted/20 hover:from-info/10 hover:to-info/5 transition-all duration-300 active:scale-95 border border-border hover:border-info/30 hover:shadow-lg transform hover:scale-[1.02]"
            >
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-info to-info/90 rounded-full flex items-center justify-center shadow-lg">
                <Icon name="Send" size={20} className="text-background sm:w-7 sm:h-7" />
              </div>
              <span className="text-foreground font-semibold text-sm sm:text-base">Telegram</span>
              <span className="text-muted-foreground text-xs hidden sm:block">Быстро</span>
            </button>
          </div>
          
          <button
            onClick={onEmailChoice}
            className="w-full bg-gradient-to-r from-primary to-primary hover:from-primary/90 hover:to-primary/90 hover:shadow-lg text-primary-foreground py-4 px-6 rounded-full font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-95 flex items-center gap-4"
          >
            <div className="w-10 h-10 bg-primary-foreground/20 rounded-full flex items-center justify-center">
              <Icon name="Mail" size={18} className="text-primary-foreground" />
            </div>
            <div className="flex-1 text-left">
              <span className="text-primary-foreground font-semibold text-lg block">Email - подробная форма</span>
              <span className="text-primary-foreground/80 text-sm">Опишите вашу ситуацию</span>
            </div>
            <Icon name="ArrowRight" size={20} className="text-primary-foreground/80" />
          </button>
        </div>
      </div>
    </div>
  );
}