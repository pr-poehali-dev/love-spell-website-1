import { createContext, useContext, useState, ReactNode } from 'react';

// Интерфейсы для типизации данных
export interface SiteSettings {
  avatar: string;
  name: string;
  heroBackground: string;
  contacts: {
    telegram: string;
    whatsapp: string;
    phone: string;
    email: string;
  };
}

export interface SmtpSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  from_name: string;
  from_email: string;
  encryption: string;
}

export interface ImapSettings {
  host: string;
  port: number;
  username: string;
  password: string;
  encryption: string;
  enabled: boolean;
}

export interface EmailTemplates {
  toClient: {
    subject: string;
    body: string;
  };
  toAdmin: {
    subject: string;
    fields: string[];
  };
}

export interface AutoReply {
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

export interface AnalyticsData {
  visitors: {
    total: number;
    unique: number;
    online: number;
    today: number;
  };
  conversions: {
    email: number;
    telegram: number;
    whatsapp: number;
    total: number;
  };
  geography: Array<{
    country: string;
    visitors: number;
    percent: number;
  }>;
}

export interface Message {
  id: string;
  type: 'client' | 'admin' | 'auto';
  content: string;
  timestamp: Date;
  sender?: {
    name: string;
    email: string;
    avatar?: string;
  };
  status?: 'sent' | 'delivered' | 'read';
}

export interface Conversation {
  id: string;
  clientName: string;
  clientEmail: string;
  subject: string;
  lastMessage: string;
  lastMessageTime: Date;
  unreadCount: number;
  status: 'new' | 'in-progress' | 'closed';
  messages: Message[];
}

// Контекст для управления состоянием админ панели
interface AdminContextType {
  // Site Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => Promise<void>;
  
  // Email Settings
  smtpSettings: SmtpSettings;
  updateSmtpSettings: (settings: SmtpSettings) => Promise<void>;
  testSmtpConnection: () => Promise<boolean>;
  
  imapSettings: ImapSettings;
  updateImapSettings: (settings: ImapSettings) => Promise<void>;
  
  emailTemplates: EmailTemplates;
  updateEmailTemplates: (templates: EmailTemplates) => Promise<void>;
  
  autoReplies: AutoReply[];
  addAutoReply: (reply: Omit<AutoReply, 'id' | 'order'>) => Promise<void>;
  updateAutoReply: (id: string, reply: Partial<AutoReply>) => Promise<void>;
  deleteAutoReply: (id: string) => Promise<void>;
  
  // Analytics
  analyticsData: AnalyticsData;
  refreshAnalytics: () => Promise<void>;
  
  // Messages
  conversations: Conversation[];
  sendMessage: (conversationId: string, message: string) => Promise<void>;
  markAsRead: (conversationId: string, messageId: string) => Promise<void>;
  
  // General
  loading: boolean;
  error: string | null;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Состояния для различных настроек
  const [siteSettings, setSiteSettings] = useState<SiteSettings>({
    avatar: '/default-avatar.jpg',
    name: 'Анастасия',
    heroBackground: '/hero-bg.jpg',
    contacts: {
      telegram: '@anastasia_magic',
      whatsapp: '+7900123456',
      phone: '+7900123456',
      email: 'info@example.com'
    }
  });

  const [smtpSettings, setSmtpSettings] = useState<SmtpSettings>({
    host: 'smtp.gmail.com',
    port: 587,
    username: '',
    password: '',
    from_name: 'Анастасия',
    from_email: 'info@example.com',
    encryption: 'tls'
  });

  const [imapSettings, setImapSettings] = useState<ImapSettings>({
    host: 'imap.gmail.com',
    port: 993,
    username: '',
    password: '',
    encryption: 'ssl',
    enabled: false
  });

  const [emailTemplates, setEmailTemplates] = useState<EmailTemplates>({
    toClient: {
      subject: 'Спасибо за обращение!',
      body: 'Здравствуйте!\n\nСпасибо за ваше обращение. Я получила ваш запрос и обязательно отвечу в ближайшее время.\n\nС уважением,\nАнастасия'
    },
    toAdmin: {
      subject: 'Новая заявка с сайта',
      fields: ['name', 'email', 'phone', 'message', 'service']
    }
  });

