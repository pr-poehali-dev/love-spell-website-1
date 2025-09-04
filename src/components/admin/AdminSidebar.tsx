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
  },
  {
    id: 'admin-settings',
    label: 'Настройки админа',
    icon: 'UserCog',
    description: 'Безопасность, профиль'
  }
];

const AdminSidebar = ({ collapsed, activeSection, onSectionChange, onMenuItemClick }: AdminSidebarProps) => {
  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 h-full bg-card border-r transition-all duration-300 z-50",
        collapsed ? "w-16 -translate-x-full md:translate-x-0" : "w-64 translate-x-0"
      )}
    >
      <div className="p-4">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <Icon name="Crown" size={20} className="text-primary-foreground" />
          </div>
          {!collapsed && (
            <div>
              <h2 className="font-bold text-lg">Admin</h2>
              <p className="text-xs text-muted-foreground">Панель управления</p>
            </div>
          )}
        </div>

        <nav className="space-y-2">
          {menuItems.map((item) => (
            <Button
              key={item.id}
              variant={activeSection === item.id ? 'default' : 'ghost'}
              className={cn(
                "w-full justify-start h-auto p-3",
                collapsed && "px-3"
              )}
              onClick={() => {
                onSectionChange(item.id);
                onMenuItemClick?.();
              }}
            >
              <Icon name={item.icon as any} size={20} className={cn(!collapsed && "mr-3")} />
              {!collapsed && (
                <div className="text-left">
                  <div className="font-medium">{item.label}</div>
                  <div className="text-xs text-muted-foreground">
                    {item.description}
                  </div>
                </div>
              )}
            </Button>
          ))}
        </nav>
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <div className={cn(
          "p-3 bg-muted/50 rounded-lg",
          collapsed && "p-2"
        )}>
          {!collapsed ? (
            <div>
              <p className="font-medium text-sm">Администратор</p>
              <p className="text-xs text-muted-foreground">admin@site.com</p>
            </div>
          ) : (
            <div className="w-6 h-6 bg-primary rounded-full mx-auto" />
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;