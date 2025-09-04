import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SmtpSettings from './email-settings/SmtpSettings';
import EmailTemplates from './email-settings/EmailTemplates';
import ImapSettings from './email-settings/ImapSettings';
import AutoRepliesManager, { AutoReply } from './email-settings/AutoRepliesManager';

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
          <SmtpSettings
            smtpSettings={smtpSettings}
            setSmtpSettings={setSmtpSettings}
            handleSaveSmtp={handleSaveSmtp}
            handleTestSmtp={handleTestSmtp}
          />
        </TabsContent>

        <TabsContent value="templates">
          <EmailTemplates
            emailTemplates={emailTemplates}
            setEmailTemplates={setEmailTemplates}
            handleSaveTemplates={handleSaveTemplates}
          />
        </TabsContent>

        <TabsContent value="imap">
          <ImapSettings
            imapSettings={imapSettings}
            setImapSettings={setImapSettings}
            handleSaveImap={handleSaveImap}
          />
        </TabsContent>

        <TabsContent value="autoreplies">
          <AutoRepliesManager
            autoReplies={autoReplies}
            setAutoReplies={setAutoReplies}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmailSettings;