import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import SmtpSettings from './email/SmtpSettings';
import ImapSettings from './email/ImapSettings';
import EmailTemplates from './email/EmailTemplates';
import { useEmailApi } from './email/hooks/useEmailApi';

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
  const { loading, saving, testing, loadSettings, loadTemplates, saveSmtpSettings, saveImapSettings, testSmtp, saveTemplate } = useEmailApi();
  
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
  
  const [imapSettings, setImapSettings] = useState<ImapSettings>({
    imapHost: '',
    imapPort: 993,
    imapUsername: '',
    imapPassword: '',
    encryptionType: 'SSL',
    autoReplyEnabled: false,
    isActive: false
  });
  
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [editingTemplate, setEditingTemplate] = useState<EmailTemplate | null>(null);
  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const settings = await loadSettings();
      if (settings.smtp) {
        setSmtpSettings(prev => ({ ...prev, ...settings.smtp }));
      }
      if (settings.imap) {
        setImapSettings(prev => ({ ...prev, ...settings.imap }));
      }
      
      const templatesData = await loadTemplates();
      setTemplates(templatesData);
    };
    
    fetchData();
  }, []);

  const handleSmtpChange = (updates: Partial<SmtpSettings>) => {
    setSmtpSettings(prev => ({ ...prev, ...updates }));
  };

  const handleImapChange = (updates: Partial<ImapSettings>) => {
    setImapSettings(prev => ({ ...prev, ...updates }));
  };

  const handleSaveSmtp = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveSmtpSettings(smtpSettings);
    if (success) {
      const settings = await loadSettings();
      if (settings.smtp) {
        setSmtpSettings(prev => ({ ...prev, ...settings.smtp }));
      }
    }
  };

  const handleSaveImap = async (e: React.FormEvent) => {
    e.preventDefault();
    const success = await saveImapSettings(imapSettings);
    if (success) {
      const settings = await loadSettings();
      if (settings.imap) {
        setImapSettings(prev => ({ ...prev, ...settings.imap }));
      }
    }
  };

  const handleTestSmtp = async () => {
    await testSmtp(testEmail);
  };

  const handleEditTemplate = (template: EmailTemplate) => {
    setEditingTemplate(template);
  };

  const handleCreateTemplate = () => {
    setEditingTemplate({
      id: '',
      templateType: 'client_reply',
      templateName: '',
      subjectTemplate: '',
      bodyTemplate: '',
      variables: {},
      isActive: true
    });
  };

  const handleSaveTemplate = async (template: EmailTemplate) => {
    const success = await saveTemplate(template);
    if (success) {
      setEditingTemplate(null);
      const updatedTemplates = await loadTemplates();
      setTemplates(updatedTemplates);
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
          <SmtpSettings
            smtpSettings={smtpSettings}
            saving={saving}
            testEmail={testEmail}
            testing={testing}
            onSmtpChange={handleSmtpChange}
            onSave={handleSaveSmtp}
            onTestEmailChange={setTestEmail}
            onTest={handleTestSmtp}
          />
        </TabsContent>

        <TabsContent value="imap">
          <ImapSettings
            imapSettings={imapSettings}
            saving={saving}
            onImapChange={handleImapChange}
            onSave={handleSaveImap}
          />
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplates
            templates={templates}
            onEditTemplate={handleEditTemplate}
            onCreateTemplate={handleCreateTemplate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}