import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface TotpSetupState {
  secret: string;
  qrCode: string;
  showSetup: boolean;
  verificationCode: string;
  settingUp: boolean;
}

interface TotpSetupDialogProps {
  totpSetup: TotpSetupState;
  onOpenChange: (open: boolean) => void;
  onCodeChange: (code: string) => void;
  onEnableTotp: () => void;
  onCancel: () => void;
}

export default function TotpSetupDialog({ 
  totpSetup, 
  onOpenChange, 
  onCodeChange, 
  onEnableTotp, 
  onCancel 
}: TotpSetupDialogProps) {
  return (
    <Dialog open={totpSetup.showSetup} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Настройка двухфакторной аутентификации</DialogTitle>
          <DialogDescription>
            Отсканируйте QR-код приложением аутентификатора и введите код для подтверждения
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {totpSetup.qrCode && (
            <div className="text-center">
              <img 
                src={totpSetup.qrCode} 
                alt="QR код для TOTP" 
                className="mx-auto mb-4 border rounded-lg"
              />
              <p className="text-sm text-muted-foreground mb-2">
                Или введите секрет вручную:
              </p>
              <code className="px-3 py-1 bg-muted rounded text-sm font-mono">
                {totpSetup.secret}
              </code>
            </div>
          )}
          
          <div>
            <Label htmlFor="totpCode">Код из приложения</Label>
            <Input
              id="totpCode"
              type="text"
              value={totpSetup.verificationCode}
              onChange={(e) => onCodeChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
              placeholder="000000"
              maxLength={6}
              className="text-center text-lg tracking-widest"
            />
          </div>
          
          <div className="flex gap-2">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={onCancel}
            >
              Отмена
            </Button>
            <Button 
              className="flex-1"
              onClick={onEnableTotp}
              disabled={totpSetup.verificationCode.length !== 6}
            >
              Включить TOTP
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}