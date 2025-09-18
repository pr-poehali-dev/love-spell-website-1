import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface SmtpSettings {
  smtpHost: string;
  smtpPort: number;
  smtpUsername: string;
  smtpPassword: string;
  senderName: string;
  senderEmail: string;
  encryptionType: string;
  isActive: boolean;
}

interface SmtpSettingsProps {
  smtpSettings: SmtpSettings;
  saving: boolean;
  testEmail: string;
  testing: boolean;
  onSmtpChange: (updates: Partial<SmtpSettings>) => void;
  onSave: (e: React.FormEvent) => void;
  onTestEmailChange: (email: string) => void;
  onTest: () => void;
}

export default function SmtpSettings({
  smtpSettings,
  saving,
  testEmail,
  testing,
  onSmtpChange,
  onSave,
  onTestEmailChange,
  onTest
}: SmtpSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Send" size={20} />
          Настройки SMTP
          {smtpSettings.isActive && (
            <Badge variant="default">Активно</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Конфигурация для отправки email через SMTP сервер
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="smtpHost">SMTP Хост *</Label>
              <Input
                id="smtpHost"
                value={smtpSettings.smtpHost}
                onChange={(e) => onSmtpChange({ smtpHost: e.target.value })}
                placeholder="smtp.gmail.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="smtpPort">Порт *</Label>
              <Input
                id="smtpPort"
                type="number"
                value={smtpSettings.smtpPort}
                onChange={(e) => onSmtpChange({ smtpPort: parseInt(e.target.value) || 587 })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="smtpUsername">Логин *</Label>
              <Input
                id="smtpUsername"
                value={smtpSettings.smtpUsername}
                onChange={(e) => onSmtpChange({ smtpUsername: e.target.value })}
                placeholder="user@gmail.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="smtpPassword">Пароль *</Label>
              <Input
                id="smtpPassword"
                type="password"
                value={smtpSettings.smtpPassword}
                onChange={(e) => onSmtpChange({ smtpPassword: e.target.value })}
                placeholder="Введите пароль"
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="senderName">Имя отправителя *</Label>
              <Input
                id="senderName"
                value={smtpSettings.senderName}
                onChange={(e) => onSmtpChange({ senderName: e.target.value })}
                placeholder="Анастасия"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="senderEmail">Email отправителя *</Label>
              <Input
                id="senderEmail"
                type="email"
                value={smtpSettings.senderEmail}
                onChange={(e) => onSmtpChange({ senderEmail: e.target.value })}
                placeholder="info@example.com"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="encryptionType">Тип шифрования</Label>
            <Select
              value={smtpSettings.encryptionType}
              onValueChange={(value) => onSmtpChange({ encryptionType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="TLS">TLS</SelectItem>
                <SelectItem value="SSL">SSL</SelectItem>
                <SelectItem value="NONE">Без шифрования</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <Button type="submit" disabled={saving}>
              {saving ? (
                <>
                  <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                  Сохранение...
                </>
              ) : (
                'Сохранить SMTP'
              )}
            </Button>
          </div>
        </form>

        {smtpSettings.isActive && (
          <div className="mt-6 p-4 border rounded-lg">
            <h4 className="font-medium mb-2">Тест SMTP</h4>
            <div className="flex gap-2">
              <Input
                placeholder="test@example.com"
                value={testEmail}
                onChange={(e) => onTestEmailChange(e.target.value)}
                type="email"
              />
              <Button 
                variant="outline" 
                onClick={onTest}
                disabled={testing}
              >
                {testing ? (
                  <>
                    <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                    Тест...
                  </>
                ) : (
                  'Тест'
                )}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}