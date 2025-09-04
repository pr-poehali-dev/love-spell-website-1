import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';

interface SidebarItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

const sidebarItems: SidebarItem[] = [
  {
    id: 'who',
    label: 'КТО Я',
    icon: 'User',
    path: '/about'
  },
  {
    id: 'rituals',
    label: 'ОБРЯДЫ',
    icon: 'Feather',
    path: '/'
  },
  {
    id: 'reviews',
    label: 'ОТЗЫВЫ',
    icon: 'MessageSquare',
    path: '/reviews'
  },
  {
    id: 'contact',
    label: 'СВЯЗЬ',
    icon: 'Mail',
    path: '/contact'
  }
];

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  const handleItemClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="hidden lg:flex lg:flex-col lg:fixed lg:left-0 lg:top-0 lg:h-full lg:w-24 lg:bg-slate-800/90 lg:backdrop-blur-sm lg:border-r lg:border-slate-700/50 lg:z-50">
      <div className="flex flex-col items-center py-8 space-y-8">
        {sidebarItems.map((item) => {
          const active = isActive(item.path);
          return (
            <button
              key={item.id}
              onClick={() => handleItemClick(item.path)}
              className={`
                flex flex-col items-center justify-center w-16 h-16 rounded-xl transition-all duration-300 group
                ${active 
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' 
                  : 'text-slate-400 hover:text-amber-400 hover:bg-slate-700/50'
                }
              `}
            >
              <Icon 
                name={item.icon as any} 
                size={24} 
                className={`mb-1 ${active ? 'text-amber-400' : 'group-hover:text-amber-400'}`} 
              />
              <span className={`
                text-xs font-medium leading-tight text-center
                ${active ? 'text-amber-400' : 'group-hover:text-amber-400'}
              `}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;