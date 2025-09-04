import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp';
import { Wallet, UserCircle, Mail, Check, Loader2 } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';

export function ConnectButton() {
  const { isConnected, walletAddress, isConnecting, email, sendOTP, connectWallet, disconnect } = useWallet();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [emailInput, setEmailInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const handleSendOTP = async () => {
    if (!emailInput) return;
    
    await sendOTP(emailInput);
    setOtpSent(true);
  };

  const handleConnect = async () => {
    if (!emailInput || !otpInput) return;
    
    await connectWallet(emailInput, otpInput);
    setIsModalOpen(false);
    setOtpSent(false);
    setEmailInput('');
    setOtpInput('');
  };

  const handleDisconnect = () => {
    disconnect();
    setIsModalOpen(false);
  };

  if (isConnected && walletAddress) {
    return (
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger asChild>
          <Button 
            data-testid="button-connected-wallet"
            className="bg-gradient-to-r from-green-500 to-green-600 text-white hover:opacity-90 transition-opacity"
          >
            <UserCircle className="w-4 h-4 mr-2" />
            {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
          </Button>
        </DialogTrigger>
        <DialogContent className="glass-effect border-border">
          <DialogHeader>
            <DialogTitle className="text-center">Wallet Connected</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                <Check className="w-8 h-8 text-white" />
              </div>
              <p className="text-sm text-muted-foreground mb-2">Connected as: {email}</p>
              <p className="font-mono text-sm">{walletAddress}</p>
            </div>
            <Button 
              data-testid="button-disconnect"
              onClick={handleDisconnect} 
              variant="outline" 
              className="w-full"
            >
              Disconnect
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
      <DialogTrigger asChild>
        <Button 
          data-testid="button-connect-wallet"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground hover:opacity-90 transition-opacity"
        >
          <Wallet className="w-4 h-4 mr-2" />
          Connect Wallet
        </Button>
      </DialogTrigger>
      <DialogContent className="glass-effect border-border glow-effect">
        <DialogHeader>
          <DialogTitle className="text-center">Connect Your Wallet</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 pt-4">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
              <Wallet className="w-8 h-8 text-white" />
            </div>
            <p className="text-muted-foreground">
              Sign in with your email to automatically create a secure, self-custodial wallet powered by CDP Embedded Wallets.
            </p>
          </div>
          
          {!otpSent ? (
            <div className="space-y-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  data-testid="input-email"
                  placeholder="Enter your email address"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="bg-input border-border"
                />
              </div>
              <Button 
                data-testid="button-send-otp"
                onClick={handleSendOTP}
                disabled={!emailInput || isConnecting}
                className="w-full bg-gradient-to-r from-primary to-accent text-primary-foreground"
              >
                {isConnecting ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Mail className="w-4 h-4 mr-2" />
                )}
                Send OTP Code
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="otp">Enter OTP Code</Label>
                <InputOTP
                  maxLength={6}
                  value={otpInput}
                  onChange={setOtpInput}
                  data-testid="input-otp"
                >
                  <InputOTPGroup className="flex justify-center">
                    <InputOTPSlot index={0} />
                    <InputOTPSlot index={1} />
                    <InputOTPSlot index={2} />
                    <InputOTPSlot index={3} />
                    <InputOTPSlot index={4} />
                    <InputOTPSlot index={5} />
                  </InputOTPGroup>
                </InputOTP>
              </div>
              <div className="flex gap-2">
                <Button 
                  data-testid="button-back-email"
                  onClick={() => {setOtpSent(false); setOtpInput('');}}
                  variant="outline"
                  className="flex-1"
                >
                  Back
                </Button>
                <Button 
                  data-testid="button-verify-otp"
                  onClick={handleConnect}
                  disabled={otpInput.length !== 6 || isConnecting}
                  className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white"
                >
                  {isConnecting ? (
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  Verify & Connect
                </Button>
              </div>
            </div>
          )}
          
          <div className="text-xs text-muted-foreground text-center">
            Powered by CDP Embedded Wallets with ERC-4337 Smart Account creation
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