  const [autoReplies, setAutoReplies] = useState<AutoReply[]>([]);
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData>({
    visitors: { total: 0, unique: 0, online: 0, today: 0 },
    conversions: { email: 0, telegram: 0, whatsapp: 0, total: 0 },
    geography: []
  });

  const [conversations, setConversations] = useState<Conversation[]>([]);

  // API функции для взаимодействия с бекендом
  const updateSiteSettings = async (settings: Partial<SiteSettings>) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call to backend
      // const response = await fetch('/api/admin/site-settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      // if (!response.ok) throw new Error('Failed to update settings');
      
      setSiteSettings(prev => ({ ...prev, ...settings }));
      console.log('Site settings updated:', settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateSmtpSettings = async (settings: SmtpSettings) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      // const response = await fetch('/api/admin/smtp-settings', {
      //   method: 'PUT',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(settings)
      // });
      // if (!response.ok) throw new Error('Failed to update SMTP settings');
      
      setSmtpSettings(settings);
      console.log('SMTP settings updated:', settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const testSmtpConnection = async (): Promise<boolean> => {
    setLoading(true);
    try {
      // TODO: API call
      // const response = await fetch('/api/admin/test-smtp', { method: 'POST' });
      // const result = await response.json();
      // return result.success;
      
      console.log('Testing SMTP connection...');
      return true; // Mock success
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const updateImapSettings = async (settings: ImapSettings) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      setImapSettings(settings);
      console.log('IMAP settings updated:', settings);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateEmailTemplates = async (templates: EmailTemplates) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      setEmailTemplates(templates);
      console.log('Email templates updated:', templates);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const addAutoReply = async (reply: Omit<AutoReply, 'id' | 'order'>) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      const newReply: AutoReply = {
        ...reply,
        id: Date.now().toString(),
        order: autoReplies.length + 1
      };
      setAutoReplies(prev => [...prev, newReply]);
      console.log('Auto reply added:', newReply);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const updateAutoReply = async (id: string, reply: Partial<AutoReply>) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      setAutoReplies(prev => prev.map(r => r.id === id ? { ...r, ...reply } : r));
      console.log('Auto reply updated:', id, reply);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const deleteAutoReply = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      setAutoReplies(prev => prev.filter(r => r.id !== id));
      console.log('Auto reply deleted:', id);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const refreshAnalytics = async () => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call
      // const response = await fetch('/api/admin/analytics');
      // const data = await response.json();
      // setAnalyticsData(data);
      
      console.log('Analytics refreshed');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = async (conversationId: string, message: string) => {
    setLoading(true);
    setError(null);
    try {
      // TODO: API call to send message via email
      // const response = await fetch('/api/admin/messages/send', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ conversationId, message })
      // });
      // if (!response.ok) throw new Error('Failed to send message');
      
      const newMessage: Message = {
        id: Date.now().toString(),
        type: 'admin',
        content: message,
        timestamp: new Date(),
        status: 'sent'
      };

      setConversations(prev => prev.map(conv => 
        conv.id === conversationId 
          ? { ...conv, messages: [...conv.messages, newMessage] }
          : conv
      ));
      
      console.log('Message sent:', conversationId, message);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (conversationId: string, messageId: string) => {
    try {
      // TODO: API call
      console.log('Message marked as read:', conversationId, messageId);
    } catch (err) {
      console.error('Failed to mark message as read:', err);
    }
  };

  const value: AdminContextType = {
    siteSettings,
    updateSiteSettings,
    smtpSettings,
    updateSmtpSettings,
    testSmtpConnection,
    imapSettings,
    updateImapSettings,
    emailTemplates,
    updateEmailTemplates,
    autoReplies,
    addAutoReply,
    updateAutoReply,
    deleteAutoReply,
    analyticsData,
    refreshAnalytics,
    conversations,
    sendMessage,
    markAsRead,
    loading,
    error
  };

  return (
    <AdminContext.Provider value={value}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};