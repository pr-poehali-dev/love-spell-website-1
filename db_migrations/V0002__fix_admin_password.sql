-- Обновление пароля admin для исправления проблем с входом
UPDATE users 
SET password_hash = '$2b$12$iVWUmqJOYH8.jBtR8/r9t.gEzEXzqg8iGXHnl.L/Bb5Y/1J5J1JJ.'
WHERE username = 'admin';