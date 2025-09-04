import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const SecuritySettings = () => {
  const [totpEnabled, setTotpEnabled] = useState(true);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [totpSecret, setTotpSecret] = useState('');
  const [qrCodeUrl, setQrCodeUrl] = useState('');

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      alert('Пароли не совпадают');
      return;
    }
    
    if (newPassword.length < 8) {
      alert('Пароль должен содержать минимум 8 символов');
      return;
    }

    // TODO: API call to change password
    // const response = await api.changePassword(currentPassword, newPassword);
    console.log('Changing password...');
    
    // Clear form
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
  };

  const handleSetupTotp = async () => {
    // TODO: API call to setup TOTP
    // const response = await api.setupTotp();
    // setTotpSecret(response.secret);
    // setQrCodeUrl(response.qrCodeUrl);
    
    // Mock data
    setTotpSecret('JBSWY3DPEHPK3PXP');
    setQrCodeUrl('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==');
  };

  const handleDisableTotp = async () => {
    // TODO: API call to disable TOTP
    console.log('Disabling TOTP...');
    setTotpEnabled(false);
    setTotpSecret('');
    setQrCodeUrl('');
  };

  const passwordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const getStrengthColor = (strength: number) => {
    if (strength <= 2) return 'bg-red-500';
    if (strength <= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getStrengthText = (strength: number) => {
    if (strength <= 2) return 'Слабый';
    if (strength <= 3) return 'Средний';
    return 'Сильный';
  };

  const strength = passwordStrength(newPassword);

  return (
    <div className="space-y-4 md:space-y-6">
      <div>
        <h2 className="text-lg md:text-2xl font-bold">Настройки безопасности</h2>
        <p className="text-muted-foreground text-sm md:text-base">
          Двухфакторная аутентификация и смена пароля
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        {/* Смена пароля */}
        <Card>
          <CardHeader className="p-4 md:p-6 pb-3">
            <CardTitle className="text-lg md:text-xl">Смена пароля</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Обновите свой пароль для входа в админ панель
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className="space-y-2">
              <Label htmlFor="current-password">Текущий пароль</Label>
              <Input
                id="current-password"
                type="password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Введите текущий пароль"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Новый пароль</Label>
              <Input
                id="new-password"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Введите новый пароль"
              />
              {newPassword && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${getStrengthColor(strength)} transition-all`}
                        style={{ width: `${(strength / 5) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {getStrengthText(strength)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Подтвердите пароль</Label>
              <Input
                id="confirm-password"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Повторите новый пароль"
              />
            </div>

            <Button 
              onClick={handleChangePassword}
              disabled={!currentPassword || !newPassword || newPassword !== confirmPassword || strength < 3}
              className="w-full"
            >
              <Icon name="Save" size={16} className="mr-2" />
              Сменить пароль
            </Button>
          </CardContent>
        </Card>

        {/* TOTP настройки */}
        <Card>
          <CardHeader className="p-4 md:p-6 pb-3">
            <CardTitle className="text-lg md:text-xl">Двухфакторная аутентификация</CardTitle>
            <CardDescription className="text-sm md:text-base">
              Дополнительная защита вашего аккаунта
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 p-4 md:p-6">
            <div className="flex items-center justify-between p-3 md:p-4 border rounded-lg">
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-sm md:text-base">TOTP Аутентификация</h4>
                <p className="text-xs md:text-sm text-muted-foreground">
                  {totpEnabled ? 'Активна' : 'Отключена'}
                </p>
              </div>
              <Switch
                checked={totpEnabled}
                onCheckedChange={setTotpEnabled}
                className="flex-shrink-0"
              />
            </div>

            {totpEnabled && (
              <Alert>
                <Icon name="Shield" size={16} />
                <AlertDescription>
                  Двухфакторная аутентификация активна. Для входа требуется код из приложения.
                </AlertDescription>
              </Alert>
            )}

            <div className="space-y-2">
              {totpEnabled ? (
                <div className="space-y-3">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="w-full">
                        <Icon name="QrCode" size={16} className="mr-2" />
                        Показать QR код
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="w-[95vw] max-w-md">
                      <DialogHeader>
                        <DialogTitle className="text-lg md:text-xl">QR код для настройки</DialogTitle>
                        <DialogDescription className="text-sm md:text-base">
                          Отсканируйте этот код в приложении Google Authenticator или Authy
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        {qrCodeUrl ? (
                          <div className="text-center">
                            <img 
                              src={qrCodeUrl} 
                              alt="QR Code" 
                              className="mx-auto border rounded-lg w-40 h-40 md:w-50 md:h-50"
                            />
                          </div>
                        ) : (
                          <div className="text-center py-8">
                            <Icon name="QrCode" size={48} className="mx-auto mb-4 text-muted-foreground" />
                            <p className="text-muted-foreground">QR код не сгенерирован</p>
                            <Button onClick={handleSetupTotp} className="mt-2">
                              Сгенерировать код
                            </Button>
                          </div>
                        )}
                        
                        {totpSecret && (
                          <div>
                            <Label className="text-sm">Секретный ключ (ручной ввод)</Label>
                            <div className="flex gap-2">
                              <Input value={totpSecret} readOnly className="font-mono text-xs" />
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigator.clipboard.writeText(totpSecret)}
                                className="h-10 w-10 p-0"
                              >
                                <Icon name="Copy" size={14} />
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Button
                    variant="destructive"
                    onClick={handleDisableTotp}
                    className="w-full"
                  >
                    <Icon name="ShieldOff" size={16} className="mr-2" />
                    Отключить TOTP
                  </Button>
                </div>
              ) : (
                <Button onClick={handleSetupTotp} className="w-full">
                  <Icon name="ShieldCheck" size={16} className="mr-2" />
                  Настроить TOTP
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Рекомендации по безопасности */}
      <Card>
        <CardHeader className="p-4 md:p-6 pb-3">
          <CardTitle className="text-lg md:text-xl">Рекомендации по безопасности</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Советы для защиты вашего аккаунта
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                icon: 'Lock',
                title: 'Сильный пароль',
                description: 'Используйте пароли длиной не менее 12 символов с разными типами символов'
              },
              {
                icon: 'Smartphone',
                title: 'Двухфакторная аутентификация',
                description: 'Всегда включайте 2FA для дополнительной защиты'
              },
              {
                icon: 'RefreshCw',
                title: 'Регулярное обновление',
                description: 'Меняйте пароли каждые 3-6 месяцев'
              },
              {
                icon: 'AlertTriangle',
                title: 'Подозрительная активность',
                description: 'Сразу сообщайте о любых подозрительных входах в систему'
              }
            ].map((tip) => (
              <div key={tip.title} className="flex gap-2 md:gap-3 p-3 md:p-4 border rounded-lg">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon name={tip.icon as any} size={16} className="md:w-5 md:h-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium mb-1 text-sm md:text-base">{tip.title}</h4>
                  <p className="text-xs md:text-sm text-muted-foreground leading-tight">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecuritySettings;