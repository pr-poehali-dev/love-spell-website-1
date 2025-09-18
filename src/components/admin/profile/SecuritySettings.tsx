import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  totpEnabled: boolean;
  lastLogin: string | null;
  createdAt: string | null;
}

interface TotpSetupState {
  secret: string;
  qrCode: string;
  showSetup: boolean;
  verificationCode: string;
  settingUp: boolean;
}

interface SecuritySettingsProps {
  profile: UserProfile | null;
  totpSetup: TotpSetupState;
  onSetupTotp: () => void;
  onDisableTotp: () => void;
}

export default function SecuritySettings({ 
  profile, 
  totpSetup, 
  onSetupTotp, 
  onDisableTotp 
}: SecuritySettingsProps) {
  return (
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
                <Button variant="outline" size="sm" onClick={onDisableTotp}>
                  Отключить
                </Button>
              ) : (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={onSetupTotp}
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
  );
}