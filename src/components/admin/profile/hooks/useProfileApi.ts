import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';

const PROFILE_API_URL = 'https://functions.poehali.dev/82cc712c-4bde-4a84-9f35-35eabb28a934';

interface UserProfile {
  id: string;
  username: string;
  email: string;
  role: string;
  totpEnabled: boolean;
  lastLogin: string | null;
  createdAt: string | null;
}

interface ProfileFormData {
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export function useProfileApi() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('admin_auth');
    if (!token) throw new Error('No auth token');
    
    const authData = JSON.parse(token);
    return {
      'Authorization': `Bearer ${authData.token}`,
      'Content-Type': 'application/json'
    };
  };

  const loadProfile = async (): Promise<UserProfile | null> => {
    try {
      const response = await fetch(`${PROFILE_API_URL}/profile`, {
        headers: getAuthHeaders()
      });
      
      if (response.ok) {
        const data = await response.json();
        return data.user;
      } else {
        throw new Error('Failed to load profile');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Не удалось загрузить профиль"
      });
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (profileForm: ProfileFormData, currentProfile: UserProfile | null) => {
    if (!profileForm.currentPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Введите текущий пароль"
      });
      return false;
    }
    
    if (profileForm.newPassword && profileForm.newPassword !== profileForm.confirmPassword) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: "Пароли не совпадают"
      });
      return false;
    }
    
    setUpdating(true);
    
    try {
      const response = await fetch(`${PROFILE_API_URL}/profile/update`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          email: profileForm.email !== currentProfile?.email ? profileForm.email : undefined,
          password: profileForm.newPassword || undefined,
          currentPassword: profileForm.currentPassword
        })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Профиль обновлен"
        });
        return true;
      } else {
        throw new Error(data.error || 'Update failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось обновить профиль"
      });
      return false;
    } finally {
      setUpdating(false);
    }
  };

  const setupTotp = async () => {
    try {
      const response = await fetch(`${PROFILE_API_URL}/profile/setup-totp`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        return {
          secret: data.secret,
          qrCode: data.qrCode
        };
      } else {
        throw new Error(data.error || 'TOTP setup failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось настроить TOTP"
      });
      return null;
    }
  };

  const enableTotp = async (totpCode: string) => {
    try {
      const response = await fetch(`${PROFILE_API_URL}/profile/enable-totp`, {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({ totpCode })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Двухфакторная аутентификация включена"
        });
        return true;
      } else {
        throw new Error(data.error || 'TOTP enable failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Неверный код"
      });
      return false;
    }
  };

  const disableTotp = async () => {
    try {
      const response = await fetch(`${PROFILE_API_URL}/profile/disable-totp`, {
        method: 'POST',
        headers: getAuthHeaders()
      });
      
      const data = await response.json();
      
      if (response.ok) {
        toast({
          title: "Успешно",
          description: "Двухфакторная аутентификация отключена"
        });
        return true;
      } else {
        throw new Error(data.error || 'TOTP disable failed');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Ошибка",
        description: error.message || "Не удалось отключить TOTP"
      });
      return false;
    }
  };

  return {
    loading,
    updating,
    loadProfile,
    updateProfile,
    setupTotp,
    enableTotp,
    disableTotp
  };
}