import React, { createContext, useContext, useState } from "react";
import { useAccount, useDisconnect } from "wagmi";

export type WalletType = "coinbase" | "embedded" | null;

interface WalletContextProps {
  address: string | null;
  walletType: WalletType;
  setWalletType: (type: WalletType) => void;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextProps | undefined>(undefined);

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address } = useAccount();
  const { disconnect } = useDisconnect();
  const [walletType, setWalletType] = useState<WalletType>(null);

  const disconnectWallet = () => {
    disconnect();
    setWalletType(null);
  };

  return (
    <WalletContext.Provider
      value={{
        address: address ?? null,
        walletType,
        setWalletType,
        disconnectWallet,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (!context) throw new Error("useWallet must be used within WalletProvider");
  return context;
};