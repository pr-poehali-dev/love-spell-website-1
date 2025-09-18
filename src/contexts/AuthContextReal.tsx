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
  login: (username: string, password: string) => Promise<{ success: boolean; requiresTotp?: boolean; error?: string; tempToken?: string }>;
  verifyTotp: (code: string, tempToken: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshToken: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// URL бэкенд функции авторизации
const AUTH_API_URL = 'https://functions.poehali.dev/0a99f1f9-19eb-4bfc-ab8e-601e9b288e6c';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [currentToken, setCurrentToken] = useState<string | null>(null);

  // Проверка сохраненной сессии при загрузке
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      try {
        const authData = JSON.parse(savedAuth);
        if (authData.token && authData.expiresAt && new Date(authData.expiresAt) > new Date()) {
          setCurrentToken(authData.token);
          // Проверяем сессию на сервере
          verifySession(authData.token);
        } else {
          // Токен истек
          localStorage.removeItem('admin_auth');
          setIsLoading(false);
        }
      } catch (error) {
        console.error('Ошибка восстановления сессии:', error);
        localStorage.removeItem('admin_auth');
        setIsLoading(false);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifySession = async (token: string) => {
    try {
      const response = await fetch(`${AUTH_API_URL}/verify-session`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.valid && data.user) {
          const userData: User = {
            id: data.user.id,
            username: data.user.username,
            email: data.user.email,
            role: data.user.role,
            permissions: data.user.role === 'admin' ? ['read', 'write', 'delete', 'admin'] : ['read'],
            lastLogin: new Date()
          };
          setUser(userData);
          setCurrentToken(token);
        } else {
          // Недействительная сессия
          localStorage.removeItem('admin_auth');
          setCurrentToken(null);
        }
      } else {
        // Ошибка проверки сессии
        localStorage.removeItem('admin_auth');
        setCurrentToken(null);
      }
    } catch (error) {
      console.error('Ошибка проверки сессии:', error);
      localStorage.removeItem('admin_auth');
      setCurrentToken(null);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (username: string, password: string): Promise<{ success: boolean; requiresTotp?: boolean; error?: string; tempToken?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${AUTH_API_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json();

      if (response.ok) {
        if (data.requiresTotp) {
          // Требуется TOTP
          setIsLoading(false);
          return { 
            success: true, 
            requiresTotp: true, 
            tempToken: data.tempToken 
          };
        } else if (data.success && data.token) {
          // Успешный вход без TOTP
          await saveSession(data);
          setIsLoading(false);
          return { success: true };
        }
      }
      
      setIsLoading(false);
      return { 
        success: false, 
        error: data.error || 'Неверные учетные данные' 
      };
    } catch (error) {
      setIsLoading(false);
      console.error('Ошибка входа:', error);
      return { 
        success: false, 
        error: 'Ошибка подключения к серверу' 
      };
    }
  };

  const verifyTotp = async (code: string, tempToken: string): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    
    try {
      const response = await fetch(`${AUTH_API_URL}/verify-totp`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ totpCode: code, tempToken })
      });

      const data = await response.json();

      if (response.ok && data.success) {
        await saveSession(data);
        setIsLoading(false);
        return { success: true };
      } else {
        setIsLoading(false);
        return { 
          success: false, 
          error: data.error || 'Неверный код аутентификации' 
        };
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Ошибка TOTP:', error);
      return { 
        success: false, 
        error: 'Ошибка подключения к серверу' 
      };
    }
  };

  const saveSession = async (data: any) => {
    const userData: User = {
      id: data.user.id,
      username: data.user.username,
      email: data.user.email,
      role: data.user.role,
      permissions: data.user.role === 'admin' ? ['read', 'write', 'delete', 'admin'] : ['read'],
      lastLogin: new Date()
    };

    setUser(userData);
    setCurrentToken(data.token);

    // Сохраняем в localStorage
    const authData = {
      user: userData,
      token: data.token,
      expiresAt: data.expiresAt
    };
    localStorage.setItem('admin_auth', JSON.stringify(authData));
  };

  const logout = async () => {
    if (currentToken) {
      try {
        // Уведомляем сервер о выходе
        await fetch(`${AUTH_API_URL}/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${currentToken}`,
            'Content-Type': 'application/json'
          }
        });
      } catch (error) {
        console.error('Ошибка выхода:', error);
      }
    }

    // Очищаем локальные данные
    localStorage.removeItem('admin_auth');
    setUser(null);
    setCurrentToken(null);
  };

  const refreshToken = async (): Promise<boolean> => {
    if (!currentToken) return false;
    
    try {
      // Проверяем текущую сессию
      await verifySession(currentToken);
      return !!user;
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