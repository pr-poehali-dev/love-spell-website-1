-- Миграция: Добавление таблиц для настроек email и обновление пользователя
-- Версия: V002

-- Таблица настроек SMTP
CREATE TABLE smtp_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    smtp_host VARCHAR(255) NOT NULL,
    smtp_port INTEGER NOT NULL DEFAULT 587,
    smtp_username VARCHAR(255) NOT NULL,
    smtp_password VARCHAR(255) NOT NULL, -- Будет зашифрован
    sender_name VARCHAR(255) NOT NULL,
    sender_email VARCHAR(255) NOT NULL,
    encryption_type VARCHAR(10) DEFAULT 'TLS' CHECK (encryption_type IN ('TLS', 'SSL', 'NONE')),
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица настроек IMAP
CREATE TABLE imap_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    imap_host VARCHAR(255) NOT NULL,
    imap_port INTEGER NOT NULL DEFAULT 993,
    imap_username VARCHAR(255) NOT NULL,
    imap_password VARCHAR(255) NOT NULL, -- Будет зашифрован
    encryption_type VARCHAR(10) DEFAULT 'SSL' CHECK (encryption_type IN ('TLS', 'SSL', 'NONE')),
    auto_reply_enabled BOOLEAN DEFAULT false,
    is_active BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Таблица шаблонов email
CREATE TABLE email_templates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id),
    template_type VARCHAR(50) NOT NULL, -- 'client_reply', 'admin_notification', 'auto_reply'
    template_name VARCHAR(255) NOT NULL,
    subject_template TEXT NOT NULL,
    body_template TEXT NOT NULL,
    variables JSON, -- Доступные переменные для шаблона
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Индексы
CREATE INDEX idx_smtp_settings_user_id ON smtp_settings(user_id);
CREATE INDEX idx_imap_settings_user_id ON imap_settings(user_id);
CREATE INDEX idx_email_templates_user_id ON email_templates(user_id);
CREATE INDEX idx_email_templates_type ON email_templates(template_type);

-- Удаляем TOTP секрет у существующего админа (включается опционально)
UPDATE users SET totp_secret = NULL WHERE username = 'admin';

-- Добавляем дефолтные шаблоны email для админа
INSERT INTO email_templates (user_id, template_type, template_name, subject_template, body_template, variables) 
SELECT id, 'client_reply', 'Ответ клиенту', 
       'Ответ на вашу заявку - {{service}}',
       'Здравствуйте, {{name}}!

Спасибо за обращение. Ваша заявка получена и будет обработана в ближайшее время.

Детали заявки:
- Услуга: {{service}}
- Email: {{email}}
- Сообщение: {{message}}

С уважением,
{{admin_name}}',
       '{"name": "Имя клиента", "email": "Email клиента", "service": "Выбранная услуга", "message": "Сообщение клиента", "admin_name": "Имя администратора"}'::json
FROM users WHERE username = 'admin';

INSERT INTO email_templates (user_id, template_type, template_name, subject_template, body_template, variables)
SELECT id, 'admin_notification', 'Уведомление админу', 
       'Новая заявка от {{name}} - {{service}}',
       'Получена новая заявка:

Клиент: {{name}}
Email: {{email}}
Телефон: {{phone}}
Услуга: {{service}}
Источник: {{source}}

Сообщение:
{{message}}

Время: {{timestamp}}',
       '{"name": "Имя клиента", "email": "Email клиента", "phone": "Телефон", "service": "Услуга", "source": "Источник заявки", "message": "Сообщение", "timestamp": "Время заявки"}'::json
FROM users WHERE username = 'admin';