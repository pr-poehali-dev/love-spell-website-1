"""
Функция управления настройками email
SMTP, IMAP, шаблоны писем
"""

import json
import os
import hashlib
import secrets
from cryptography.fernet import Fernet
import psycopg2
from datetime import datetime, timezone
from typing import Dict, Any, Optional


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Управление настройками email
    GET /email-settings - получение всех настроек
    POST /email-settings/smtp - сохранение SMTP настроек
    POST /email-settings/imap - сохранение IMAP настроек
    GET /email-settings/templates - получение шаблонов
    POST /email-settings/templates - сохранение шаблона
    POST /email-settings/test-smtp - тест SMTP соединения
    """
    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    
    # CORS заголовки
    cors_headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Max-Age': '86400'
    }
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': ''
        }
    
    try:
        # Проверяем авторизацию
        user_id = verify_authorization(event)
        if not user_id:
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Unauthorized'})
            }
        
        conn = get_db_connection()
        
        if method == 'GET' and path.endswith('/email-settings'):
            return handle_get_settings(user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/email-settings/smtp'):
            return handle_save_smtp(event, user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/email-settings/imap'):
            return handle_save_imap(event, user_id, conn, cors_headers)
        elif method == 'GET' and path.endswith('/email-settings/templates'):
            return handle_get_templates(user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/email-settings/templates'):
            return handle_save_template(event, user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/email-settings/test-smtp'):
            return handle_test_smtp(event, user_id, conn, cors_headers)
        else:
            return {
                'statusCode': 404,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Endpoint not found'})
            }
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Server error: {str(e)}'})
        }
    finally:
        if 'conn' in locals():
            conn.close()


def get_db_connection():
    """Создание подключения к базе данных"""
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        raise Exception('DATABASE_URL environment variable not set')
    return psycopg2.connect(database_url)


def verify_authorization(event: Dict[str, Any]) -> Optional[str]:
    """Проверка токена авторизации и возврат user_id"""
    auth_header = event.get('headers', {}).get('Authorization', '')
    if not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header[7:]
    token_hash = hashlib.sha256(token.encode()).hexdigest()
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """SELECT s.user_id FROM user_sessions s 
               JOIN users u ON s.user_id = u.id 
               WHERE s.token_hash = %s AND s.expires_at > %s AND u.is_active = true""",
            (token_hash, datetime.now(timezone.utc))
        )
        result = cursor.fetchone()
        conn.close()
        return str(result[0]) if result else None
    except:
        return None


def get_encryption_key():
    """Получение ключа шифрования для паролей"""
    # В реальном проекте это должно быть в переменных окружения
    key = os.environ.get('ENCRYPTION_KEY')
    if not key:
        # Генерируем стандартный ключ для демо
        key = 'ZmDfcTF7_60GrrY167zsiPd67pEvs0aGOv2oasOM1Pg='
    return key.encode()


def encrypt_password(password: str) -> str:
    """Шифрование пароля"""
    fernet = Fernet(get_encryption_key())
    return fernet.encrypt(password.encode()).decode()


def decrypt_password(encrypted_password: str) -> str:
    """Расшифровка пароля"""
    fernet = Fernet(get_encryption_key())
    return fernet.decrypt(encrypted_password.encode()).decode()


def handle_get_settings(user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Получение всех настроек email"""
    try:
        cursor = conn.cursor()
        
        # SMTP настройки
        cursor.execute(
            """SELECT smtp_host, smtp_port, smtp_username, sender_name, sender_email, 
                      encryption_type, is_active FROM smtp_settings 
               WHERE user_id = %s ORDER BY created_at DESC LIMIT 1""",
            (user_id,)
        )
        smtp_result = cursor.fetchone()
        
        smtp_settings = None
        if smtp_result:
            smtp_settings = {
                'smtpHost': smtp_result[0],
                'smtpPort': smtp_result[1],
                'smtpUsername': smtp_result[2],
                'senderName': smtp_result[3],
                'senderEmail': smtp_result[4],
                'encryptionType': smtp_result[5],
                'isActive': smtp_result[6]
            }
        
        # IMAP настройки
        cursor.execute(
            """SELECT imap_host, imap_port, imap_username, encryption_type, 
                      auto_reply_enabled, is_active FROM imap_settings 
               WHERE user_id = %s ORDER BY created_at DESC LIMIT 1""",
            (user_id,)
        )
        imap_result = cursor.fetchone()
        
        imap_settings = None
        if imap_result:
            imap_settings = {
                'imapHost': imap_result[0],
                'imapPort': imap_result[1],
                'imapUsername': imap_result[2],
                'encryptionType': imap_result[3],
                'autoReplyEnabled': imap_result[4],
                'isActive': imap_result[5]
            }
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'smtp': smtp_settings,
                'imap': imap_settings
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Settings fetch error: {str(e)}'})
        }


