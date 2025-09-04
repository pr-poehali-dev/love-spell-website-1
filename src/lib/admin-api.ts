// API клиент для админ панели с детальной документацией для бекенда

/**
 * ВАЖНО: Все функции содержат TODO комментарии с примерами API вызовов
 * Это поможет при интеграции с бекендом и базой данных
 */

import { 
  SiteSettings, 
  SmtpSettings, 
  ImapSettings, 
  EmailTemplates, 
  AutoReply,
  AnalyticsData,
  Conversation,
  Message 
} from './admin-context';

// Базовый URL для API (должен быть настроен в environment)
const API_BASE_URL = process.env.VITE_API_URL || '/api';

// Утилита для HTTP запросов
const apiRequest = async <T>(
  endpoint: string, 
  options: RequestInit = {}
): Promise<T> => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      // TODO: Добавить авторизационные заголовки
      // 'Authorization': `Bearer ${getAuthToken()}`,
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error for ${endpoint}:`, error);
    throw error;
  }
};

// =============================================================================
// AUTHENTICATION API
// =============================================================================

export const authApi = {
  /**
   * Авторизация администратора
   * POST /api/admin/login
   */
  login: async (username: string, password: string) => {
    // TODO: Реализовать API вызов
    // return apiRequest<{ token: string; requiresTotp: boolean }>('/admin/login', {
    //   method: 'POST',
    //   body: JSON.stringify({ username, password })
    // });
    
    console.log('Login attempt:', { username, password: '***' });
    return Promise.resolve({ token: 'mock-token', requiresTotp: true });
  },

  /**
   * Верификация TOTP кода
   * POST /api/admin/verify-totp
   */
  verifyTotp: async (token: string, totpCode: string) => {
    // TODO: Реализовать API вызов
    // return apiRequest<{ success: boolean; token: string }>('/admin/verify-totp', {
    //   method: 'POST',
    //   body: JSON.stringify({ token, totpCode })
    // });
    
    console.log('TOTP verification:', { totpCode });
    return Promise.resolve({ success: true, token: 'authenticated-token' });
  },

  /**
   * Запрос сброса пароля
   * POST /api/admin/forgot-password
   */
  forgotPassword: async (email: string) => {
    // TODO: Реализовать API вызов
    // return apiRequest<{ success: boolean }>('/admin/forgot-password', {
    //   method: 'POST',
    //   body: JSON.stringify({ email })
    // });
    
    console.log('Password reset request:', { email });
    return Promise.resolve({ success: true });
  },

  /**
   * Сброс пароля по токену
   * POST /api/admin/reset-password
   */
  resetPassword: async (token: string, newPassword: string) => {
    // TODO: Реализовать API вызов
    // return apiRequest<{ success: boolean }>('/admin/reset-password', {
    //   method: 'POST',
    //   body: JSON.stringify({ token, newPassword })
    // });
    
    console.log('Password reset:', { token, newPassword: '***' });
    return Promise.resolve({ success: true });
  }
};

// =============================================================================
// SITE SETTINGS API
// =============================================================================

export const siteApi = {
  /**
   * Получение настроек сайта
   * GET /api/admin/site-settings
   */
  getSettings: async (): Promise<SiteSettings> => {
    // TODO: Реализовать API вызов
    // return apiRequest<SiteSettings>('/admin/site-settings');
    
    console.log('Getting site settings');
    return Promise.resolve({
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
  },

  /**
   * Обновление настроек сайта
   * PUT /api/admin/site-settings
   */
  updateSettings: async (settings: Partial<SiteSettings>) => {
    // TODO: Реализовать API вызов
    // return apiRequest<SiteSettings>('/admin/site-settings', {
    //   method: 'PUT',
    //   body: JSON.stringify(settings)
    // });
    
    console.log('Updating site settings:', settings);
    return Promise.resolve(settings);
  },

  /**
   * Загрузка аватара
   * POST /api/admin/upload-avatar
   */
  uploadAvatar: async (file: File) => {
    // TODO: Реализовать API вызов
    // const formData = new FormData();
    // formData.append('avatar', file);
    // return apiRequest<{ url: string }>('/admin/upload-avatar', {
    //   method: 'POST',
    //   body: formData,
    //   headers: {} // Убираем Content-Type для FormData
    // });
    
    console.log('Uploading avatar:', file.name);
    return Promise.resolve({ url: '/uploaded-avatar.jpg' });
  },

  /**
   * Загрузка фона героя
   * POST /api/admin/upload-hero-background
   */
  uploadHeroBackground: async (file: File) => {
    // TODO: Реализовать API вызов
    console.log('Uploading hero background:', file.name);
    return Promise.resolve({ url: '/uploaded-hero-bg.jpg' });
  }
};

// =============================================================================
// EMAIL SETTINGS API
// =============================================================================

export const emailApi = {
  /**
   * Получение SMTP настроек
   * GET /api/admin/smtp-settings
   */
  getSmtpSettings: async (): Promise<SmtpSettings> => {
    // TODO: Реализовать API вызов
    console.log('Getting SMTP settings');
    return Promise.resolve({
      host: 'smtp.gmail.com',
      port: 587,
      username: '',
      password: '',
      from_name: 'Анастасия',
      from_email: 'info@example.com',
      encryption: 'tls'
    });
  },

  /**
   * Обновление SMTP настроек
   * PUT /api/admin/smtp-settings
   */
  updateSmtpSettings: async (settings: SmtpSettings) => {
    // TODO: Реализовать API вызов
    console.log('Updating SMTP settings:', { ...settings, password: '***' });
    return Promise.resolve(settings);
  },

  /**
   * Тестирование SMTP соединения
   * POST /api/admin/test-smtp
   */
  testSmtpConnection: async () => {
    // TODO: Реализовать API вызов
    console.log('Testing SMTP connection');
    return Promise.resolve({ success: true, message: 'Connection successful' });
  },

  /**
   * Получение IMAP настроек
   * GET /api/admin/imap-settings
   */
  getImapSettings: async (): Promise<ImapSettings> => {
    // TODO: Реализовать API вызов
    console.log('Getting IMAP settings');
    return Promise.resolve({
      host: 'imap.gmail.com',
      port: 993,
      username: '',
      password: '',
      encryption: 'ssl',
      enabled: false
    });
  },

  /**
   * Обновление IMAP настроек
   * PUT /api/admin/imap-settings
   */
  updateImapSettings: async (settings: ImapSettings) => {
    // TODO: Реализовать API вызов
    console.log('Updating IMAP settings:', { ...settings, password: '***' });
    return Promise.resolve(settings);
  },

  /**
   * Получение шаблонов email
   * GET /api/admin/email-templates
   */
  getEmailTemplates: async (): Promise<EmailTemplates> => {
    // TODO: Реализовать API вызов
    console.log('Getting email templates');
    return Promise.resolve({
      toClient: {
        subject: 'Спасибо за обращение!',
        body: 'Здравствуйте!\n\nСпасибо за ваше обращение.'
      },
      toAdmin: {
        subject: 'Новая заявка с сайта',
        fields: ['name', 'email', 'phone', 'message', 'service']
      }
    });
  },

  /**
   * Обновление шаблонов email
   * PUT /api/admin/email-templates
   */
  updateEmailTemplates: async (templates: EmailTemplates) => {
    // TODO: Реализовать API вызов
    console.log('Updating email templates:', templates);
    return Promise.resolve(templates);
  }
};

// =============================================================================
// AUTO REPLIES API
// =============================================================================

export const autoReplyApi = {
  /**
   * Получение списка автоответов
   * GET /api/admin/auto-replies
   */
  getAutoReplies: async (): Promise<AutoReply[]> => {
    // TODO: Реализовать API вызов
    console.log('Getting auto replies');
    return Promise.resolve([]);
  },

  /**
   * Создание автоответа
   * POST /api/admin/auto-replies
   */
  createAutoReply: async (reply: Omit<AutoReply, 'id' | 'order'>) => {
    // TODO: Реализовать API вызов
    console.log('Creating auto reply:', reply);
    const newReply = { ...reply, id: Date.now().toString(), order: 1 };
    return Promise.resolve(newReply);
  },

  /**
   * Обновление автоответа
   * PUT /api/admin/auto-replies/:id
   */
  updateAutoReply: async (id: string, reply: Partial<AutoReply>) => {
    // TODO: Реализовать API вызов
    console.log('Updating auto reply:', id, reply);
    return Promise.resolve({ id, ...reply });
  },

  /**
   * Удаление автоответа
   * DELETE /api/admin/auto-replies/:id
   */
  deleteAutoReply: async (id: string) => {
    // TODO: Реализовать API вызов
    console.log('Deleting auto reply:', id);
    return Promise.resolve({ success: true });
  }
};

// =============================================================================
// ANALYTICS API
// =============================================================================

export const analyticsApi = {
  /**
   * Получение данных аналитики
   * GET /api/admin/analytics?period=7days
   */
  getAnalytics: async (period: string = '7days'): Promise<AnalyticsData> => {
    // TODO: Реализовать API вызов
    console.log('Getting analytics for period:', period);
    return Promise.resolve({
      visitors: { total: 1247, unique: 892, online: 8, today: 64 },
      conversions: { email: 23, telegram: 15, whatsapp: 8, total: 46 },
      geography: [
        { country: 'Россия', visitors: 412, percent: 68 },
        { country: 'Украина', visitors: 124, percent: 20 },
      ]
    });
  },

  /**
   * Сохранение кода метрики
   * PUT /api/admin/tracking-code
   */
  updateTrackingCode: async (code: string) => {
    // TODO: Реализовать API вызов
    console.log('Updating tracking code');
    return Promise.resolve({ success: true });
  }
};

// =============================================================================
// MESSAGES API
// =============================================================================

export const messagesApi = {
  /**
   * Получение списка разговоров
   * GET /api/admin/messages
   */
  getConversations: async (): Promise<Conversation[]> => {
    // TODO: Реализовать API вызов
    console.log('Getting conversations');
    return Promise.resolve([]);
  },

  /**
   * Получение сообщений разговора
   * GET /api/admin/messages/:conversationId
   */
  getMessages: async (conversationId: string): Promise<Message[]> => {
    // TODO: Реализовать API вызов
    console.log('Getting messages for conversation:', conversationId);
    return Promise.resolve([]);
  },

  /**
   * Отправка сообщения
   * POST /api/admin/messages/:conversationId/reply
   */
  sendMessage: async (conversationId: string, content: string) => {
    // TODO: Реализовать API вызов - отправка email через SMTP
    console.log('Sending message:', { conversationId, content });
    const message: Message = {
      id: Date.now().toString(),
      type: 'admin',
      content,
      timestamp: new Date(),
      status: 'sent'
    };
    return Promise.resolve(message);
  },

  /**
   * Отметка сообщения как прочитанного
   * PUT /api/admin/messages/:conversationId/:messageId/read
   */
  markAsRead: async (conversationId: string, messageId: string) => {
    // TODO: Реализовать API вызов
    console.log('Marking message as read:', { conversationId, messageId });
    return Promise.resolve({ success: true });
  }
};

// =============================================================================
// SECURITY API
// =============================================================================

export const securityApi = {
  /**
   * Смена пароля
   * PUT /api/admin/change-password
   */
  changePassword: async (currentPassword: string, newPassword: string) => {
    // TODO: Реализовать API вызов
    console.log('Changing password');
    return Promise.resolve({ success: true });
  },

  /**
   * Настройка TOTP
   * POST /api/admin/setup-totp
   */
  setupTotp: async () => {
    // TODO: Реализовать API вызов
    console.log('Setting up TOTP');
    return Promise.resolve({
      secret: 'JBSWY3DPEHPK3PXP',
      qrCodeUrl: 'data:image/png;base64,mock-qr-code'
    });
  },

  /**
   * Отключение TOTP
   * DELETE /api/admin/totp
   */
  disableTotp: async () => {
    // TODO: Реализовать API вызов
    console.log('Disabling TOTP');
    return Promise.resolve({ success: true });
  }
};

// =============================================================================
// ОБЩИЕ УТИЛИТЫ
// =============================================================================

/**
 * Утилита для работы с токенами авторизации
 */
export const authUtils = {
  setToken: (token: string) => {
    localStorage.setItem('admin-token', token);
  },
  
  getToken: (): string | null => {
    return localStorage.getItem('admin-token');
  },
  
  removeToken: () => {
    localStorage.removeItem('admin-token');
  },
  
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('admin-token');
  }
};

/**
 * Централизованный экспорт всех API методов
 */
export const adminApi = {
  auth: authApi,
  site: siteApi,
  email: emailApi,
  autoReply: autoReplyApi,
  analytics: analyticsApi,
  messages: messagesApi,
  security: securityApi
};