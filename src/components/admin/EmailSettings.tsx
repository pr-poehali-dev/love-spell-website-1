import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface AutoReply {
  id: string;
  name: string;
  conditions: {
    email?: string;
    contains?: string;
    exactMatch?: string;
  };
  response: string;
  delay: number;
  order: number;
  enabled: boolean;
}

const EmailSettings = () => {
  const [smtpSettings, setSmtpSettings] = useState({
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    from_name: 'Анастасия',
    from_email: 'info@example.com',
    encryption: 'tls'
  });

  const [imapSettings, setImapSettings] = useState({
    host: 'imap.gmail.com',
    port: 993,
    username: '',
    password: '',
    encryption: 'ssl',
    enabled: false
  });

  const [emailTemplates, setEmailTemplates] = useState({
    toClient: {
      subject: 'Спасибо за обращение!',
      body: `Здравствуйте!

Спасибо за ваше обращение. Я получила ваш запрос и обязательно отвечу в ближайшее время.

С уважением,
Анастасия`
    },
    toAdmin: {
      subject: 'Новая заявка с сайта',
      fields: ['name', 'email', 'phone', 'message', 'service']
    }
  });

  const [autoReplies, setAutoReplies] = useState<AutoReply[]>([
    {
      id: '1',
      name: 'Приветствие',
      conditions: { email: 'info@example.com' },
      response: 'Здравствуйте! Благодарю за обращение. Отвечу в течение дня.',
      delay: 0,
      order: 1,
      enabled: true
    },
    {
      id: '2',
      name: 'Цены на услуги',
      conditions: { contains: 'цена' },
      response: 'Цены на мои услуги зависят от сложности работы. Напишите подробнее о вашей ситуации.',
      delay: 300,
      order: 2,
      enabled: true
    }
  ]);

  const [newAutoReply, setNewAutoReply] = useState<Partial<AutoReply>>({
    name: '',
    conditions: {},
    response: '',
    delay: 0,
    enabled: true
  });

  const handleSaveSmtp = async () => {
    // TODO: API call to save SMTP settings
    console.log('Saving SMTP settings:', smtpSettings);
  };

  const handleTestSmtp = async () => {
    // TODO: API call to test SMTP connection
    console.log('Testing SMTP connection...');
  };

  const handleSaveImap = async () => {
    // TODO: API call to save IMAP settings
    console.log('Saving IMAP settings:', imapSettings);
  };

  const handleSaveTemplates = async () => {
    // TODO: API call to save email templates
    console.log('Saving email templates:', emailTemplates);
  };

  const addAutoReply = () => {
    if (newAutoReply.name && newAutoReply.response) {
      const autoReply: AutoReply = {
        id: Date.now().toString(),
        name: newAutoReply.name,
        conditions: newAutoReply.conditions || {},
        response: newAutoReply.response,
        delay: newAutoReply.delay || 0,
        order: autoReplies.length + 1,
        enabled: newAutoReply.enabled !== false
      };
      setAutoReplies([...autoReplies, autoReply]);
      setNewAutoReply({ name: '', conditions: {}, response: '', delay: 0, enabled: true });
    }
  };

  const removeAutoReply = (id: string) => {
    setAutoReplies(autoReplies.filter(reply => reply.id !== id));
  };

  const toggleAutoReply = (id: string) => {
    setAutoReplies(autoReplies.map(reply => 
      reply.id === id ? { ...reply, enabled: !reply.enabled } : reply
    ));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Настройки Email</h2>
        <p className="text-muted-foreground">
          SMTP, IMAP, шаблоны писем и автоответчик
        </p>
      </div>

      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
          <TabsTrigger value="imap">IMAP</TabsTrigger>
          <TabsTrigger value="autoreplies">Автоответчик</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
          <Card>
            <CardHeader>
              <CardTitle>SMTP настройки</CardTitle>
              <CardDescription>
                Настройки для отправки писем через SMTP
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="smtp-host">SMTP Хост</Label>
                  <Input
                    id="smtp-host"
                    value={smtpSettings.host}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, host: e.target.value }))}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-port">Порт</Label>
                  <Input
                    id="smtp-port"
                    type="number"
                    value={smtpSettings.port}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, port: parseInt(e.target.value) }))}
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
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, username: e.target.value }))}
                    placeholder="your.email@gmail.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="smtp-password">Пароль</Label>
                  <Input
                    id="smtp-password"
                    type="password"
                    value={smtpSettings.password}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, password: e.target.value }))}
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
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, from_name: e.target.value }))}
                    placeholder="Анастасия"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="from-email">Email отправителя</Label>
                  <Input
                    id="from-email"
                    type="email"
                    value={smtpSettings.from_email}
                    onChange={(e) => setSmtpSettings(prev => ({ ...prev, from_email: e.target.value }))}
                    placeholder="info@example.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="encryption">Шифрование</Label>
                <Select value={smtpSettings.encryption} onValueChange={(value) => 
                  setSmtpSettings(prev => ({ ...prev, encryption: value }))
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

              <div className="flex gap-2 pt-4">
                <Button onClick={handleSaveSmtp}>
                  <Icon name="Save" size={16} className="mr-2" />
                  Сохранить
                </Button>
                <Button variant="outline" onClick={handleTestSmtp}>
                  <Icon name="Send" size={16} className="mr-2" />
                  Тест соединения
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Письмо клиенту</CardTitle>
                <CardDescription>
                  Автоматическое письмо, отправляемое клиенту после заполнения формы
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="client-subject">Тема письма</Label>
                  <Input
                    id="client-subject"
                    value={emailTemplates.toClient.subject}
                    onChange={(e) => setEmailTemplates(prev => ({
                      ...prev,
                      toClient: { ...prev.toClient, subject: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="client-body">Текст письма</Label>
                  <Textarea
                    id="client-body"
                    rows={8}
                    value={emailTemplates.toClient.body}
                    onChange={(e) => setEmailTemplates(prev => ({
                      ...prev,
                      toClient: { ...prev.toClient, body: e.target.value }
                    }))}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Письмо себе</CardTitle>
                <CardDescription>
                  Уведомление о новой заявке с данными клиента
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="admin-subject">Тема письма</Label>
                  <Input
                    id="admin-subject"
                    value={emailTemplates.toAdmin.subject}
                    onChange={(e) => setEmailTemplates(prev => ({
                      ...prev,
                      toAdmin: { ...prev.toAdmin, subject: e.target.value }
                    }))}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Поля для включения в письмо</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {['name', 'email', 'phone', 'message', 'service', 'source'].map((field) => (
                      <div key={field} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={field}
                          checked={emailTemplates.toAdmin.fields.includes(field)}
                          onChange={(e) => {
                            const fields = e.target.checked
                              ? [...emailTemplates.toAdmin.fields, field]
                              : emailTemplates.toAdmin.fields.filter(f => f !== field);
                            setEmailTemplates(prev => ({
                              ...prev,
                              toAdmin: { ...prev.toAdmin, fields }
                            }));
                          }}
                        />
                        <Label htmlFor={field} className="text-sm capitalize">
                          {field === 'name' ? 'Имя' :
                           field === 'email' ? 'Email' :
                           field === 'phone' ? 'Телефон' :
                           field === 'message' ? 'Сообщение' :
                           field === 'service' ? 'Услуга' : 'Источник'}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button onClick={handleSaveTemplates}>
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить шаблоны
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="imap">
          <Card>
            <CardHeader>
              <CardTitle>IMAP настройки</CardTitle>
              <CardDescription>
                Настройки для получения писем и автоответчика
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2 mb-4">
                <Switch
                  checked={imapSettings.enabled}
                  onCheckedChange={(checked) => setImapSettings(prev => ({ ...prev, enabled: checked }))}
                />
                <Label>Включить автоответчик</Label>
              </div>

              {imapSettings.enabled && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="imap-host">IMAP Хост</Label>
                      <Input
                        id="imap-host"
                        value={imapSettings.host}
                        onChange={(e) => setImapSettings(prev => ({ ...prev, host: e.target.value }))}
                        placeholder="imap.gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imap-port">Порт</Label>
                      <Input
                        id="imap-port"
                        type="number"
                        value={imapSettings.port}
                        onChange={(e) => setImapSettings(prev => ({ ...prev, port: parseInt(e.target.value) }))}
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
                        onChange={(e) => setImapSettings(prev => ({ ...prev, username: e.target.value }))}
                        placeholder="your.email@gmail.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="imap-password">Пароль</Label>
                      <Input
                        id="imap-password"
                        type="password"
                        value={imapSettings.password}
                        onChange={(e) => setImapSettings(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="••••••••"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="imap-encryption">Шифрование</Label>
                    <Select value={imapSettings.encryption} onValueChange={(value) => 
                      setImapSettings(prev => ({ ...prev, encryption: value }))
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

              <Button onClick={handleSaveImap}>
                <Icon name="Save" size={16} className="mr-2" />
                Сохранить настройки
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="autoreplies">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Автоответы</CardTitle>
                <CardDescription>
                  Автоматические ответы на письма клиентов по условиям
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {autoReplies.map((reply) => (
                  <div key={reply.id} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-medium">{reply.name}</h4>
                          <Badge variant={reply.enabled ? 'default' : 'secondary'}>
                            {reply.enabled ? 'Активен' : 'Отключен'}
                          </Badge>
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Условие:</strong> {
                            reply.conditions.email ? `Email: ${reply.conditions.email}` :
                            reply.conditions.contains ? `Содержит: "${reply.conditions.contains}"` :
                            reply.conditions.exactMatch ? `Точное совпадение: "${reply.conditions.exactMatch}"` :
                            'Любое письмо'
                          }
                        </div>
                        <div className="text-sm text-muted-foreground mb-2">
                          <strong>Задержка:</strong> {reply.delay === 0 ? 'Сразу' : `${reply.delay} сек`}
                        </div>
                        <div className="text-sm bg-muted p-2 rounded">
                          {reply.response}
                        </div>
                      </div>
                      <div className="flex gap-2 ml-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => toggleAutoReply(reply.id)}
                        >
                          <Icon name={reply.enabled ? 'Pause' : 'Play'} size={16} />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAutoReply(reply.id)}
                        >
                          <Icon name="Trash2" size={16} />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Icon name="Plus" size={16} className="mr-2" />
                      Добавить автоответ
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>Новый автоответ</DialogTitle>
                      <DialogDescription>
                        Создайте правило для автоматического ответа на письма
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="new-name">Название</Label>
                        <Input
                          id="new-name"
                          value={newAutoReply.name || ''}
                          onChange={(e) => setNewAutoReply(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Название правила"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Условие срабатывания</Label>
                        <div className="grid grid-cols-1 gap-2">
                          <Input
                            placeholder="Email получателя (оставьте пустым для любого)"
                            value={newAutoReply.conditions?.email || ''}
                            onChange={(e) => setNewAutoReply(prev => ({
                              ...prev,
                              conditions: { ...prev.conditions, email: e.target.value }
                            }))}
                          />
                          <Input
                            placeholder="Письмо содержит текст"
                            value={newAutoReply.conditions?.contains || ''}
                            onChange={(e) => setNewAutoReply(prev => ({
                              ...prev,
                              conditions: { ...prev.conditions, contains: e.target.value }
                            }))}
                          />
                          <Input
                            placeholder="Точное совпадение текста"
                            value={newAutoReply.conditions?.exactMatch || ''}
                            onChange={(e) => setNewAutoReply(prev => ({
                              ...prev,
                              conditions: { ...prev.conditions, exactMatch: e.target.value }
                            }))}
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-response">Ответное сообщение</Label>
                        <Textarea
                          id="new-response"
                          rows={4}
                          value={newAutoReply.response || ''}
                          onChange={(e) => setNewAutoReply(prev => ({ ...prev, response: e.target.value }))}
                          placeholder="Текст автоматического ответа"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="new-delay">Задержка (секунды)</Label>
                        <Input
                          id="new-delay"
                          type="number"
                          min="0"
                          value={newAutoReply.delay || 0}
                          onChange={(e) => setNewAutoReply(prev => ({ ...prev, delay: parseInt(e.target.value) || 0 }))}
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button onClick={addAutoReply}>
                          Добавить автоответ
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => setNewAutoReply({ name: '', conditions: {}, response: '', delay: 0, enabled: true })}
                        >
                          Очистить
                        </Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailSettings;