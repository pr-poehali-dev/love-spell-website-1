import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Icon from '@/components/ui/icon';

interface SmtpSettingsData {
  host: string;
  port: number;
  username: string;
  password: string;
  from_name: string;
  from_email: string;
  encryption: string;
}

interface SmtpSettingsProps {
  smtpSettings: SmtpSettingsData;
  setSmtpSettings: (settings: SmtpSettingsData) => void;
  handleSaveSmtp: () => Promise<void>;
  handleTestSmtp: () => Promise<void>;
}

const SmtpSettings = ({ smtpSettings, setSmtpSettings, handleSaveSmtp, handleTestSmtp }: SmtpSettingsProps) => {
  return (
    <Card>
      <CardHeader className="p-4 md:p-6 pb-3">
        <CardTitle className="text-lg md:text-xl">SMTP настройки</CardTitle>
        <CardDescription className="text-sm md:text-base">
          Настройки для отправки писем через SMTP
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4 p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-host">SMTP Хост</Label>
            <Input
              id="smtp-host"
              value={smtpSettings.host}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, host: e.target.value })}
              placeholder="smtp.gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-port">Порт</Label>
            <Input
              id="smtp-port"
              type="number"
              value={smtpSettings.port}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, port: parseInt(e.target.value) })}
              placeholder="587"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="smtp-username">Логин</Label>
            <Input
              id="smtp-username"
              value={smtpSettings.username}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, username: e.target.value })}
              placeholder="your.email@gmail.com"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="smtp-password">Пароль</Label>
            <Input
              id="smtp-password"
              type="password"
              value={smtpSettings.password}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, password: e.target.value })}
              placeholder="••••••••"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="from-name">Имя отправителя</Label>
            <Input
              id="from-name"
              value={smtpSettings.from_name}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, from_name: e.target.value })}
              placeholder="Анастасия"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="from-email">Email отправителя</Label>
            <Input
              id="from-email"
              type="email"
              value={smtpSettings.from_email}
              onChange={(e) => setSmtpSettings({ ...smtpSettings, from_email: e.target.value })}
              placeholder="info@example.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="encryption">Шифрование</Label>
          <Select value={smtpSettings.encryption} onValueChange={(value) => 
            setSmtpSettings({ ...smtpSettings, encryption: value })
          }>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">Без шифрования</SelectItem>
              <SelectItem value="tls">TLS</SelectItem>
              <SelectItem value="ssl">SSL</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col md:flex-row gap-2 pt-4">
          <Button onClick={handleSaveSmtp} className="w-full md:w-auto">
            <Icon name="Save" size={16} className="mr-2" />
            Сохранить
          </Button>
          <Button variant="outline" onClick={handleTestSmtp} className="w-full md:w-auto">
            <Icon name="Send" size={16} className="mr-2" />
            Тест соединения
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmtpSettings;