import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'admin' | 'user';
  permissions: string[];
  lastLogin?: Date;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<{ success: boolean; requiresTotp?: boolean; error?: string }>;
  verifyTotp: (code: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Секретные данные для авторизации (в реальном проекте это было бы в базе данных)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'admin123', // В реальном проекте пароль должен быть захешированы
  email: 'admin@example.com'
};

// Симуляция TOTP кода (в реальном проекте использовался бы speakeasy или подобная библиотека)
const VALID_TOTP_CODES = ['123456', '000000', '111111']; // Тестовые коды

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [pendingAuth, setPendingAuth] = useState<{username: string; password: string} | null>(null);

  // Проверка сохраненной сессии при загрузке
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.token && authData.expiry > Date.now()) {
          // Токен действителен
          setUser(authData.user);
        } else {
          // Токен истек
          localStorage.removeItem('admin_auth');
        }
      } catch (error) {
        console.error('Ошибка восстановления сессии:', error);
        localStorage.removeItem('admin_auth');
      }
    }
    setIsLoading(false);
  }, []);

  const generateToken = (): string => {
    // Простая генерация JWT-подобного токена
    const header = btoa(JSON.stringify({ typ: 'JWT', alg: 'HS256' }));
    const payload = btoa(JSON.stringify({ 
      sub: ADMIN_CREDENTIALS.username,
      iat: Date.now(),
      exp: Date.now() + (24 * 60 * 60 * 1000) // 24 часа
    }));
    const signature = btoa(`${header}.${payload}.secret_key`);
    return `${header}.${payload}.${signature}`;
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; requiresTotp?: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Проверка учетных данных
      if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        // Сохраняем данные для двухфакторной аутентификации
        setPendingAuth({ username, password });
        setIsLoading(false);
        return { success: true, requiresTotp: true };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Неверный логин или пароль' };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Ошибка сервера' };
    }
  };

  const verifyTotp = async (code: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      // Симуляция задержки API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (!pendingAuth) {
        setIsLoading(false);
        return { success: false, error: 'Сессия истекла. Попробуйте войти заново' };
      }
      
      // Проверка TOTP кода
      if (VALID_TOTP_CODES.includes(code)) {
        const adminUser: User = {
          id: '1',
          username: pendingAuth.username,
          email: ADMIN_CREDENTIALS.email,
          role: 'admin',
          permissions: ['read', 'write', 'delete', 'admin'],
          lastLogin: new Date()
        };
        
        const token = generateToken();
        const authData = {
          user: adminUser,
          token,
          expiry: Date.now() + (24 * 60 * 60 * 1000) // 24 часа
        };
        
        // Сохраняем в localStorage
        localStorage.setItem('admin_auth', JSON.stringify(authData));
        
        setUser(adminUser);
        setPendingAuth(null);
        setIsLoading(false);
        
        return { success: true };
      } else {
        setIsLoading(false);
        return { success: false, error: 'Неверный код аутентификации' };
      }
    } catch (error) {
      setIsLoading(false);
      return { success: false, error: 'Ошибка сервера' };
    }
  };

  const logout = () => {
    localStorage.removeItem('admin_auth');
    setUser(null);
    setPendingAuth(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    try {
      const savedAuth = localStorage.getItem('admin_auth');
      if (!savedAuth) return false;
      
      const authData = JSON.parse(savedAuth);
      if (authData.expiry <= Date.now()) {
        logout();
        return false;
      }
      
      // Обновляем токен если осталось меньше часа
      if (authData.expiry - Date.now() < 60 * 60 * 1000) {
        const newToken = generateToken();
        const newAuthData = {
          ...authData,
          token: newToken,
          expiry: Date.now() + (24 * 60 * 60 * 1000)
        };
        localStorage.setItem('admin_auth', JSON.stringify(newAuthData));
      }
      
      return true;
    } catch (error) {
      console.error('Ошибка обновления токена:', error);
      logout();
      return false;
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    verifyTotp,
    logout,
    refreshToken
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth должен использоваться внутри AuthProvider');
  }
  return context;
};