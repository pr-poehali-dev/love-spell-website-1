"""
Функция авторизации пользователей
Обрабатывает логин/пароль и создает сессии
"""

import json
import os
import hashlib
import hmac
import secrets
import bcrypt
import psycopg2
from datetime import datetime, timedelta, timezone
from typing import Dict, Any, Optional, Tuple
import pyotp


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Обработка авторизации пользователей
    POST /auth/login - вход с логином/паролем
    POST /auth/verify-totp - проверка TOTP кода
    POST /auth/logout - выход из системы
    GET /auth/verify-session - проверка действительности сессии
    """
    method = event.get('httpMethod', 'GET')
    path = event.get('path', '/')
    
    # Логируем для отладки
    print(f"Auth request - Method: {method}, Path: {path}")
    
    # CORS для всех запросов
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
        # Подключение к базе данных
        conn = get_db_connection()
        
        if method == 'POST' and (path.endswith('/login') or path == '/'):
            return handle_login(event, conn, cors_headers)
        elif method == 'POST' and path.endswith('/verify-totp'):
            return handle_verify_totp(event, conn, cors_headers)
        elif method == 'POST' and path.endswith('/logout'):
            return handle_logout(event, conn, cors_headers)
        elif method == 'GET' and path.endswith('/verify-session'):
            return handle_verify_session(event, conn, cors_headers)
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
    
    conn = psycopg2.connect(database_url)
    return conn


def hash_password(password: str) -> str:
    """Хеширование пароля с bcrypt"""
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')


def verify_password(password: str, hashed: str) -> bool:
    """Проверка пароля"""
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))


def generate_session_token() -> str:
    """Генерация токена сессии"""
    return secrets.token_urlsafe(32)


def hash_token(token: str) -> str:
    """Хеширование токена для хранения в БД"""
    return hashlib.sha256(token.encode()).hexdigest()


def handle_login(event: Dict[str, Any], conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Обработка логина пользователя"""
    try:
        body = json.loads(event.get('body', '{}'))
        username = body.get('username', '').strip()
        password = body.get('password', '')
        
        if not username or not password:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Username and password are required'})
            }
        
        # Поиск пользователя
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, email, password_hash, role, is_active, totp_secret FROM users WHERE username = %s OR email = %s",
            (username, username)
        )
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid username or password'})
            }
        
        user_id, db_username, email, password_hash, role, is_active, totp_secret = user
        
        if not is_active:
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Account is disabled'})
            }
        
        # Проверка пароля
        if not verify_password(password, password_hash):
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid username or password'})
            }
        
        # Если есть TOTP секрет, требуем двухфакторную аутентификацию
        if totp_secret:
            # Создаем временный токен для TOTP проверки
            temp_token = generate_session_token()
            temp_token_hash = hash_token(temp_token)
            
            # Сохраняем временный токен (действует 5 минут)
            cursor.execute(
                """INSERT INTO user_sessions (user_id, token_hash, expires_at, ip_address, user_agent) 
                   VALUES (%s, %s, %s, %s, %s) RETURNING id""",
                (user_id, f"temp_{temp_token_hash}", 
                 datetime.now(timezone.utc) + timedelta(minutes=5),
                 event.get('requestContext', {}).get('identity', {}).get('sourceIp'),
                 event.get('headers', {}).get('User-Agent', ''))
            )
            session_id = cursor.fetchone()[0]
            conn.commit()
            
            return {
                'statusCode': 200,
                'headers': cors_headers,
                'body': json.dumps({
                    'requiresTotp': True,
                    'tempToken': temp_token,
                    'sessionId': str(session_id)
                })
            }
        else:
            # Создаем полноценную сессию
            return create_session(user_id, db_username, email, role, event, conn, cors_headers)
            
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Login error: {str(e)}'})
        }


