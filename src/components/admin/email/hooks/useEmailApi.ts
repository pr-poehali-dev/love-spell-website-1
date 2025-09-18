import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

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

export function useEmailApi() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [testing, setTesting] = useState(false);

  const getAuthToken = () => {
    const token = localStorage.getItem('admin_auth');
    if (!token) return null;
    const authData = JSON.parse(token);
    return authData.token;
  };

  const getAuthHeaders = () => {
    const token = getAuthToken();
    if (!token) throw new Error('No auth token');
    
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  };

  const loadSettings = async () => {
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return {
          smtp: data.smtp ? { ...data.smtp, smtpPassword: '' } : null,
          imap: data.imap ? { ...data.imap, imapPassword: '' } : null
        };
      }
      return { smtp: null, imap: null };
    } catch (error) {
      console.error('Error loading settings:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить настройки"
      });
      return { smtp: null, imap: null };
    } finally {
      setLoading(false);
    }
  };

  const loadTemplates = async (): Promise<EmailTemplate[]> => {
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings/templates`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.templates || [];
      }
      return [];
    } catch (error) {
      console.error('Error loading templates:', error);
      return [];
    }
  };

  const saveSmtpSettings = async (settings: SmtpSettings) => {
    setSaving(true);
    
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings/smtp`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "SMTP настройки сохранены"
        });
        return true;
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить SMTP настройки"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const saveImapSettings = async (settings: ImapSettings) => {
    setSaving(true);
    
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings/imap`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(settings)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "IMAP настройки сохранены"
        });
        return true;
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить IMAP настройки"
      });
      return false;
    } finally {
      setSaving(false);
    }
  };

  const testSmtp = async (testEmail: string) => {
    if (!testEmail) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите email для тестирования"
      });
      return false;
    }
    
    setTesting(true);
    
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings/test-smtp`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ testEmail })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Тест выполнен",
          description: data.message || "SMTP тест прошел успешно"
        });
        return true;
      } else {
        throw new Error(data.error || 'Test failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка теста",
        description: error.message || "Не удалось выполнить тест SMTP"
      });
      return false;
    } finally {
      setTesting(false);
    }
  };

  const saveTemplate = async (template: EmailTemplate) => {
    try {
      const response = await fetch(`${EMAIL_API_URL}/email-settings/templates`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify(template)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Шаблон сохранен"
        });
        return true;
      } else {
        throw new Error(data.error || 'Save failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось сохранить шаблон"
      });
      return false;
    }
  };

  return {
    loading,
    saving,
    testing,
    loadSettings,
    loadTemplates,
    saveSmtpSettings,
    saveImapSettings,
    testSmtp,
    saveTemplate
  };
}