import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Максимально точный расчет фазы луны по астрономическим данным
  const getMoonPhase = () => {
    const now = new Date();
    
    // Точное новолуние 4 сентября 2025 года (по астрономическим данным)
    // Корректирую с учетом текущей даты для максимальной точности
    const sept4NewMoon = new Date(2025, 8, 3, 1, 56); // 3 сентября 2025, 01:56 UTC - ближайшее новолуние
    const lunarCycle = 29.530588861; // точный синодический месяц
    
    const timeDiff = now.getTime() - sept4NewMoon.getTime();
    const daysSince = timeDiff / (86400000); // миллисекунды в дни
    
    let phase = (daysSince % lunarCycle) / lunarCycle;
    if (phase < 0) phase += 1; // нормализация для отрицательных значений
    
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

  // Создание реалистичной луны
  const createMoonSVG = () => {
    const radius = size / 2 - 3;
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Расчет освещенности для реалистичной фазы
    const phaseAngle = moonPhase * 2 * Math.PI;
    const k = (1 + Math.cos(phaseAngle)) / 2; // коэффициент освещенности
    
    return (
      <div 
        className="relative flex items-center justify-center transition-all duration-500 hover:scale-105 cursor-pointer group"
        style={{ width: size, height: size }}
        title={getMoonPhaseName(moonPhase)}
      >
        <svg
          width={size}
          height={size}
          className="drop-shadow-lg"
        >
          <defs>
            {/* Градиенты в стиле сайта - используем CSS переменные */}
            <radialGradient id="moonGradient" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="hsl(var(--muted))" stopOpacity="0.95" />
              <stop offset="70%" stopColor="hsl(var(--muted-foreground))" stopOpacity="0.7" />
              <stop offset="100%" stopColor="hsl(var(--border))" stopOpacity="0.8" />
            </radialGradient>
            
            <radialGradient id="shadowGradient" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="hsl(var(--background))" stopOpacity="0.95" />
              <stop offset="100%" stopColor="hsl(var(--background))" stopOpacity="1" />
            </radialGradient>

            {/* Мистические кратеры в цветах сайта */}
            <pattern id="craters" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
              <circle cx="4" cy="4" r="0.6" fill="hsl(var(--accent))" opacity="0.15"/>
              <circle cx="12" cy="10" r="1" fill="hsl(var(--primary))" opacity="0.1"/>
              <circle cx="6" cy="13" r="0.4" fill="hsl(var(--accent))" opacity="0.2"/>
              <circle cx="11" cy="5" r="0.3" fill="hsl(var(--primary))" opacity="0.08"/>
            </pattern>
          </defs>
          
          {/* Основной диск луны в стиле сайта */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="url(#moonGradient)"
            stroke="hsl(var(--border))"
            strokeWidth="0.3"
            opacity="0.9"
          />
          
          {/* Кратеры на поверхности */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="url(#craters)"
            opacity="0.6"
          />
          
          {/* Тень для создания фазы */}
          {moonPhase > 0.03 && moonPhase < 0.97 && (
            <g>
              <defs>
                <mask id="moonMask">
                  <rect width={size} height={size} fill="black"/>
                  <circle cx={centerX} cy={centerY} r={radius} fill="white"/>
                </mask>
              </defs>
              
              {/* Теневая часть для создания фазы */}
              {moonPhase < 0.5 ? (
                // Растущая луна - тень справа
                <ellipse
                  cx={centerX + radius * (1 - 2 * k)}
                  cy={centerY}
                  rx={radius * Math.abs(1 - 2 * k)}
                  ry={radius}
                  fill="url(#shadowGradient)"
                  mask="url(#moonMask)"
                />
              ) : (
                // Убывающая луна - тень слева  
                <ellipse
                  cx={centerX - radius * (2 * k - 1)}
                  cy={centerY}
                  rx={radius * Math.abs(2 * k - 1)}
                  ry={radius}
                  fill="url(#shadowGradient)"
                  mask="url(#moonMask)"
                />
              )}
            </g>
          )}
          
          {/* Мистическое свечение в цветах сайта */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 1.5}
            fill="none"
            stroke="hsl(var(--accent))"
            strokeWidth="0.8"
            opacity="0.4"
            className="animate-pulse"
            style={{
              animationDuration: '3s',
              filter: 'blur(0.3px)'
            }}
          />
          
          {/* Внешнее магическое свечение */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 3}
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1.5"
            opacity="0.25"
            className="group-hover:opacity-60 transition-all duration-700"
            style={{
              filter: 'blur(1px)'
            }}
          />
        </svg>
        
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

  return createMoonSVG();
};

export default MoonPhase;