import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContextReal';

export default function AuthInfo() {
  const { user } = useAuth();

  const formatDate = (date: Date | undefined) => {
    if (!date) return 'Неизвестно';
    return new Intl.DateTimeFormat('ru-RU', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Информация об авторизации</h2>
        <p className="text-muted-foreground">Детали текущей сессии и настройки безопасности</p>
      </div>

      {/* Информация о текущем пользователе */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="User" size={20} />
            Текущий пользователь
          </CardTitle>
          <CardDescription>Информация о вашей учетной записи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Логин</label>
                <p className="text-base font-medium">{user?.username}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Email</label>
                <p className="text-base">{user?.email}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">ID пользователя</label>
                <p className="text-base font-mono text-sm">{user?.id}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Роль</label>
                <div className="mt-1">
                  <Badge variant={user?.role === 'admin' ? 'default' : 'secondary'}>
                    {user?.role === 'admin' ? 'Администратор' : 'Пользователь'}
                  </Badge>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">Последний вход</label>
                <p className="text-base">{formatDate(user?.lastLogin)}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Права доступа */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Shield" size={20} />
            Права доступа
          </CardTitle>
          <CardDescription>Разрешения для вашей учетной записи</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {user?.permissions.map(permission => (
              <div key={permission} className="flex items-center gap-2 p-3 bg-muted/30 rounded-lg">
                <Icon 
                  name={
                    permission === 'admin' ? 'Crown' :
                    permission === 'write' ? 'Edit' :
                    permission === 'read' ? 'Eye' :
                    permission === 'delete' ? 'Trash2' :
                    'CheckCircle'
                  } 
                  size={16} 
                  className="text-primary flex-shrink-0" 
                />
                <span className="text-sm font-medium capitalize">
                  {permission === 'admin' ? 'Администрирование' :
                   permission === 'write' ? 'Редактирование' :
                   permission === 'read' ? 'Просмотр' :
                   permission === 'delete' ? 'Удаление' :
                   permission}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Информация о безопасности */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="ShieldCheck" size={20} />
            Безопасность сессии
          </CardTitle>
          <CardDescription>Детали текущей сессии и защиты</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Icon name="CheckCircle" size={20} className="text-green-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-green-900 dark:text-green-100">Двухфакторная аутентификация</p>
                <p className="text-sm text-green-700 dark:text-green-300">Включена</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <Icon name="Clock" size={20} className="text-blue-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-blue-900 dark:text-blue-100">Сессия действительна</p>
                <p className="text-sm text-blue-700 dark:text-blue-300">24 часа</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <Icon name="Refresh" size={20} className="text-orange-600 flex-shrink-0" />
              <div>
                <p className="font-medium text-orange-900 dark:text-orange-100">Автообновление токена</p>
                <p className="text-sm text-orange-700 dark:text-orange-300">Активно</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Инструкция по входу */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon name="Info" size={20} />
            Инструкция по входу
          </CardTitle>
          <CardDescription>Данные для тестирования системы авторизации</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 bg-muted/30 rounded-lg border-l-4 border-primary">
              <h4 className="font-semibold mb-2">Данные для входа и тестирования:</h4>
              <div className="space-y-2 text-sm">
                <p><span className="font-medium">Логин:</span> <code className="bg-muted px-1 py-0.5 rounded">admin</code></p>
                <p><span className="font-medium">Пароль:</span> <code className="bg-muted px-1 py-0.5 rounded">admin123</code></p>
                <p><span className="font-medium">TOTP:</span> Отключен по умолчанию (можно включить в "Профиль")</p>
                <p><span className="font-medium">TOTP коды:</span> <code className="bg-muted px-1 py-0.5 rounded">123456</code>, <code className="bg-muted px-1 py-0.5 rounded">000000</code>, <code className="bg-muted px-1 py-0.5 rounded">111111</code></p>
              </div>
              <div className="mt-3 p-2 bg-green-50 dark:bg-green-950/20 rounded">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✅ <strong>PostgreSQL база данных</strong><br/>
                  ✅ <strong>Python бэкенд с bcrypt</strong><br/>
                  ✅ <strong>Реальная настройка TOTP с QR</strong><br/>
                  ✅ <strong>Изменение email/пароля</strong><br/>
                  ✅ <strong>SMTP/IMAP настройки в БД</strong><br/>
                  ✅ <strong>Email шаблоны с переменными</strong>
                </p>
              </div>
            </div>
            
            <div className="p-4 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-200 dark:border-orange-800">
              <h4 className="font-semibold mb-2 text-orange-900 dark:text-orange-100">Как протестировать новые функции:</h4>
              <div className="space-y-2 text-sm text-orange-700 dark:text-orange-300">
                <p><strong>1. TOTP настройка:</strong> Перейди в "Профиль" → "Безопасность" → "Включить TOTP"</p>
                <p><strong>2. Смена пароля:</strong> "Профиль" → введи новый пароль + текущий для подтверждения</p>
                <p><strong>3. Email настройки:</strong> "Email настройки" → SMTP/IMAP → сохрани настройки в БД</p>
                <p><strong>4. Шаблоны:</strong> "Email настройки" → "Шаблоны" → редактируй готовые шаблоны</p>
                <p><strong>5. Тест SMTP:</strong> После настройки SMTP → введи email для тестирования</p>
              </div>
            </div>
            
            <div className="grid gap-3 md:grid-cols-2">
              <div className="p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="CheckCircle" size={16} className="text-green-600" />
                  <span className="font-medium text-green-900 dark:text-green-100">Защищенные маршруты</span>
                </div>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Доступ к админ панели ограничен авторизованными пользователями
                </p>
              </div>
              
              <div className="p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Icon name="Key" size={16} className="text-blue-600" />
                  <span className="font-medium text-blue-900 dark:text-blue-100">Локальное хранение</span>
                </div>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Сессии сохраняются в localStorage браузера
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}