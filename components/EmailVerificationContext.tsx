import React, { createContext, useContext, useState } from "react";

interface EmailVerificationContextProps {
  email: string;
  setEmail: (email: string) => void;
  isVerified: boolean;
  setIsVerified: (v: boolean) => void;
}

const EmailVerificationContext = createContext<EmailVerificationContextProps | undefined>(undefined);

export const EmailVerificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [email, setEmail] = useState<string>(""
  const [isVerified, setIsVerified] = useState<boolean>(false);

  return (
    <EmailVerificationContext.Provider value={{ email, setEmail, isVerified, setIsVerified }}>
      {children}
    </EmailVerificationContext.Provider>
  );
};

export const useEmailVerification = () => {
  const context = useContext(EmailVerificationContext);
  if (!context) throw new Error("useEmailVerification must be used within EmailVerificationProvider");
  return context;
};