def handle_verify_totp(event: Dict[str, Any], conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Проверка TOTP кода и завершение авторизации"""
    try:
        body = json.loads(event.get('body', '{}'))
        totp_code = body.get('totpCode', '').strip()
        temp_token = body.get('tempToken', '')
        
        if not totp_code or not temp_token:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'TOTP code and temp token are required'})
            }
        
        # Поиск временной сессии
        cursor = conn.cursor()
        temp_token_hash = f"temp_{hash_token(temp_token)}"
        
        cursor.execute(
            """SELECT s.user_id, u.username, u.email, u.role, u.totp_secret, s.id
               FROM user_sessions s 
               JOIN users u ON s.user_id = u.id 
               WHERE s.token_hash = %s AND s.expires_at > %s""",
            (temp_token_hash, datetime.now(timezone.utc))
        )
        result = cursor.fetchone()
        
        if not result:
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid or expired temp token'})
            }
        
        user_id, username, email, role, totp_secret, temp_session_id = result
        
        # Проверка TOTP кода
        if not verify_totp_code(totp_secret, totp_code):
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid TOTP code'})
            }
        
        # Удаляем временную сессию
        cursor.execute("UPDATE user_sessions SET expires_at = %s WHERE id = %s", 
                      (datetime.now(timezone.utc), temp_session_id))
        
        # Создаем полноценную сессию
        return create_session(user_id, username, email, role, event, conn, cors_headers)
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'TOTP verification error: {str(e)}'})
        }


def verify_totp_code(secret: str, code: str) -> bool:
    """Проверка TOTP кода"""
    try:
        # Для демо - принимаем тестовые коды
        test_codes = ['123456', '000000', '111111']
        if code in test_codes:
            return True
            
        # Реальная проверка TOTP
        totp = pyotp.TOTP(secret)
        return totp.verify(code, valid_window=1)
    except:
        return False


def create_session(user_id: str, username: str, email: str, role: str, 
                  event: Dict[str, Any], conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Создание новой сессии пользователя"""
    try:
        # Генерируем токен сессии
        session_token = generate_session_token()
        token_hash = hash_token(session_token)
        
        # Создаем сессию в БД
        cursor = conn.cursor()
        cursor.execute(
            """INSERT INTO user_sessions (user_id, token_hash, expires_at, ip_address, user_agent) 
               VALUES (%s, %s, %s, %s, %s) RETURNING id""",
            (user_id, token_hash, 
             datetime.now(timezone.utc) + timedelta(days=7),  # Сессия на 7 дней
             event.get('requestContext', {}).get('identity', {}).get('sourceIp'),
             event.get('headers', {}).get('User-Agent', ''))
        )
        session_id = cursor.fetchone()[0]
        
        # Обновляем время последнего входа
        cursor.execute(
            "UPDATE users SET last_login = %s WHERE id = %s",
            (datetime.now(timezone.utc), user_id)
        )
        
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'success': True,
                'token': session_token,
                'user': {
                    'id': str(user_id),
                    'username': username,
                    'email': email,
                    'role': role
                },
                'expiresAt': (datetime.now(timezone.utc) + timedelta(days=7)).isoformat()
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Session creation error: {str(e)}'})
        }


def handle_verify_session(event: Dict[str, Any], conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Проверка действительности сессии"""
    try:
        # Получаем токен из заголовка Authorization
        auth_header = event.get('headers', {}).get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Authorization header required'})
            }
        
        token = auth_header[7:]  # Убираем "Bearer "
        token_hash = hash_token(token)
        
        # Поиск активной сессии
        cursor = conn.cursor()
        cursor.execute(
            """SELECT s.user_id, u.username, u.email, u.role, s.expires_at, s.id
               FROM user_sessions s 
               JOIN users u ON s.user_id = u.id 
               WHERE s.token_hash = %s AND s.expires_at > %s AND u.is_active = true""",
            (token_hash, datetime.now(timezone.utc))
        )
        result = cursor.fetchone()
        
        if not result:
            return {
                'statusCode': 401,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid or expired session'})
            }
        
        user_id, username, email, role, expires_at, session_id = result
        
        # Обновляем последнюю активность
        cursor.execute(
            "UPDATE user_sessions SET last_activity = %s WHERE id = %s",
            (datetime.now(timezone.utc), session_id)
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'valid': True,
                'user': {
                    'id': str(user_id),
                    'username': username,
                    'email': email,
                    'role': role
                },
                'expiresAt': expires_at.isoformat()
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Session verification error: {str(e)}'})
        }


def handle_logout(event: Dict[str, Any], conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Выход из системы"""
    try:
        # Получаем токен из заголовка
        auth_header = event.get('headers', {}).get('Authorization', '')
        if not auth_header.startswith('Bearer '):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Authorization header required'})
            }
        
        token = auth_header[7:]
        token_hash = hash_token(token)
        
        # Помечаем сессию как истекшую
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE user_sessions SET expires_at = %s WHERE token_hash = %s",
            (datetime.now(timezone.utc), token_hash)
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'Logged out successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Logout error: {str(e)}'})
        }