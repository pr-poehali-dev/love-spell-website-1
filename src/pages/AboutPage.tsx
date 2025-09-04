import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Icon from '@/components/ui/icon';
import ContactModal from '@/components/ContactModal';

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Helmet>
        <title>Обо мне - Раиса Ильинская | Ворожея и целительница</title>
        <meta name="description" content="Узнайте больше о Раисе Ильинской - опытной ворожее, которая поможет вам в любовной магии, снятии порчи и привлечении счастья." />
      </Helmet>
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-6xl mx-auto">
          {/* Main Card */}
          <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            <div className="grid lg:grid-cols-2 gap-0">
              
              {/* Left Side - Profile Card */}
              <div className="relative">
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src="https://cdn.poehali.dev/files/dcbedea9-ce95-4779-b4b7-dc63ddd3cd96.png"
                    alt="Sunset background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent"></div>
                </div>
                
                {/* Navigation Icons */}
                <div className="absolute top-6 left-6 flex flex-col gap-6 z-10">
                  <div className="text-center text-amber-400">
                    <Icon name="Home" size={20} />
                    <div className="text-xs mt-1 font-medium">ИГОЭ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors">
                    <Icon name="Users" size={20} />
                    <div className="text-xs mt-1 font-medium">ОТЗЫВЫ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors">
                    <Icon name="Star" size={20} />
                    <div className="text-xs mt-1 font-medium">ОТЗЫВЫ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors">
                    <Icon name="MessageCircle" size={20} />
                    <div className="text-xs mt-1 font-medium">СВЯЗЬ</div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="relative z-10 h-full min-h-[600px] flex flex-col justify-end p-8">
                  {/* Profile Photo */}
                  <div className="mb-6 flex justify-center">
                    <div className="w-32 h-32 rounded-full border-4 border-amber-400/50 overflow-hidden">
                      <img 
                        src="/images/raisa-profile.jpg" 
                        alt="Раиса Ильинская"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Name and Title */}
                  <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Раиса Ильинская</h1>
                    <p className="text-amber-400 font-medium text-lg">Ворожея</p>
                  </div>

                  {/* Contact Button */}
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    НАПИШИТЕ МНЕ
                    <Icon name="ArrowRight" size={16} />
                  </button>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="p-8 lg:p-12 space-y-8">
                
                {/* About Section */}
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-4 flex items-center gap-2">
                    <Icon name="User" size={24} />
                    Обо мне
                  </h2>
                  <p className="text-slate-300 leading-relaxed text-lg">
                    Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и 
                    как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня 
                    откажутся. Уже с возрастом стала осознавать, что могу быть нужной, могу 
                    помогать людям и получать от них позитивную энергию, которая питает меня, как 
                    батарея питает теплом холодный дом. Мои дорогие сестры, товарищи, не 
                    стесняйтесь просить помощи, ведь нашла вас в единстве. Постараюсь помочь 
                    вам, чем смогу. Делаю всё, что в моих силах. Моя магия не имеет цены. Если 
                    захотите, сможете отблагодарить меня после помощи, как пожелаете.
                  </p>
                </div>

                {/* What I Do Section */}
                <div>
                  <h3 className="text-xl font-bold text-amber-400 mb-6 flex items-center gap-2">
                    <Icon name="Sparkles" size={20} />
                    Чем я занимаюсь
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Christian Magic */}
                    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-600/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                          <Icon name="Plus" size={20} className="text-white" />
                        </div>
                        <h4 className="font-semibold text-white">Христианской магией</h4>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Основана на работе с архангелами, ангелами, святыми, а также 
                        известными архетипами Пресвятой Богородицы и Иисуса Христа.
                      </p>
                    </div>

                    {/* Runic Magic */}
                    <div className="bg-slate-800/40 rounded-xl p-6 border border-slate-600/30">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center">
                          <Icon name="DollarSign" size={20} className="text-white" />
                        </div>
                        <h4 className="font-semibold text-white">Рунической магией</h4>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        Использование специальных знаков и символов (рун) для получения 
                        информации, предсказаний, влияния на судьбу и привлечения энергий.
                      </p>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>

      <ContactModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AboutPage;