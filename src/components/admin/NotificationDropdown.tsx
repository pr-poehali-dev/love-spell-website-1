import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface NotificationDropdownProps {
  onSectionChange: (section: string) => void;
}

const NotificationDropdown = ({ onSectionChange }: NotificationDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  // Mock уведомления
  const notifications = [
    {
      id: '1',
      type: 'message',
      title: 'Новая заявка от Анны К.',
      description: 'Интересует приворот на возврат мужа',
      time: '2 мин назад',
      unread: true
    },
    {
      id: '2', 
      type: 'message',
      title: 'Сообщение от Марии В.',
      description: 'Спасибо за консультацию!',
      time: '1 час назад',
      unread: true
    },
    {
      id: '3',
      type: 'system',
      title: 'Обновление системы',
      description: 'Доступна новая версия админ панели',
      time: '3 часа назад',
      unread: false
    }
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleNotificationClick = (notification: typeof notifications[0]) => {
    if (notification.type === 'message') {
      onSectionChange('messages');
      setIsOpen(false);
    }
  };

  const markAllAsRead = () => {
    // TODO: API call to mark all as read
    console.log('Marking all notifications as read');
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="sm" className="relative hover:bg-accent">
          <Icon name="Bell" size={16} />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 px-1.5 py-0.5 text-xs bg-red-500 text-white animate-pulse">
              {unreadCount}
            </Badge>
          )}
          <span className="sr-only">{unreadCount} новых уведомлений</span>
        </Button>
      </PopoverTrigger>
      
      <PopoverContent 
        className="w-80 max-w-[95vw] p-0" 
        align="end" 
        alignOffset={-8}
        sideOffset={8}
        onOpenAutoFocus={(e) => e.preventDefault()}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Уведомления</CardTitle>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={markAllAsRead}
                  className="text-xs h-auto p-1"
                >
                  Прочитать все
                </Button>
              )}
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {notifications.length === 0 ? (
              <div className="text-center py-6 text-muted-foreground">
                <Icon name="Bell" size={24} className="mx-auto mb-2 opacity-50" />
                <p className="text-sm">Нет новых уведомлений</p>
              </div>
            ) : (
              <div className="space-y-2 max-h-[60vh] md:max-h-80 overflow-y-auto">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      notification.unread 
                        ? 'bg-primary/5 hover:bg-primary/10 border border-primary/20' 
                        : 'bg-muted/30 hover:bg-muted/50'
                    }`}
                    onClick={() => handleNotificationClick(notification)}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        notification.type === 'message' ? 'bg-blue-100' : 'bg-yellow-100'
                      }`}>
                        <Icon 
                          name={notification.type === 'message' ? 'MessageSquare' : 'Settings'} 
                          size={14} 
                          className={notification.type === 'message' ? 'text-blue-600' : 'text-yellow-600'}
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-medium text-sm leading-tight">
                            {notification.title}
                          </p>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground leading-tight mt-1">
                          {notification.description}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {notification.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {notifications.length > 0 && (
              <div className="mt-3 pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    onSectionChange('messages');
                    setIsOpen(false);
                  }}
                >
                  <Icon name="MessageSquare" size={14} className="mr-2" />
                  Все заявки
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
};

export default NotificationDropdown;