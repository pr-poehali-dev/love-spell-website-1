import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Icon from '@/components/ui/icon';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredPermissions?: string[];
  fallbackTo?: string;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredPermissions = [],
  fallbackTo = '/admin/login'
}) => {
  const { isAuthenticated, isLoading, user, refreshToken } = useAuth();
  const location = useLocation();

  useEffect(() => {
    // Автоматическое обновление токена при загрузке защищенной страницы
    if (isAuthenticated) {
      refreshToken();
    }
  }, [isAuthenticated, refreshToken]);

  // Показываем лоадер пока проверяем авторизацию
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Icon name="Loader2" size={32} className="animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Проверка авторизации...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован - редирект на логин
  if (!isAuthenticated) {
    return <Navigate to={fallbackTo} state={{ from: location }} replace />;
  }

  // Проверка прав доступа
  if (requiredPermissions.length > 0 && user) {
    const hasPermission = requiredPermissions.every(permission => 
      user.permissions.includes(permission)
    );
    
    if (!hasPermission) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center space-y-4 max-w-md">
            <Icon name="ShieldAlert" size={48} className="mx-auto text-destructive" />
            <h1 className="text-2xl font-bold">Доступ запрещен</h1>
            <p className="text-muted-foreground">
              У вас недостаточно прав для доступа к этой странице.
            </p>
            <p className="text-sm text-muted-foreground">
              Требуемые права: {requiredPermissions.join(', ')}
            </p>
          </div>
        </div>
      );
    }
  }

  return <>{children}</>;
};

// Хук для проверки конкретных разрешений
export const usePermissions = () => {
  const { user } = useAuth();
  
  const hasPermission = (permission: string): boolean => {
    return user?.permissions.includes(permission) || false;
  };
  
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some(permission => hasPermission(permission));
  };
  
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every(permission => hasPermission(permission));
  };
  
  return {
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    permissions: user?.permissions || []
  };
};