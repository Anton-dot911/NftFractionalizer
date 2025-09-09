import React, { createContext, useContext } from "react";
import { useWallet } from "./WalletContext";
import { useEmailVerification } from "./EmailVerificationContext";

interface UserProfile {
  address: string | null;
  walletType: "coinbase" | "embedded" | null;
  email: string;
  isEmailVerified: boolean;
}

const UserProfileContext = createContext<UserProfile | undefined>(undefined);

export const UserProfileProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { address, walletType } = useWallet();
  const { email, isVerified } = useEmailVerification();

  const userProfile: UserProfile = {
    address,
    walletType,
    email,
    isEmailVerified: isVerified,
  };

  return (
    <UserProfileContext.Provider value={userProfile}>
      {children}
    </UserProfileContext.Provider>
  );
};

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) throw new Error("useUserProfile must be used within UserProfileProvider");
  return context;
};
