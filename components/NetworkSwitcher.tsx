import React from "react";
import { useNetwork, useSwitchNetwork } from "wagmi";

const NETWORKS = [
  { id: 8453, name: "Base" },
  { id: 84532, name: "Base Sepolia" },
];

const NetworkSwitcher: React.FC = () => {
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  return (
    <div className="flex gap-2">
      {NETWORKS.map((net) => (
        <button
          key={net.id}
          className={`px-3 py-1 rounded border ${
            chain?.id === net.id ? "bg-blue-600 text-white" : "bg-white"
          }`}
          onClick={() => switchNetwork?.(net.id)}
        >
          {net.name}
        </button>
      ))}
    </div>
  );
};

export default NetworkSwitcher;
