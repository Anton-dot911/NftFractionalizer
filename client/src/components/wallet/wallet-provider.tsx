import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  isConnected: boolean;
  walletAddress?: string;
  isConnecting: boolean;
  email?: string;
}

interface WalletContextType extends WalletState {
  connectWallet: (email: string, otp: string) => Promise<void>;
  sendOTP: (email: string) => Promise<void>;
  disconnect: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [walletState, setWalletState] = useState<WalletState>({
    isConnected: false,
    isConnecting: false,
  });
  const { toast } = useToast();

  // Check for existing wallet connection on mount
  useEffect(() => {
    const savedWallet = localStorage.getItem('wallet_address');
    const savedEmail = localStorage.getItem('user_email');
    
    if (savedWallet && savedEmail) {
      setWalletState({
        isConnected: true,
        walletAddress: savedWallet,
        email: savedEmail,
        isConnecting: false,
      });
    }
  }, []);

  const sendOTP = async (email: string) => {
    try {
      setWalletState(prev => ({ ...prev, isConnecting: true }));
      
      // TODO: Integrate CDP Embedded Wallets SDK
      // This would typically call CDP SDK to send OTP
      // For now, simulate the process
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setWalletState(prev => ({ ...prev, email, isConnecting: false }));
      
      toast({
        title: "OTP Sent",
        description: "Please check your email for the verification code.",
      });
    } catch (error) {
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      toast({
        title: "Error",
        description: "Failed to send OTP. Please try again.",
        variant: "destructive",
      });
    }
  };

  const connectWallet = async (email: string, otp: string) => {
    try {
      setWalletState(prev => ({ ...prev, isConnecting: true }));
      
      // TODO: Integrate CDP Embedded Wallets SDK
      // This would typically:
      // 1. Verify OTP with CDP
      // 2. Create Smart Account if needed
      // 3. Return wallet address
      
      // Simulate wallet creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Generate mock wallet address for demo
      const walletAddress = `0x${Math.random().toString(16).substr(2, 40)}`;
      
      // Save to localStorage
      localStorage.setItem('wallet_address', walletAddress);
      localStorage.setItem('user_email', email);
      
      setWalletState({
        isConnected: true,
        walletAddress,
        email,
        isConnecting: false,
      });
      
      toast({
        title: "Wallet Connected",
        description: "Your Smart Account has been created successfully!",
      });
    } catch (error) {
      setWalletState(prev => ({ ...prev, isConnecting: false }));
      toast({
        title: "Connection Failed",
        description: "Failed to connect wallet. Please try again.",
        variant: "destructive",
      });
    }
  };

  const disconnect = () => {
    localStorage.removeItem('wallet_address');
    localStorage.removeItem('user_email');
    setWalletState({
      isConnected: false,
      isConnecting: false,
    });
    
    toast({
      title: "Wallet Disconnected",
      description: "You have been logged out successfully.",
    });
  };

  const contextValue: WalletContextType = {
    ...walletState,
    connectWallet,
    sendOTP,
    disconnect,
  };

  return (
    <WalletContext.Provider value={contextValue}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
