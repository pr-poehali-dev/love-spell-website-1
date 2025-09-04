import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Icon from '@/components/ui/icon';
import ContactModal from '@/components/ContactModal';
import Layout from '@/components/Layout';

const AboutPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Helmet>
        <title>Обо мне - Раиса Ильинская | Ворожея и целительница</title>
        <meta name="description" content="Узнайте больше о Раисе Ильинской - опытной ворожее, которая поможет вам в любовной магии, снятии порчи и привлечении счастья." />
      </Helmet>
      
      {/* Mobile Layout */}
      <div className="lg:hidden container mx-auto px-4 py-20">
        <div className="max-w-md mx-auto">
          <div className="bg-gradient-to-br from-slate-800/80 via-slate-700/60 to-slate-800/80 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-amber-500/20">
            
            {/* Mobile Profile Card */}
            <div className="relative">
              <div className="absolute inset-0">
                <img 
                  src="https://cdn.poehali.dev/files/2fb379ae-de9f-4ad9-ae76-d46481ceaa2f.png"
                  alt="Sunset background"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent"></div>
              </div>
              
              <div className="relative z-10 min-h-[500px] flex flex-col justify-end p-6">
                <div className="mb-6 flex justify-center">
                  <div className="w-28 h-28 rounded-full border-4 border-amber-400/50 overflow-hidden">
                    <img 
                      src="/images/raisa-profile.jpg" 
                      alt="Раиса Ильинская"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                <div className="text-center mb-6">
                  <h1 className="text-2xl font-bold text-white mb-1">Раиса Ильинская</h1>
                  <p className="text-amber-400 font-medium">Ворожея</p>
                </div>

                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="bg-transparent border border-white/30 hover:border-amber-400 hover:bg-amber-400/10 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center justify-center gap-2"
                >
                  НАПИШИТЕ МНЕ
                  <Icon name="ArrowRight" size={16} />
                </button>
              </div>
            </div>

            {/* Mobile Content */}
            <div className="p-6 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-amber-400 mb-3">Обо мне</h2>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Магия пришла в мою жизнь очень рано. Я не понимала, как с этим справляться и 
                  как это контролировать. Не могла рассказать, что чувствую внутри. Думала, от меня 
                  откажутся. Уже с возрастом стала осознавать, что могу быть нужной, могу 
                  помогать людям и получать от них позитивную энергию.
                </p>
              </div>

              <div>
                <h3 className="text-lg font-bold text-amber-400 mb-4">Чем я занимаюсь</h3>
                
                <div className="space-y-4">
                  <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Icon name="Plus" size={16} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-white text-sm">Христианской магией</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Основана на работе с архангелами, ангелами, святыми.
                    </p>
                  </div>

                  <div className="bg-slate-800/40 rounded-lg p-4 border border-slate-600/30">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center">
                        <Icon name="DollarSign" size={16} className="text-white" />
                      </div>
                      <h4 className="font-semibold text-white text-sm">Рунической магией</h4>
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">
                      Использование специальных знаков и символов (рун).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:flex min-h-screen items-center justify-center p-8">
        <div className="max-w-7xl w-full">
          <div className="bg-gradient-to-br from-slate-800/90 via-slate-700/70 to-slate-800/90 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl border border-amber-500/30">
            <div className="flex">
              
              {/* Left Side - Profile Card */}
              <div className="w-[480px] relative">
                <div className="absolute inset-0">
                  <img 
                    src="https://cdn.poehali.dev/files/2fb379ae-de9f-4ad9-ae76-d46481ceaa2f.png"
                    alt="Sunset background"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-800/50 to-transparent"></div>
                </div>
                
                {/* Navigation Icons */}
                <div className="absolute top-8 left-8 flex flex-col gap-8 z-10">
                  <div className="text-center text-amber-400">
                    <Icon name="Home" size={24} />
                    <div className="text-xs mt-2 font-medium">ИГОЭ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                    <Icon name="Users" size={24} />
                    <div className="text-xs mt-2 font-medium">ОТЗЫВЫ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                    <Icon name="Star" size={24} />
                    <div className="text-xs mt-2 font-medium">ОТЗЫВЫ</div>
                  </div>
                  <div className="text-center text-slate-400 hover:text-amber-400 transition-colors cursor-pointer">
                    <Icon name="MessageCircle" size={24} />
                    <div className="text-xs mt-2 font-medium">СВЯЗЬ</div>
                  </div>
                </div>

                {/* Profile Content */}
                <div className="relative z-10 h-full min-h-[700px] flex flex-col justify-end p-10">
                  <div className="mb-8 flex justify-center">
                    <div className="w-40 h-40 rounded-full border-4 border-amber-400/60 overflow-hidden shadow-2xl">
                      <img 
                        src="/images/raisa-profile.jpg" 
                        alt="Раиса Ильинская"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  <div className="text-center mb-10">
                    <h1 className="text-4xl font-bold text-white mb-3">Раиса Ильинская</h1>
                    <p className="text-amber-400 font-medium text-xl">Ворожея</p>
                  </div>

                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent border-2 border-white/40 hover:border-amber-400 hover:bg-amber-400/15 text-white font-semibold py-4 px-8 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                  >
                    НАПИШИТЕ МНЕ
                    <Icon name="ArrowRight" size={18} />
                  </button>
                </div>
              </div>

              {/* Right Side - Content */}
              <div className="flex-1 p-12 space-y-10">
                
                {/* About Section */}
                <div>
                  <h2 className="text-3xl font-bold text-amber-400 mb-6 flex items-center gap-3">
                    <Icon name="User" size={28} />
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
                  <h3 className="text-2xl font-bold text-amber-400 mb-8 flex items-center gap-3">
                    <Icon name="Sparkles" size={24} />
                    Чем я занимаюсь
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-8">
                    {/* Christian Magic */}
                    <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/40 hover:border-amber-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                          <Icon name="Plus" size={24} className="text-white" />
                        </div>
                        <h4 className="font-bold text-white text-xl">Христианской магией</h4>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
                        Основана на работе с архангелами, ангелами, святыми, а также 
                        известными архетипами Пресвятой Богородицы и Иисуса Христа.
                      </p>
                    </div>

                    {/* Runic Magic */}
                    <div className="bg-slate-800/50 rounded-2xl p-8 border border-slate-600/40 hover:border-amber-500/30 transition-all duration-300">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="w-14 h-14 bg-amber-500 rounded-full flex items-center justify-center shadow-lg">
                          <Icon name="DollarSign" size={24} className="text-white" />
                        </div>
                        <h4 className="font-bold text-white text-xl">Рунической магией</h4>
                      </div>
                      <p className="text-slate-400 leading-relaxed">
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
    </Layout>
  );
};

export default AboutPage;