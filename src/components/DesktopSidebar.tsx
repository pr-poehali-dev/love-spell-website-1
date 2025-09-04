import React from 'react';
import Icon from '@/components/ui/icon';

interface SidebarProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

const DesktopSidebar = ({ onNavigate, activeSection }: SidebarProps) => {
  const menuItems = [
    { id: 'ktoya', label: 'КТО Я', icon: 'User' },
    { id: 'obryad', label: 'ОБРЯДЫ', icon: 'Feather' },
    { id: 'otziv', label: 'ОТЗЫВЫ', icon: 'MessageSquare' },
    { id: 'contact', label: 'СВЯЗЬ', icon: 'Mail' }
  ];

  return (
    <div className="fixed left-0 top-0 h-full w-20 bg-slate-800/90 backdrop-blur-sm border-r border-slate-700/50 z-50 flex flex-col items-center py-8">
      <div className="flex flex-col space-y-8">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`
              flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300
              ${activeSection === item.id 
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                : 'text-slate-400 hover:text-amber-400 hover:bg-slate-700/50'
              }
            `}
          >
            <Icon 
              name={item.icon as any} 
              size={20} 
              className="mb-1" 
            />
            <span className="text-xs font-medium leading-tight text-center">
              {item.label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default DesktopSidebar;