def handle_save_smtp(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Сохранение SMTP настроек"""
    try:
        body = json.loads(event.get('body', '{}'))
        
        smtp_host = body.get('smtpHost', '').strip()
        smtp_port = int(body.get('smtpPort', 587))
        smtp_username = body.get('smtpUsername', '').strip()
        smtp_password = body.get('smtpPassword', '').strip()
        sender_name = body.get('senderName', '').strip()
        sender_email = body.get('senderEmail', '').strip()
        encryption_type = body.get('encryptionType', 'TLS')
        
        if not all([smtp_host, smtp_username, smtp_password, sender_name, sender_email]):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'All SMTP fields are required'})
            }
        
        # Шифруем пароль
        encrypted_password = encrypt_password(smtp_password)
        
        cursor = conn.cursor()
        
        # Деактивируем предыдущие настройки
        cursor.execute(
            "UPDATE smtp_settings SET is_active = false WHERE user_id = %s",
            (user_id,)
        )
        
        # Сохраняем новые настройки
        cursor.execute(
            """INSERT INTO smtp_settings 
               (user_id, smtp_host, smtp_port, smtp_username, smtp_password, 
                sender_name, sender_email, encryption_type, is_active) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, %s, true)""",
            (user_id, smtp_host, smtp_port, smtp_username, encrypted_password,
             sender_name, sender_email, encryption_type)
        )
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'SMTP settings saved'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'SMTP save error: {str(e)}'})
        }


def handle_save_imap(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Сохранение IMAP настроек"""
    try:
        body = json.loads(event.get('body', '{}'))
        
        imap_host = body.get('imapHost', '').strip()
        imap_port = int(body.get('imapPort', 993))
        imap_username = body.get('imapUsername', '').strip()
        imap_password = body.get('imapPassword', '').strip()
        encryption_type = body.get('encryptionType', 'SSL')
        auto_reply_enabled = body.get('autoReplyEnabled', False)
        
        if not all([imap_host, imap_username, imap_password]):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'All IMAP fields are required'})
            }
        
        # Шифруем пароль
        encrypted_password = encrypt_password(imap_password)
        
        cursor = conn.cursor()
        
        # Деактивируем предыдущие настройки
        cursor.execute(
            "UPDATE imap_settings SET is_active = false WHERE user_id = %s",
            (user_id,)
        )
        
        # Сохраняем новые настройки
        cursor.execute(
            """INSERT INTO imap_settings 
               (user_id, imap_host, imap_port, imap_username, imap_password, 
                encryption_type, auto_reply_enabled, is_active) 
               VALUES (%s, %s, %s, %s, %s, %s, %s, true)""",
            (user_id, imap_host, imap_port, imap_username, encrypted_password,
             encryption_type, auto_reply_enabled)
        )
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'IMAP settings saved'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'IMAP save error: {str(e)}'})
        }


def handle_get_templates(user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Получение шаблонов email"""
    try:
        cursor = conn.cursor()
        cursor.execute(
            """SELECT id, template_type, template_name, subject_template, 
                      body_template, variables, is_active 
               FROM email_templates WHERE user_id = %s ORDER BY template_type, template_name""",
            (user_id,)
        )
        
        templates = []
        for row in cursor.fetchall():
            templates.append({
                'id': str(row[0]),
                'templateType': row[1],
                'templateName': row[2],
                'subjectTemplate': row[3],
                'bodyTemplate': row[4],
                'variables': row[5],
                'isActive': row[6]
            })
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'templates': templates})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Templates fetch error: {str(e)}'})
        }


def handle_save_template(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Сохранение шаблона email"""
    try:
        body = json.loads(event.get('body', '{}'))
        
        template_id = body.get('id')
        template_type = body.get('templateType', '').strip()
        template_name = body.get('templateName', '').strip()
        subject_template = body.get('subjectTemplate', '').strip()
        body_template = body.get('bodyTemplate', '').strip()
        variables = body.get('variables', {})
        is_active = body.get('isActive', True)
        
        if not all([template_type, template_name, subject_template, body_template]):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'All template fields are required'})
            }
        
        cursor = conn.cursor()
        
        if template_id:
            # Обновляем существующий шаблон
            cursor.execute(
                """UPDATE email_templates 
                   SET template_type = %s, template_name = %s, subject_template = %s, 
                       body_template = %s, variables = %s, is_active = %s, updated_at = %s
                   WHERE id = %s AND user_id = %s""",
                (template_type, template_name, subject_template, body_template,
                 json.dumps(variables), is_active, datetime.now(timezone.utc),
                 template_id, user_id)
            )
        else:
            # Создаем новый шаблон
            cursor.execute(
                """INSERT INTO email_templates 
                   (user_id, template_type, template_name, subject_template, 
                    body_template, variables, is_active) 
                   VALUES (%s, %s, %s, %s, %s, %s, %s)""",
                (user_id, template_type, template_name, subject_template,
                 body_template, json.dumps(variables), is_active)
            )
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'Template saved'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Template save error: {str(e)}'})
        }


def handle_test_smtp(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Тест SMTP соединения"""
    try:
        body = json.loads(event.get('body', '{}'))
        test_email = body.get('testEmail', '').strip()
        
        if not test_email:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Test email is required'})
            }
        
        # Получаем SMTP настройки
        cursor = conn.cursor()
        cursor.execute(
            """SELECT smtp_host, smtp_port, smtp_username, smtp_password, 
                      sender_name, sender_email, encryption_type 
               FROM smtp_settings WHERE user_id = %s AND is_active = true""",
            (user_id,)
        )
        
        smtp_config = cursor.fetchone()
        if not smtp_config:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'No active SMTP settings found'})
            }
        
        # В реальном проекте здесь был бы настоящий тест SMTP
        # Для демо возвращаем успех
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'success': True, 
                'message': f'Test email would be sent to {test_email}',
                'note': 'SMTP test simulated (real SMTP requires external server)'
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'SMTP test error: {str(e)}'})
        }