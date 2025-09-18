import bcrypt

# Тестируем пароль admin123 с хешем из БД
password = "admin123"
stored_hash = "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBdXX7fJkL1K3K"

# Проверяем пароль
result = bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8'))
print(f"Password check result: {result}")

# Создаем новый хеш для admin123
new_hash = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
print(f"New hash for admin123: {new_hash.decode('utf-8')}")