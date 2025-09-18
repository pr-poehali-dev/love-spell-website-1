import bcrypt

# Создаем новый хеш для пароля admin123
password = "admin123"
salt = bcrypt.gensalt()
hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
print(f"New hash for 'admin123': {hashed.decode('utf-8')}")

# Проверяем, что хеш работает
check = bcrypt.checkpw(password.encode('utf-8'), hashed)
print(f"Hash verification: {check}")