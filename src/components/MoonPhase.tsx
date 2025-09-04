import { useState, useEffect } from 'react';

interface MoonPhaseProps {
  size?: number;
}

const MoonPhase = ({ size = 40 }: MoonPhaseProps) => {
  const [moonPhase, setMoonPhase] = useState(0);

  // Точный расчет фазы луны
  const getMoonPhase = () => {
    const now = new Date();
    
    // Известное новолуние: 6 января 2000, 18:14 UTC
    const knownNewMoon = new Date(2000, 0, 6, 18, 14);
    const lunarCycle = 29.530588853; // точный лунный цикл в днях
    
    const daysSinceNewMoon = (now.getTime() - knownNewMoon.getTime()) / (1000 * 60 * 60 * 24);
    const phase = (daysSinceNewMoon % lunarCycle) / lunarCycle;
    
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
            {/* Градиенты для реалистичной луны */}
            <radialGradient id="moonGradient" cx="0.3" cy="0.3">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="70%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </radialGradient>
            
            <radialGradient id="shadowGradient" cx="0.5" cy="0.5">
              <stop offset="0%" stopColor="#1e293b" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
            </radialGradient>

            {/* Кратеры луны */}
            <pattern id="craters" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
              <circle cx="5" cy="5" r="0.8" fill="#cbd5e1" opacity="0.3"/>
              <circle cx="15" cy="12" r="1.2" fill="#94a3b8" opacity="0.4"/>
              <circle cx="8" cy="16" r="0.5" fill="#64748b" opacity="0.2"/>
            </pattern>
          </defs>
          
          {/* Основной диск луны */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius}
            fill="url(#moonGradient)"
            stroke="#94a3b8"
            strokeWidth="0.5"
            opacity="0.95"
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
          
          {/* Свечение луны */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 2}
            fill="none"
            stroke="rgba(248, 250, 252, 0.3)"
            strokeWidth="1"
            opacity="0.7"
            className="animate-pulse"
          />
          
          {/* Мягкое внешнее свечение */}
          <circle
            cx={centerX}
            cy={centerY}
            r={radius + 4}
            fill="none"
            stroke="rgba(248, 250, 252, 0.1)"
            strokeWidth="2"
            opacity="0.5"
            className="group-hover:opacity-80 transition-opacity duration-500"
          />
        </svg>
        
        {/* Информационный тултип */}
        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-background/90 backdrop-blur border border-border rounded-lg px-3 py-1 text-xs font-medium whitespace-nowrap pointer-events-none z-20 shadow-lg">
          {getMoonPhaseName(moonPhase)}
        </div>
      </div>
    );
  };

  return createMoonSVG();
};

export default MoonPhase;