"""
Функция управления профилем пользователя
Изменение пароля, email, настройка TOTP
"""

import json
import os
import hashlib
import secrets
import bcrypt
import psycopg2
import qrcode
import base64
from io import BytesIO
from datetime import datetime, timezone
from typing import Dict, Any, Optional
import pyotp


def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Управление профилем пользователя
    GET /profile - получение информации о профиле
    POST /profile/update - обновление email/пароля
    POST /profile/setup-totp - настройка TOTP (генерация секрета и QR)
    POST /profile/enable-totp - включение TOTP с проверкой кода
    POST /profile/disable-totp - отключение TOTP
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
        
        if method == 'GET' and path.endswith('/profile'):
            return handle_get_profile(user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/profile/update'):
            return handle_update_profile(event, user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/profile/setup-totp'):
            return handle_setup_totp(user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/profile/enable-totp'):
            return handle_enable_totp(event, user_id, conn, cors_headers)
        elif method == 'POST' and path.endswith('/profile/disable-totp'):
            return handle_disable_totp(user_id, conn, cors_headers)
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


def handle_get_profile(user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Получение информации о профиле"""
    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, email, role, totp_secret, last_login, created_at FROM users WHERE id = %s",
            (user_id,)
        )
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': cors_headers,
                'body': json.dumps({'error': 'User not found'})
            }
        
        id, username, email, role, totp_secret, last_login, created_at = user
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'user': {
                    'id': str(id),
                    'username': username,
                    'email': email,
                    'role': role,
                    'totpEnabled': bool(totp_secret),
                    'lastLogin': last_login.isoformat() if last_login else None,
                    'createdAt': created_at.isoformat() if created_at else None
                }
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Profile fetch error: {str(e)}'})
        }


def handle_update_profile(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Обновление email и/или пароля"""
    try:
        body = json.loads(event.get('body', '{}'))
        new_email = body.get('email', '').strip()
        new_password = body.get('password', '').strip()
        current_password = body.get('currentPassword', '').strip()
        
        if not current_password:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Current password is required'})
            }
        
        # Проверяем текущий пароль
        cursor = conn.cursor()
        cursor.execute("SELECT password_hash FROM users WHERE id = %s", (user_id,))
        result = cursor.fetchone()
        
        if not result or not bcrypt.checkpw(current_password.encode('utf-8'), result[0].encode('utf-8')):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid current password'})
            }
        
        updates = []
        values = []
        
        # Обновление email
        if new_email:
            # Проверяем уникальность email
            cursor.execute("SELECT id FROM users WHERE email = %s AND id != %s", (new_email, user_id))
            if cursor.fetchone():
                return {
                    'statusCode': 400,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Email already exists'})
                }
            updates.append('email = %s')
            values.append(new_email)
        
        # Обновление пароля
        if new_password:
            if len(new_password) < 6:
                return {
                    'statusCode': 400,
                    'headers': cors_headers,
                    'body': json.dumps({'error': 'Password must be at least 6 characters'})
                }
            
            password_hash = bcrypt.hashpw(new_password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
            updates.append('password_hash = %s')
            values.append(password_hash)
        
        if not updates:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'No updates provided'})
            }
        
        # Обновляем данные
        updates.append('updated_at = %s')
        values.append(datetime.now(timezone.utc))
        values.append(user_id)
        
        cursor.execute(
            f"UPDATE users SET {', '.join(updates)} WHERE id = %s",
            values
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'Profile updated successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'Profile update error: {str(e)}'})
        }


def handle_setup_totp(user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Генерация нового TOTP секрета и QR кода"""
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT username, email FROM users WHERE id = %s", (user_id,))
        user = cursor.fetchone()
        
        if not user:
            return {
                'statusCode': 404,
                'headers': cors_headers,
                'body': json.dumps({'error': 'User not found'})
            }
        
        username, email = user
        
        # Генерируем новый секрет
        secret = pyotp.random_base32()
        
        # Создаем TOTP URI
        totp_uri = pyotp.totp.TOTP(secret).provisioning_uri(
            name=email,
            issuer_name="Love Spell Admin"
        )
        
        # Генерируем QR код
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(totp_uri)
        qr.make(fit=True)
        
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Конвертируем в base64
        buffer = BytesIO()
        img.save(buffer, format='PNG')
        qr_code_base64 = base64.b64encode(buffer.getvalue()).decode()
        
        # Временно сохраняем секрет (не активируем)
        cursor.execute(
            "UPDATE users SET totp_secret = %s WHERE id = %s",
            (f"temp_{secret}", user_id)
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({
                'secret': secret,
                'qrCode': f"data:image/png;base64,{qr_code_base64}",
                'uri': totp_uri
            })
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'TOTP setup error: {str(e)}'})
        }


def handle_enable_totp(event: Dict[str, Any], user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Включение TOTP после проверки кода"""
    try:
        body = json.loads(event.get('body', '{}'))
        totp_code = body.get('totpCode', '').strip()
        
        if not totp_code:
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'TOTP code is required'})
            }
        
        # Получаем временный секрет
        cursor = conn.cursor()
        cursor.execute("SELECT totp_secret FROM users WHERE id = %s", (user_id,))
        result = cursor.fetchone()
        
        if not result or not result[0] or not result[0].startswith('temp_'):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'No TOTP setup in progress'})
            }
        
        secret = result[0][5:]  # Убираем префикс 'temp_'
        
        # Проверяем код
        totp = pyotp.TOTP(secret)
        if not totp.verify(totp_code, valid_window=1):
            return {
                'statusCode': 400,
                'headers': cors_headers,
                'body': json.dumps({'error': 'Invalid TOTP code'})
            }
        
        # Активируем TOTP
        cursor.execute(
            "UPDATE users SET totp_secret = %s WHERE id = %s",
            (secret, user_id)
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'TOTP enabled successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'TOTP enable error: {str(e)}'})
        }


def handle_disable_totp(user_id: str, conn, cors_headers: Dict[str, str]) -> Dict[str, Any]:
    """Отключение TOTP"""
    try:
        cursor = conn.cursor()
        cursor.execute(
            "UPDATE users SET totp_secret = NULL WHERE id = %s",
            (user_id,)
        )
        conn.commit()
        
        return {
            'statusCode': 200,
            'headers': cors_headers,
            'body': json.dumps({'success': True, 'message': 'TOTP disabled successfully'})
        }
        
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': cors_headers,
            'body': json.dumps({'error': f'TOTP disable error: {str(e)}'})
        }