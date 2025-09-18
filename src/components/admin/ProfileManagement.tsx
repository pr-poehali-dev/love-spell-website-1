import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContextReal';

const PROFILE_API_URL = 'https://functions.poehali.dev/82cc712c-4bde-4a84-9f35-35eabb28a934';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  totpEnabled: boolean;
  lastLogin: string | null;
  createdAt: string | null;
}

export default function ProfileManagement() {
  const { user } = useAuth();
  const { toast } = useToast();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  
  // Форма обновления профиля
  const [profileForm, setProfileForm] = useState({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // TOTP настройки
  const [totpSetup, setTotpSetup] = useState({
    secret: '',
    qrCode: '',
    showSetup: false,
    verificationCode: '',
    settingUp: false
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const token = localStorage.getItem('admin_auth');
      if (!token) return;
      
      const authData = JSON.parse(token);
      
      const response = await fetch(`${PROFILE_API_URL}/profile`, {
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setProfile(data.user);
        setProfileForm(prev => ({
          ...prev,
          email: data.user.email
        }));
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить профиль"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profileForm.currentPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите текущий пароль"
      });
      return;
    }
    
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают"
      });
      return;
    }
    
    setUpdating(true);
    
    try {
      const token = localStorage.getItem('admin_auth');
      if (!token) return;
      
      const authData = JSON.parse(token);
      
      const response = await fetch(`${PROFILE_API_URL}/profile/update`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: profileForm.email !== profile?.email ? profileForm.email : undefined,
          password: profileForm.newPassword || undefined,
          currentPassword: profileForm.currentPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Профиль обновлен"
        });
        
        // Очищаем форму
        setProfileForm(prev => ({
          ...prev,
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        }));
        
        // Перезагружаем профиль
        await loadProfile();
      } else {
        throw new Error(data.error || 'Update failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось обновить профиль"
      });
    } finally {
      setUpdating(false);
    }
  };

  const handleSetupTotp = async () => {
    setTotpSetup(prev => ({ ...prev, settingUp: true }));
    
    try {
      const token = localStorage.getItem('admin_auth');
      if (!token) return;
      
      const authData = JSON.parse(token);
      
      const response = await fetch(`${PROFILE_API_URL}/profile/setup-totp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setTotpSetup(prev => ({
          ...prev,
          secret: data.secret,
          qrCode: data.qrCode,
          showSetup: true,
          settingUp: false
        }));
      } else {
        throw new Error(data.error || 'TOTP setup failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось настроить TOTP"
      });
      setTotpSetup(prev => ({ ...prev, settingUp: false }));
    }
  };

  const handleEnableTotp = async () => {
    if (!totpSetup.verificationCode) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите код из приложения"
      });
      return;
    }
    
    try {
      const token = localStorage.getItem('admin_auth');
      if (!token) return;
      
      const authData = JSON.parse(token);
      
      const response = await fetch(`${PROFILE_API_URL}/profile/enable-totp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          totpCode: totpSetup.verificationCode
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Двухфакторная аутентификация включена"
        });
        
        setTotpSetup({
          secret: '',
          qrCode: '',
          showSetup: false,
          verificationCode: '',
          settingUp: false
        });
        
        await loadProfile();
      } else {
        throw new Error(data.error || 'TOTP enable failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Неверный код"
      });
    }
  };

  const handleDisableTotp = async () => {
    try {
      const token = localStorage.getItem('admin_auth');
      if (!token) return;
      
      const authData = JSON.parse(token);
      
      const response = await fetch(`${PROFILE_API_URL}/profile/disable-totp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Двухфакторная аутентификация отключена"
        });
        
        await loadProfile();
      } else {
        throw new Error(data.error || 'TOTP disable failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось отключить TOTP"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icon name="Loader2" size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Управление профилем</h2>
        <p className="text-muted-foreground">Настройка аккаунта и безопасности</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Информация о профиле</CardTitle>
              <CardDescription>Управление основными данными аккаунта</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUpdateProfile} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="username">Логин</Label>
                    <Input
                      id="username"
                      value={profile?.username || ''}
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Логин нельзя изменить</p>
                  </div>
                  
                  <div>
                    <Label htmlFor="role">Роль</Label>
                    <div className="mt-2">
                      <Badge variant="default">{profile?.role === 'admin' ? 'Администратор' : 'Пользователь'}</Badge>
                    </div>
                  </div>
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, email: e.target.value }))}
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="newPassword">Новый пароль</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={profileForm.newPassword}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, newPassword: e.target.value }))}
                      placeholder="Оставьте пустым, если не хотите менять"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      value={profileForm.confirmPassword}
                      onChange={(e) => setProfileForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                      placeholder="Повторите новый пароль"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentPassword">Текущий пароль *</Label>
                  <Input
                    id="currentPassword"
                    type="password"
                    value={profileForm.currentPassword}
                    onChange={(e) => setProfileForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                    placeholder="Введите текущий пароль для подтверждения"
                    required
                  />
                </div>

                <Button type="submit" disabled={updating}>
                  {updating ? (
                    <>
                      <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                      Сохранение...
                    </>
                  ) : (
                    'Сохранить изменения'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle>Двухфакторная аутентификация</CardTitle>
              <CardDescription>
                Дополнительная защита вашего аккаунта с помощью TOTP
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Icon 
                      name={profile?.totpEnabled ? "ShieldCheck" : "Shield"} 
                      size={20} 
                      className={profile?.totpEnabled ? "text-green-600" : "text-gray-400"} 
                    />
                    <div>
                      <p className="font-medium">TOTP аутентификация</p>
                      <p className="text-sm text-muted-foreground">
                        {profile?.totpEnabled 
                          ? "Двухфакторная аутентификация включена" 
                          : "Двухфакторная аутентификация отключена"}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <Badge variant={profile?.totpEnabled ? "default" : "secondary"}>
                      {profile?.totpEnabled ? "Включена" : "Отключена"}
                    </Badge>
                    
                    {profile?.totpEnabled ? (
                      <Button variant="outline" size="sm" onClick={handleDisableTotp}>
                        Отключить
                      </Button>
                    ) : (
                      <Button 
                        variant="default" 
                        size="sm" 
                        onClick={handleSetupTotp}
                        disabled={totpSetup.settingUp}
                      >
                        {totpSetup.settingUp ? (
                          <>
                            <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                            Настройка...
                          </>
                        ) : (
                          'Включить'
                        )}
                      </Button>
                    )}
                  </div>
                </div>

                {profile?.totpEnabled && (
                  <div className="p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                    <div className="flex items-center gap-2 mb-2">
                      <Icon name="CheckCircle" size={16} className="text-green-600" />
                      <span className="font-medium text-green-900 dark:text-green-100">
                        Двухфакторная аутентификация активна
                      </span>
                    </div>
                    <p className="text-sm text-green-700 dark:text-green-300">
                      Ваш аккаунт защищен дополнительным уровнем безопасности. 
                      При входе потребуется код из приложения аутентификатора.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог настройки TOTP */}
      <Dialog open={totpSetup.showSetup} onOpenChange={(open) => 
        setTotpSetup(prev => ({ ...prev, showSetup: open }))
      }>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Настройка двухфакторной аутентификации</DialogTitle>
            <DialogDescription>
              Отсканируйте QR-код приложением аутентификатора и введите код для подтверждения
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            {totpSetup.qrCode && (
              <div className="text-center">
                <img 
                  src={totpSetup.qrCode} 
                  alt="QR код для TOTP" 
                  className="mx-auto mb-4 border rounded-lg"
                />
                <p className="text-sm text-muted-foreground mb-2">
                  Или введите секрет вручную:
                </p>
                <code className="px-3 py-1 bg-muted rounded text-sm font-mono">
                  {totpSetup.secret}
                </code>
              </div>
            )}
            
            <div>
              <Label htmlFor="totpCode">Код из приложения</Label>
              <Input
                id="totpCode"
                type="text"
                value={totpSetup.verificationCode}
                onChange={(e) => setTotpSetup(prev => ({ 
                  ...prev, 
                  verificationCode: e.target.value.replace(/\D/g, '').slice(0, 6) 
                }))}
                placeholder="000000"
                maxLength={6}
                className="text-center text-lg tracking-widest"
              />
            </div>
            
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => setTotpSetup(prev => ({ ...prev, showSetup: false }))}
              >
                Отмена
              </Button>
              <Button 
                className="flex-1"
                onClick={handleEnableTotp}
                disabled={totpSetup.verificationCode.length !== 6}
              >
                Включить TOTP
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}