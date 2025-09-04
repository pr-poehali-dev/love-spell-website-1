import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import AdminSidebar from '@/components/admin/AdminSidebar';
import SiteSettings from '@/components/admin/SiteSettings';
import EmailSettings from '@/components/admin/EmailSettings';
import Analytics from '@/components/admin/Analytics';
import MessagesChat from '@/components/admin/MessagesChat';
import SecuritySettings from '@/components/admin/SecuritySettings';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeSection, setActiveSection] = useState('overview');

  const renderContent = () => {
    switch (activeSection) {
      case 'overview':
        return <DashboardOverview />;
      case 'site-settings':
        return <SiteSettings />;
      case 'email-settings':
        return <EmailSettings />;
      case 'analytics':
        return <Analytics />;
      case 'messages':
        return <MessagesChat />;
      case 'security':
        return <SecuritySettings />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <AdminSidebar 
        collapsed={sidebarCollapsed}
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
      
      <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Icon name={sidebarCollapsed ? 'PanelLeftOpen' : 'PanelLeftClose'} size={20} />
            </Button>
            <h1 className="text-2xl font-bold">Админ Панель</h1>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">
              <Icon name="ExternalLink" size={16} className="mr-2" />
              Перейти на сайт
            </Button>
            <Button variant="ghost" size="sm">
              <Icon name="LogOut" size={16} className="mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        <div className="p-6">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

const DashboardOverview = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Заявки сегодня
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">12</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+20%</span> к вчера
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Посетители онлайн
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">8</div>
          <p className="text-xs text-muted-foreground">
            Активны сейчас
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Всего заявок
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">1,247</div>
          <p className="text-xs text-muted-foreground">
            За все время
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Конверсия
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">3.2%</div>
          <p className="text-xs text-muted-foreground">
            <span className="text-green-600">+0.5%</span> к прошлому месяцу
          </p>
        </CardContent>
      </Card>
    </div>

    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Последние заявки</CardTitle>
          <CardDescription>
            Недавние обращения клиентов
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon name="Mail" size={16} />
              </div>
              <div className="flex-1">
                <p className="font-medium">Анна К.</p>
                <p className="text-sm text-muted-foreground">
                  Интересует приворот на возврат мужа
                </p>
              </div>
              <div className="text-xs text-muted-foreground">
                {i} ч назад
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Быстрые действия</CardTitle>
          <CardDescription>
            Основные задачи управления
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Settings" size={16} className="mr-2" />
            Настройки сайта
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="Mail" size={16} className="mr-2" />
            Настройки email
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="MessageSquare" size={16} className="mr-2" />
            Обработать заявки
          </Button>
          <Button variant="outline" className="w-full justify-start">
            <Icon name="BarChart3" size={16} className="mr-2" />
            Посмотреть статистику
          </Button>
        </CardContent>
      </Card>
    </div>
  </div>
);

export default AdminDashboard;