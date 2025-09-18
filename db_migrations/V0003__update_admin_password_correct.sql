-- Создание корректного хеша для пароля admin123
-- Используем хеш, сгенерированный с помощью bcrypt
UPDATE users 
SET password_hash = '$2b$12$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'
WHERE username = 'admin';