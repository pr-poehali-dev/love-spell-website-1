import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface ImapSettings {
  imapHost: string;
  imapPort: number;
  imapUsername: string;
  imapPassword: string;
  encryptionType: string;
  autoReplyEnabled: boolean;
  isActive: boolean;
}

interface ImapSettingsProps {
  imapSettings: ImapSettings;
  saving: boolean;
  onImapChange: (updates: Partial<ImapSettings>) => void;
  onSave: (e: React.FormEvent) => void;
}

export default function ImapSettings({
  imapSettings,
  saving,
  onImapChange,
  onSave
}: ImapSettingsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Icon name="Mail" size={20} />
          Настройки IMAP
          {imapSettings.isActive && (
            <Badge variant="default">Активно</Badge>
          )}
        </CardTitle>
        <CardDescription>
          Конфигурация для получения email через IMAP
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSave} className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="imapHost">IMAP Хост *</Label>
              <Input
                id="imapHost"
                value={imapSettings.imapHost}
                onChange={(e) => onImapChange({ imapHost: e.target.value })}
                placeholder="imap.gmail.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="imapPort">Порт *</Label>
              <Input
                id="imapPort"
                type="number"
                value={imapSettings.imapPort}
                onChange={(e) => onImapChange({ imapPort: parseInt(e.target.value) || 993 })}
                required
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="imapUsername">Логин *</Label>
              <Input
                id="imapUsername"
                value={imapSettings.imapUsername}
                onChange={(e) => onImapChange({ imapUsername: e.target.value })}
                placeholder="user@gmail.com"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="imapPassword">Пароль *</Label>
              <Input
                id="imapPassword"
                type="password"
                value={imapSettings.imapPassword}
                onChange={(e) => onImapChange({ imapPassword: e.target.value })}
                placeholder="Введите пароль"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="imapEncryption">Тип шифрования</Label>
            <Select
              value={imapSettings.encryptionType}
              onValueChange={(value) => onImapChange({ encryptionType: value })}
            >
              <SelectTrigger className="mt-2">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SSL">SSL</SelectItem>
                <SelectItem value="TLS">TLS</SelectItem>
                <SelectItem value="NONE">Без шифрования</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="autoReply"
              checked={imapSettings.autoReplyEnabled}
              onCheckedChange={(checked) => onImapChange({ autoReplyEnabled: checked })}
            />
            <Label htmlFor="autoReply">Включить автоответчик</Label>
          </div>

          <Button type="submit" disabled={saving}>
            {saving ? (
              <>
                <Icon name="Loader2" size={16} className="animate-spin mr-2" />
                Сохранение...
              </>
            ) : (
              'Сохранить IMAP'
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}