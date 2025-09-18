import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/contexts/AuthContextReal';
import ProfileForm from './profile/ProfileForm';
import SecuritySettings from './profile/SecuritySettings';
import TotpSetupDialog from './profile/TotpSetupDialog';
import { useProfileApi } from './profile/hooks/useProfileApi';

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

interface TotpSetupState {
  secret: string;
  qrCode: string;
  showSetup: boolean;
  verificationCode: string;
  settingUp: boolean;
}

export default function ProfileManagement() {
  const { user } = useAuth();
  const { loading, updating, loadProfile, updateProfile, setupTotp, enableTotp, disableTotp } = useProfileApi();
  
  const [profile, setProfile] = useState<UserProfile | null>(null);
  
  const [profileForm, setProfileForm] = useState<ProfileFormData>({
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [totpSetup, setTotpSetup] = useState<TotpSetupState>({
    secret: '',
    qrCode: '',
    showSetup: false,
    verificationCode: '',
    settingUp: false
  });

  useEffect(() => {
    const fetchProfile = async () => {
      const profileData = await loadProfile();
      if (profileData) {
        setProfile(profileData);
        setProfileForm(prev => ({
          ...prev,
          email: profileData.email
        }));
      }
    };
    
    fetchProfile();
  }, []);

  const handleProfileFormChange = (updates: Partial<ProfileFormData>) => {
    setProfileForm(prev => ({ ...prev, ...updates }));
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const success = await updateProfile(profileForm, profile);
    if (success) {
      setProfileForm(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }));
      
      const updatedProfile = await loadProfile();
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    }
  };

  const handleSetupTotp = async () => {
    setTotpSetup(prev => ({ ...prev, settingUp: true }));
    
    const setupData = await setupTotp();
    if (setupData) {
      setTotpSetup(prev => ({
        ...prev,
        secret: setupData.secret,
        qrCode: setupData.qrCode,
        showSetup: true,
        settingUp: false
      }));
    } else {
      setTotpSetup(prev => ({ ...prev, settingUp: false }));
    }
  };

  const handleEnableTotp = async () => {
    if (!totpSetup.verificationCode) {
      return;
    }
    
    const success = await enableTotp(totpSetup.verificationCode);
    if (success) {
      setTotpSetup({
        secret: '',
        qrCode: '',
        showSetup: false,
        verificationCode: '',
        settingUp: false
      });
      
      const updatedProfile = await loadProfile();
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    }
  };

  const handleDisableTotp = async () => {
    const success = await disableTotp();
    if (success) {
      const updatedProfile = await loadProfile();
      if (updatedProfile) {
        setProfile(updatedProfile);
      }
    }
  };

  const handleTotpDialogClose = (open: boolean) => {
    setTotpSetup(prev => ({ ...prev, showSetup: open }));
  };

  const handleTotpCodeChange = (code: string) => {
    setTotpSetup(prev => ({ ...prev, verificationCode: code }));
  };

  const handleTotpCancel = () => {
    setTotpSetup(prev => ({ ...prev, showSetup: false }));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Icon name="Loader2" size={32} className="animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Управление профилем</h2>
        <p className="text-muted-foreground">Настройка аккаунта и безопасности</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Профиль</TabsTrigger>
          <TabsTrigger value="security">Безопасность</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <ProfileForm
            profile={profile}
            profileForm={profileForm}
            updating={updating}
            onFormChange={handleProfileFormChange}
            onSubmit={handleUpdateProfile}
          />
        </TabsContent>

        <TabsContent value="security">
          <SecuritySettings
            profile={profile}
            totpSetup={totpSetup}
            onSetupTotp={handleSetupTotp}
            onDisableTotp={handleDisableTotp}
          />
        </TabsContent>
      </Tabs>

      <TotpSetupDialog
        totpSetup={totpSetup}
        onOpenChange={handleTotpDialogClose}
        onCodeChange={handleTotpCodeChange}
        onEnableTotp={handleEnableTotp}
        onCancel={handleTotpCancel}
      />
    </div>
  );
}