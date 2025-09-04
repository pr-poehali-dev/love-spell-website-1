import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import Icon from '@/components/ui/icon';

interface ImapSettingsData {
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  enabled: boolean;
}

interface ImapSettingsProps {
  imapSettings: ImapSettingsData;
  setImapSettings: (settings: ImapSettingsData) => void;
  handleSaveImap: () => Promise<void>;
}

const ImapSettings = ({ imapSettings, setImapSettings, handleSaveImap }: ImapSettingsProps) => {
  return (
    <Card>
      <CardHeader className="p-4 md:p-6 pb-3">
        <CardTitle className="text-lg md:text-xl">IMAP настройки</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Настройки для получения писем и автоответчика
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 md:p-6">
        <div className="flex items-center space-x-3 p-3 rounded-lg border bg-muted/50">
          <Switch
            checked={imapSettings.enabled}
            onCheckedChange={(checked) => setImapSettings({ ...imapSettings, enabled: checked })}
          />
          <Label className="text-sm md:text-base font-medium">Включить автоответчик</Label>
        </div>

        {imapSettings.enabled && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imap-host">IMAP Хост</Label>
                <Input
                  id="imap-host"
                  value={imapSettings.host}
                  onChange={(e) => setImapSettings({ ...imapSettings, host: e.target.value })}
                  placeholder="imap.gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imap-port">Порт</Label>
                <Input
                  id="imap-port"
                  type="number"
                  value={imapSettings.port}
                  onChange={(e) => setImapSettings({ ...imapSettings, port: parseInt(e.target.value) })}
                  placeholder="993"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="imap-username">Логин</Label>
                <Input
                  id="imap-username"
                  value={imapSettings.username}
                  onChange={(e) => setImapSettings({ ...imapSettings, username: e.target.value })}
                  placeholder="your.email@gmail.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="imap-password">Пароль</Label>
                <Input
                  id="imap-password"
                  type="password"
                  value={imapSettings.password}
                  onChange={(e) => setImapSettings({ ...imapSettings, password: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="imap-encryption">Шифрование</Label>
              <Select value={imapSettings.encryption} onValueChange={(value) => 
                setImapSettings({ ...imapSettings, encryption: value })
              }>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">Без шифрования</SelectItem>
                  <SelectItem value="ssl">SSL</SelectItem>
                  <SelectItem value="tls">TLS</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </>
        )}

        <Button onClick={handleSaveImap} className="w-full md:w-auto">
          <Icon name="Save" size={16} className="mr-2" />
          Сохранить настройки
        </Button>
      </CardContent>
    </Card>
  );
};

export default ImapSettings;