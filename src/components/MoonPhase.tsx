import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Простой и понятный расчет фазы луны
  const getMoonPhase = () => {
    const now = new Date();
    
    // Базовая точка: известное новолуние 3 сентября 2025, 01:56 UTC
    const knownNewMoon = new Date('2025-09-03T01:56:00.000Z');
    
    // Лунный цикл = 29.53 дня (среднее значение)
    const lunarCycleDays = 29.53;
    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    
    // Сколько дней прошло с известного новолуния
    const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / millisecondsPerDay;
    
    // Нормализуем в диапазон 0-1 (где 0 = новолуние, 0.5 = полнолуние)
    let phase = (daysSinceNewMoon % lunarCycleDays) / lunarCycleDays;
    
    // Убираем отрицательные значения
    if (phase < 0) phase += 1;
    
    return phase;
  };

  // Получение названия фазы луны
  const getMoonPhaseName = (phase: number) => {
    if (phase < 0.03125) return '🌑 Новолуние';
    if (phase < 0.21875) return '🌒 Молодая луна'; 
    if (phase < 0.28125) return '🌓 Первая четверть';
    if (phase < 0.46875) return '🌔 Растущая луна';
    if (phase < 0.53125) return '🌕 Полнолуние';
    if (phase < 0.71875) return '🌖 Убывающая луна';
    if (phase < 0.78125) return '🌗 Последняя четверть';
    if (phase < 0.96875) return '🌘 Стареющая луна';
    return '🌑 Новолуние';
  };

  useEffect(() => {
    setMoonPhase(getMoonPhase());
  }, []);

  // Создание живой анимированной луны
  const createLiveMoon = () => {
    const radius = size / 2 - 2;
    
    // Простой расчет фаз
    const isWaxing = moonPhase < 0.5;
    let illumination;
    if (moonPhase <= 0.5) {
      illumination = moonPhase * 100;
    } else {
      illumination = (1 - moonPhase) * 100;
    }
    illumination = Math.min(illumination, 50);
    const percentage = Math.round(illumination);
    
    return (
      <div 
        className="relative flex flex-col items-center cursor-pointer group"
        style={{ width: size + 30, height: size + 40 }}
        title={getMoonPhaseName(moonPhase)}
      >
        {/* Живые звездочки вокруг луны */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute text-accent opacity-60"
              style={{
                fontSize: '8px',
                top: `${20 + Math.sin(i * Math.PI / 3) * 35}%`,
                left: `${50 + Math.cos(i * Math.PI / 3) * 45}%`,
                animation: `twinkle-${i} ${2 + i * 0.3}s ease-in-out infinite`,
                transformOrigin: 'center'
              }}
            >
              ✨
            </div>
          ))}
        </div>

        {/* Основная живая луна */}
        <div 
          className="relative rounded-full overflow-hidden group-hover:animate-bounce"
          style={{
            width: radius * 2,
            height: radius * 2,
            background: `radial-gradient(circle at 30% 25%, 
              hsl(var(--accent) / 0.95) 0%, 
              hsl(var(--accent) / 0.85) 40%, 
              hsl(var(--accent) / 0.8) 70%,
              hsl(var(--accent) / 0.75) 100%
            )`,
            animation: 'moonGlow 4s ease-in-out infinite, moonRotate 20s linear infinite',
            transformOrigin: 'center'
          }}
        >
          {/* Живое лицо луны */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Глазки */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--muted) / 0.9)`,
                width: size * 0.08,
                height: size * 0.06,
                top: '32%',
                left: '28%',
                animation: 'eyeBlink 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--muted) / 0.9)`,
                width: size * 0.08,
                height: size * 0.06,
                top: '32%',
                right: '28%',
                animation: 'eyeBlink 3.2s ease-in-out infinite'
              }}
            />
            
            {/* Зрачки */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--background))`,
                width: size * 0.04,
                height: size * 0.04,
                top: '34%',
                left: '30%',
                animation: 'eyeMove 5s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--background))`,
                width: size * 0.04,
                height: size * 0.04,
                top: '34%',
                right: '30%',
                animation: 'eyeMove 5.3s ease-in-out infinite'
              }}
            />
            
            {/* Улыбка */}
            <div 
              className="absolute"
              style={{
                width: size * 0.15,
                height: size * 0.08,
                top: '55%',
                left: '50%',
                transform: 'translateX(-50%)',
                borderBottom: `${size * 0.02}px solid hsl(var(--muted) / 0.8)`,
                borderRadius: '0 0 50px 50px',
                animation: 'smile 4s ease-in-out infinite'
              }}
            />
            
            {/* Щечки */}
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--primary) / 0.3)`,
                width: size * 0.06,
                height: size * 0.06,
                top: '45%',
                left: '15%',
                animation: 'cheekGlow 3s ease-in-out infinite'
              }}
            />
            <div 
              className="absolute rounded-full"
              style={{
                background: `hsl(var(--primary) / 0.3)`,
                width: size * 0.06,
                height: size * 0.06,
                top: '45%',
                right: '15%',
                animation: 'cheekGlow 3.5s ease-in-out infinite'
              }}
            />
          </div>

          {/* Мультяшные кратеры */}
          <div className="absolute inset-0">
            {[
              { top: '20%', right: '20%', size: 0.05, delay: '0s' },
              { top: '70%', left: '25%', size: 0.04, delay: '1s' },
              { top: '65%', right: '35%', size: 0.03, delay: '2s' }
            ].map((crater, i) => (
              <div 
                key={i}
                className="absolute rounded-full"
                style={{
                  background: `hsl(var(--muted) / 0.6)`,
                  width: size * crater.size,
                  height: size * crater.size,
                  top: crater.top,
                  left: crater.left,
                  right: crater.right,
                  animation: `craterPulse 2s ease-in-out infinite`,
                  animationDelay: crater.delay
                }}
              />
            ))}
          </div>

          {/* Фаза луны */}
          <div 
            className="absolute inset-0 rounded-full transition-all duration-1000"
            style={{
              background: `hsl(var(--background) / 0.9)`,
              clipPath: isWaxing 
                ? `inset(0 0 0 ${50 + illumination}%)`
                : `inset(0 ${50 + illumination}% 0 0)`
            }}
          />
        </div>

        {/* Анимированный процент */}
        <div 
          className="mt-3 px-3 py-1 rounded-full text-sm font-bold"
          style={{
            background: `linear-gradient(135deg, 
              hsl(var(--accent) / 0.9) 0%, 
              hsl(var(--primary) / 0.7) 100%
            )`,
            color: `hsl(var(--background))`,
            animation: 'percentBounce 2s ease-in-out infinite'
          }}
        >
          {percentage}%
        </div>

        {/* CSS анимации */}
        <style>
          {`
            @keyframes moonGlow {
              0%, 100% { filter: brightness(1) hue-rotate(0deg); }
              50% { filter: brightness(1.1) hue-rotate(5deg); }
            }
            
            @keyframes moonRotate {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
            
            @keyframes eyeBlink {
              0%, 90%, 100% { transform: scaleY(1); }
              95% { transform: scaleY(0.1); }
            }
            
            @keyframes eyeMove {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(-20%); }
              75% { transform: translateX(20%); }
            }
            
            @keyframes smile {
              0%, 100% { transform: translateX(-50%) scaleY(1); }
              50% { transform: translateX(-50%) scaleY(1.2); }
            }
            
            @keyframes cheekGlow {
              0%, 100% { opacity: 0.3; transform: scale(1); }
              50% { opacity: 0.6; transform: scale(1.2); }
            }
            
            @keyframes craterPulse {
              0%, 100% { transform: scale(1); opacity: 0.6; }
              50% { transform: scale(1.1); opacity: 0.8; }
            }
            
            @keyframes percentBounce {
              0%, 100% { transform: scale(1); }
              50% { transform: scale(1.05); }
            }
            
            @keyframes twinkle-0 {
              0%, 100% { opacity: 0.3; transform: scale(0.8) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.2) rotate(180deg); }
            }
            
            @keyframes twinkle-1 {
              0%, 100% { opacity: 0.4; transform: scale(0.9) rotate(0deg); }
              50% { opacity: 0.8; transform: scale(1.1) rotate(180deg); }
            }
            
            @keyframes twinkle-2 {
              0%, 100% { opacity: 0.2; transform: scale(1) rotate(0deg); }
              50% { opacity: 0.9; transform: scale(1.3) rotate(180deg); }
            }
            
            @keyframes twinkle-3 {
              0%, 100% { opacity: 0.5; transform: scale(0.7) rotate(0deg); }
              50% { opacity: 1; transform: scale(1.4) rotate(180deg); }
            }
            
            @keyframes twinkle-4 {
              0%, 100% { opacity: 0.3; transform: scale(0.9) rotate(0deg); }
              50% { opacity: 0.7; transform: scale(1.1) rotate(180deg); }
            }
            
            @keyframes twinkle-5 {
              0%, 100% { opacity: 0.4; transform: scale(1.1) rotate(0deg); }
              50% { opacity: 0.9; transform: scale(1.2) rotate(180deg); }
            }
          `}
        </style>
        
        {/* Мистический тултип */}
        <div className="absolute -bottom-9 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-card/95 backdrop-blur-sm border border-accent/20 rounded-lg px-3 py-2 text-xs font-medium whitespace-nowrap pointer-events-none z-30 shadow-xl">
          <div className="text-accent font-semibold">{getMoonPhaseName(moonPhase)}</div>
          <div className="text-muted-foreground text-[10px] mt-0.5">
            {Math.round(moonPhase * 100)}% цикла
          </div>
        </div>
      </div>
    );
  };

  return createLiveMoon();
};

export default MoonPhase;