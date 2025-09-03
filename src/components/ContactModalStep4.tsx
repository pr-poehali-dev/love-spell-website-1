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
            onClick={onWhatsApp}
            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95 border border-white/10 hover:border-green-500/30"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="MessageCircle" size={20} className="text-white sm:w-7 sm:h-7" />
            </div>
            <span className="text-white font-medium text-sm sm:text-base">WhatsApp</span>
          </button>

          <button
            onClick={onTelegram}
            className="flex flex-col items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white/5 transition-all duration-200 active:scale-95 border border-white/10 hover:border-blue-500/30"
          >
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
              <Icon name="Send" size={20} className="text-white sm:w-7 sm:h-7" />
            </div>
            <span className="text-white font-medium text-sm sm:text-base">Telegram</span>
          </button>
        </div>

        <button
          onClick={onEmailChoice}
          className="w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white py-3 px-6 rounded-full font-medium transition-all duration-200 active:scale-95 shadow-lg flex items-center justify-center gap-2"
        >
          <Icon name="Mail" size={18} className="text-white" />
          <span>Написать на Email</span>
        </button>
      </div>
    </div>
  );
}