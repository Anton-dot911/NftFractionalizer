import React from "react";
import { useConnect, useAccount } from "wagmi";
import { useWallet } from "./WalletContext";

const WalletConnectButton: React.FC = () => {
  const { connect, connectors, isLoading, pendingConnector } = useConnect();
  const { address } = useAccount();
  const { setWalletType } = useWallet();

  if (address) return <span className="px-4 py-2 bg-green-100 rounded">Connected: {address.slice(0, 6)}...{address.slice(-4)}</span>;

  return (
    <div className="flex gap-2">
      {connectors.map((connector) => (
        <button
          key={connector.id}
          onClick={() => {
            connect({ connector });
            setWalletType(connector.id === "coinbaseWallet" ? "coinbase" : "embedded");
          }}
          className="px-4 py-2 rounded bg-blue-600 text-white"
          disabled={!connector.ready}
        >
          {connector.name}
          {isLoading && pendingConnector?.id === connector.id && " (connecting...)"}
        </button>
      ))}
    </div>
  );
};

export default WalletConnectButton;
