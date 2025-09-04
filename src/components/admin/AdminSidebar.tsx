import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import Icon from '@/components/ui/icon';

interface AdminSidebarProps {
  collapsed: boolean;
  activeSection: string;
  onSectionChange: (section: string) => void;
  onMenuItemClick?: () => void;
}

const menuItems = [
  {
    id: 'overview',
    label: 'Обзор',
    icon: 'LayoutDashboard',
    description: 'Общая статистика'
  },
  {
    id: 'site-settings', 
    label: 'Настройки сайта',
    icon: 'Settings',
    description: 'Аватар, имя, контакты'
  },
  {
    id: 'email-settings',
    label: 'Email настройки', 
    icon: 'Mail',
    description: 'SMTP, письма, автоответчик'
  },
  {
    id: 'analytics',
    label: 'Аналитика',
    icon: 'BarChart3', 
    description: 'Статистика и метрики'
  },
  {
    id: 'messages',
    label: 'Заявки',
    icon: 'MessageSquare',
    description: 'Чат с клиентами'
  }
];

const AdminSidebar = ({ collapsed, activeSection, onSectionChange, onMenuItemClick }: AdminSidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 ease-in-out z-40",
        collapsed ? "w-16 -translate-x-full md:translate-x-0" : "w-64 translate-x-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Crown" size={20} className="text-primary-foreground" />
          </div>
          <div className={cn(
            "transition-all duration-300 overflow-hidden",
            collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
          )}>
            <h2 className="font-bold text-lg whitespace-nowrap">Admin</h2>
            <p className="text-xs text-muted-foreground whitespace-nowrap">Панель управления</p>
          </div>
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full h-auto focus:ring-2 focus:ring-ring focus:ring-offset-2",
                collapsed ? "w-10 h-10 p-0 justify-center" : "p-3 justify-start"
              )}
              onClick={() => {
                onSectionChange(item.id);
                // Закрывать меню только на мобильных устройствах
                if (window.innerWidth < 768) {
                  onMenuItemClick?.();
                }
              }}
            >
              <Icon name={item.icon as any} size={20} className="flex-shrink-0" />
              <div className={cn(
                "text-left transition-all duration-300 overflow-hidden ml-3",
                collapsed ? "w-0 opacity-0 ml-0" : "w-auto opacity-100"
              )}>
                <div className="font-medium whitespace-nowrap">{item.label}</div>
                <div className="text-xs text-muted-foreground whitespace-nowrap">
                  {item.description}
                </div>
              </div>
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={cn(
          "bg-muted/50 rounded-lg flex items-center",
          collapsed ? "p-2 justify-center" : "p-3 gap-3"
        )}>
          <div className={cn(
            "flex-1 transition-all duration-300 overflow-hidden",
            collapsed ? "hidden" : "block"
          )}>
            <p className="font-medium text-sm whitespace-nowrap">Администратор</p>
            <p className="text-xs text-muted-foreground whitespace-nowrap">admin@site.com</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 hover:bg-muted-foreground/20 flex-shrink-0"
            onClick={() => {
              onSectionChange('admin-settings');
              if (window.innerWidth < 768) {
                onMenuItemClick?.();
              }
            }}
          >
            <Icon name="Settings" size={16} />
            <span className="sr-only">Настройки администратора</span>
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;