import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const ProfileSettings = () => {
  const [currentEmail, setCurrentEmail] = useState('admin@site.com');
  const [newEmail, setNewEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const [step, setStep] = useState<'input' | 'verify'>('input');
  const [isEmailVerified, setIsEmailVerified] = useState(true);

  const handleSendVerification = async () => {
    // TODO: API call to send verification code
    console.log('Sending verification code to:', newEmail);
    setStep('verify');
  };

  const handleVerifyEmail = async () => {
    // TODO: API call to verify code and change email
    console.log('Verifying code:', verificationCode);
    
    // Mock success
    setCurrentEmail(newEmail);
    setNewEmail('');
    setVerificationCode('');
    setStep('input');
    setIsChangingEmail(false);
    setIsEmailVerified(true);
  };

  const handleCancelChange = () => {
    setNewEmail('');
    setVerificationCode('');
    setStep('input');
    setIsChangingEmail(false);
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <Card>
        <CardHeader className="p-4 md:p-6 pb-3">
          <CardTitle className="text-lg md:text-xl">Основная информация</CardTitle>
          <CardDescription className="text-sm md:text-base">
            Управление аккаунтом администратора
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 md:space-y-6 p-4 md:p-6">
          {/* Email Section */}
          <div className="space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="min-w-0 flex-1">
                <Label className="text-sm md:text-base">Email адрес</Label>
                <div className="flex flex-col md:flex-row md:items-center gap-2 mt-1">
                  <p className="text-sm text-muted-foreground truncate">{currentEmail}</p>
                  {isEmailVerified ? (
                    <Badge variant="secondary" className="text-xs w-fit">
                      <Icon name="CheckCircle" size={12} className="mr-1" />
                      Подтверждён
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="text-xs w-fit">
                      <Icon name="AlertCircle" size={12} className="mr-1" />
                      Не подтверждён
                    </Badge>
                  )}
                </div>
              </div>
              
              <Dialog open={isChangingEmail} onOpenChange={setIsChangingEmail}>
                <DialogTrigger asChild>
                  <Button variant="outline" size="sm" className="w-full md:w-auto flex-shrink-0">
                    <Icon name="Edit" size={14} className="mr-2" />
                    Изменить
                  </Button>
                </DialogTrigger>
                
                <DialogContent className="w-[95vw] max-w-md max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg md:text-xl">Изменение email адреса</DialogTitle>
                    <DialogDescription className="text-sm md:text-base">
                      {step === 'input' 
                        ? 'Введите новый email адрес. На него будет отправлен код подтверждения.'
                        : 'Введите код подтверждения, отправленный на новый email.'
                      }
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="space-y-4">
                    {step === 'input' ? (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="current-email">Текущий email</Label>
                          <Input
                            id="current-email"
                            type="email"
                            value={currentEmail}
                            disabled
                            className="bg-muted"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="new-email">Новый email</Label>
                          <Input
                            id="new-email"
                            type="email"
                            value={newEmail}
                            onChange={(e) => setNewEmail(e.target.value)}
                            placeholder="new-email@example.com"
                            required
                          />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-2">
                          <Button 
                            onClick={handleSendVerification}
                            disabled={!newEmail || newEmail === currentEmail}
                            className="w-full md:w-auto"
                          >
                            <Icon name="Send" size={16} className="mr-2" />
                            Отправить код
                          </Button>
                          <Button variant="outline" onClick={handleCancelChange} className="w-full md:w-auto">
                            Отмена
                          </Button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <Label htmlFor="verification-code">Код подтверждения</Label>
                          <div className="text-sm text-muted-foreground mb-2">
                            Код отправлен на: <strong>{newEmail}</strong>
                          </div>
                          <Input
                            id="verification-code"
                            type="text"
                            value={verificationCode}
                            onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                            placeholder="123456"
                            maxLength={6}
                            className="text-center text-lg tracking-widest"
                            required
                          />
                        </div>
                        
                        <div className="flex flex-col md:flex-row gap-2">
                          <Button 
                            onClick={handleVerifyEmail}
                            disabled={verificationCode.length !== 6}
                            className="w-full md:w-auto"
                          >
                            <Icon name="Check" size={16} className="mr-2" />
                            Подтвердить
                          </Button>
                          <Button variant="outline" onClick={() => setStep('input')} className="w-full md:w-auto">
                            Назад
                          </Button>
                          <Button variant="ghost" onClick={handleCancelChange} className="w-full md:w-auto">
                            Отмена
                          </Button>
                        </div>
                        
                        <div className="text-center">
                          <Button 
                            variant="link" 
                            size="sm" 
                            onClick={handleSendVerification}
                            className="text-xs"
                          >
                            Отправить код повторно
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          {/* Additional Profile Settings */}
          <div className="space-y-4 pt-6 border-t">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Имя администратора</Label>
              <Input
                id="admin-name"
                type="text"
                defaultValue="Администратор"
                placeholder="Введите имя"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="admin-timezone">Часовой пояс</Label>
              <select 
                id="admin-timezone"
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
                defaultValue="Europe/Moscow"
              >
                <option value="Europe/Moscow">Москва (UTC+3)</option>
                <option value="Europe/Kiev">Киев (UTC+2)</option>
                <option value="Europe/Minsk">Минск (UTC+3)</option>
                <option value="Asia/Almaty">Алматы (UTC+6)</option>
              </select>
            </div>
            
            <Button className="w-full md:w-auto">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить изменения
            </Button>
          </div>
        </CardContent>
      </Card>
      
      {/* Account Activity */}
      <Card>
        <CardHeader className="p-4 md:p-6 pb-3">
          <CardTitle className="text-lg md:text-xl">Активность аккаунта</CardTitle>
          <CardDescription className="text-sm md:text-base">
            История входов и активность
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6">
          <div className="space-y-3">
            {[
              { time: '2 часа назад', device: 'Chrome на MacBook', location: 'Москва, Россия', current: true },
              { time: '1 день назад', device: 'Safari на iPhone', location: 'Москва, Россия', current: false },
              { time: '3 дня назад', device: 'Chrome на Windows', location: 'Санкт-Петербург, Россия', current: false }
            ].map((session, index) => (
              <div key={index} className="flex flex-col md:flex-row md:items-center justify-between p-3 bg-muted/30 rounded-lg gap-2">
                <div className="flex items-center gap-2 md:gap-3 min-w-0 flex-1">
                  <div className="w-6 h-6 md:w-8 md:h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <Icon name="Monitor" size={14} className="md:w-4 md:h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-xs md:text-sm truncate">{session.device}</p>
                    <p className="text-xs text-muted-foreground truncate">
                      {session.location} • {session.time}
                    </p>
                  </div>
                </div>
                {session.current && (
                  <Badge variant="secondary" className="text-xs flex-shrink-0 w-fit">
                    Текущая сессия
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSettings;