import React from "react";
import { useUserProfile } from "./UserProfileContext";

const UserProfileCard: React.FC = () => {
  const { address, walletType, email, isEmailVerified } = useUserProfile();

  return (
    <div className="rounded border bg-white p-4 shadow max-w-sm">
      <div>
        <span className="font-medium">Wallet: </span>
        {address ? (
          <>
            <span className="text-green-800">{address.slice(0, 6)}...{address.slice(-4)}</span>
            <span className="ml-2 text-xs bg-blue-100 px-2 py-1 rounded">{walletType}</span>
          </>
        ) : (
          <span className="text-red-500">Not connected</span>
        )}
      </div>
      <div className="mt-2">
        <span className="font-medium">Email: </span>
        {email ? (
          <span className={isEmailVerified ? "text-green-800" : "text-yellow-500"}>
            {email} {isEmailVerified ? "(verified)" : "(pending)"}
          </span>
        ) : (
          <span className="text-red-500">Not provided</span>
        )}
      </div>
    </div>
  );
};

export default UserProfileCard;
