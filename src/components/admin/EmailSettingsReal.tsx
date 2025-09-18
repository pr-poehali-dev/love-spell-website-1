import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/components/ui/use-toast';
import Icon from '@/components/ui/icon';

const EMAIL_API_URL = 'https://functions.poehali.dev/5322eb6b-5e62-432d-8cc8-4b559e64088d';

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

interface ImapSettings {
  imapHost: string;
  imapPort: number;
  imapUsername: string;
  imapPassword: string;
  encryptionType: string;
  autoReplyEnabled: boolean;
  isActive: boolean;
}

interface EmailTemplate {
  id: string;
  templateType: string;
  templateName: string;
  subjectTemplate: string;
  bodyTemplate: string;
  variables: Record<string, string>;
  isActive: boolean;
}

export default function EmailSettingsReal() {
  const { toast } = useToast();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  // SMTP настройки
  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings>({
    smtpHost: '',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    senderName: '',
    senderEmail: '',
    encryptionType: 'TLS',
    isActive: false
  });
  
  // IMAP настройки
  const [imapSettings, setImapSettings] = useState<ImapSettings>({
    imapHost: '',
    imapPort: 993,
    imapUsername: '',
    imapPassword: '',
    encryptionType: 'SSL',
    autoReplyEnabled: false,
    isActive: false
  });
  
  // Шаблоны
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  
  // Тест email
  const [testEmail, setTestEmail] = useState('');
  const [testing, setTesting] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const getAuthToken = () => {
    const token = localStorage.getItem('admin_auth');
    if (!token) return null;
    const authData = JSON.parse(token);
    return authData.token;
  };

  const loadSettings = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        
        if (data.smtp) {
          setSmtpSettings(prev => ({ ...prev, ...data.smtp, smtpPassword: '' }));
        }
        
        if (data.imap) {
          setImapSettings(prev => ({ ...prev, ...data.imap, imapPassword: '' }));
        }
      }
      
      // Загружаем шаблоны
      await loadTemplates();
      
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить настройки"
      });
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings/templates`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setTemplates(data.templates || []);
      }
    } catch (error) {
      console.error('Error loading templates:', error);
    }
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings/smtp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(smtpSettings)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "SMTP настройки сохранены"
        });
        await loadSettings();
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить SMTP настройки"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleSaveImap = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings/imap`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(imapSettings)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "IMAP настройки сохранены"
        });
        await loadSettings();
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить IMAP настройки"
      });
    } finally {
      setSaving(false);
    }
  };

  const handleTestSmtp = async () => {
    if (!testEmail) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите email для тестирования"
      });
      return;
    }
    
    setTesting(true);
    
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings/test-smtp`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ testEmail })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Тест выполнен",
          description: data.message || "SMTP тест прошел успешно"
        });
      } else {
        throw new Error(data.error || 'Test failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка теста",
        description: error.message || "Не удалось выполнить тест SMTP"
      });
    } finally {
      setTesting(false);
    }
  };

  const handleSaveTemplate = async (template: EmailTemplate) => {
    try {
      const token = getAuthToken();
      if (!token) return;
      
      const response = await fetch(`${EMAIL_API_URL}/email-settings/templates`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(template)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Шаблон сохранен"
        });
        setEditingTemplate(null);
        await loadTemplates();
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить шаблон"
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
        <h2 className="text-2xl font-bold">Настройки Email</h2>
        <p className="text-muted-foreground">Конфигурация SMTP, IMAP и шаблонов писем</p>
      </div>

      <Tabs defaultValue="smtp" className="space-y-6">
        <TabsList>
          <TabsTrigger value="smtp">SMTP</TabsTrigger>
          <TabsTrigger value="imap">IMAP</TabsTrigger>
          <TabsTrigger value="templates">Шаблоны</TabsTrigger>
        </TabsList>

        <TabsContent value="smtp">
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
              <form onSubmit={handleSaveSmtp} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="smtpHost">SMTP Хост *</Label>
                    <Input
                      id="smtpHost"
                      value={smtpSettings.smtpHost}
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, smtpHost: e.target.value }))}
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
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, smtpPort: parseInt(e.target.value) || 587 }))}
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
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, smtpUsername: e.target.value }))}
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
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, smtpPassword: e.target.value }))}
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
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, senderName: e.target.value }))}
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
                      onChange={(e) => setSmtpSettings(prev => ({ ...prev, senderEmail: e.target.value }))}
                      placeholder="info@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="encryptionType">Тип шифрования</Label>
                  <Select
                    value={smtpSettings.encryptionType}
                    onValueChange={(value) => setSmtpSettings(prev => ({ ...prev, encryptionType: value }))}
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
                      onChange={(e) => setTestEmail(e.target.value)}
                      type="email"
                    />
                    <Button 
                      variant="outline" 
                      onClick={handleTestSmtp}
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
        </TabsContent>

        <TabsContent value="imap">
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
              <form onSubmit={handleSaveImap} className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label htmlFor="imapHost">IMAP Хост *</Label>
                    <Input
                      id="imapHost"
                      value={imapSettings.imapHost}
                      onChange={(e) => setImapSettings(prev => ({ ...prev, imapHost: e.target.value }))}
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
                      onChange={(e) => setImapSettings(prev => ({ ...prev, imapPort: parseInt(e.target.value) || 993 }))}
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
                      onChange={(e) => setImapSettings(prev => ({ ...prev, imapUsername: e.target.value }))}
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
                      onChange={(e) => setImapSettings(prev => ({ ...prev, imapPassword: e.target.value }))}
                      placeholder="Введите пароль"
                      required
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="imapEncryption">Тип шифрования</Label>
                  <Select
                    value={imapSettings.encryptionType}
                    onValueChange={(value) => setImapSettings(prev => ({ ...prev, encryptionType: value }))}
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
                    onCheckedChange={(checked) => setImapSettings(prev => ({ ...prev, autoReplyEnabled: checked }))}
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
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="FileText" size={20} />
                Шаблоны писем
              </CardTitle>
              <CardDescription>
                Настройка шаблонов для автоматических и ручных ответов
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {templates.map((template) => (
                  <div
                    key={template.id}
                    className="p-4 border rounded-lg hover:bg-muted/50 cursor-pointer"
                    onClick={() => setEditingTemplate(template)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{template.templateName}</h4>
                        <p className="text-sm text-muted-foreground">
                          {template.templateType} • {template.subjectTemplate}
                        </p>
                      </div>
                      <Badge variant={template.isActive ? "default" : "secondary"}>
                        {template.isActive ? "Активен" : "Неактивен"}
                      </Badge>
                    </div>
                  </div>
                ))}
                
                {templates.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Icon name="FileText" size={48} className="mx-auto mb-4 opacity-50" />
                    <p>Шаблоны не найдены</p>
                    <p className="text-sm">Создайте первый шаблон для автоматических ответов</p>
                  </div>
                )}
                
                <Button
                  onClick={() => setEditingTemplate({
                    id: '',
                    templateType: 'client_reply',
                    templateName: '',
                    subjectTemplate: '',
                    bodyTemplate: '',
                    variables: {},
                    isActive: true
                  })}
                  className="w-full"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Создать шаблон
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Диалог редактирования шаблона можно добавить здесь */}
    </div>
  );
}