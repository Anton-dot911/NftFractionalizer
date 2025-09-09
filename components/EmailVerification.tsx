import React, { useState } from "react";
import { useEmailVerification } from "./EmailVerificationContext";

const EmailVerification: React.FC = () => {
  const { email, setEmail, isVerified, setIsVerified } = useEmailVerification();
  const [code, setCode] = useState("");
  const [step, setStep] = useState<"input" | "sent" | "verified">("input");
  const [loading, setLoading] = useState(false);

  const sendCode = async () => {
    setLoading(true);
    await fetch("/api/send-verification", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
    setLoading(false);
    setStep("sent");
  };

  const verifyCode = async () => {
    setLoading(true);
    const res = await fetch("/api/verify-code", {
      method: "POST",
      body: JSON.stringify({ email, code }),
    });
    const { valid } = await res.json();
    setLoading(false);
    if (valid) {
      setIsVerified(true);
      setStep("verified");
    } else {
      alert("Invalid code");
    }
  };

  if (isVerified || step === "verified") {
    return <div className="px-4 py-2 bg-green-100 rounded">Email verified: {email}</div>;
  }

  return (
    <div className="flex flex-col gap-2 max-w-xs">
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        disabled={step !== "input"}
        onChange={e => setEmail(e.target.value)}
        className="border px-2 py-1 rounded"
      />
      {step === "input" && (
        <button
          className="px-4 py-2 bg-blue-600 text-white rounded"
          disabled={!email || loading}
          onClick={sendCode}
        >
          {loading ? "Sending..." : "Send Verification Code"}
        </button>
      )}
      {step === "sent" && (
        <>
          <input
            type="text"
            placeholder="Enter code"
            value={code}
            onChange={e => setCode(e.target.value)}
            className="border px-2 py-1 rounded"
          />
          <button
            className="px-4 py-2 bg-green-600 text-white rounded"
            disabled={!code || loading}
            onClick={verifyCode}
          >
            {loading ? "Verifying..." : "Verify Code"}
          </button>
        </>
      )}
    </div>
  );
};

export default EmailVerification;
