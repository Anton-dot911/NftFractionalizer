# NFT Fractionalizer Marketplace

A modern, modular, and extensible NFT marketplace starter built with Next.js, TypeScript, Tailwind CSS, wagmi, and Coinbase Wallet/Embedded Wallet integration.  
**Stage 1** provides a robust foundation for wallet onboarding, email verification, and unified user profile management—ready for NFT fractionalization and marketplace features.

---

## ✨ Features

- **Multi-wallet onboarding** (Coinbase Wallet, Coinbase Embedded Wallet/smart account)
- **Email verification flow** (context-driven, API-ready)
- **Unified user profile context** (wallet + email, verified status)
- **Network switcher** (Base & Base Sepolia)
- **Modern, mobile-first UI** (Tailwind CSS)
- **Modular React/TypeScript architecture**
- **Ready for backend integration** (API hooks, easy to connect DB for user profiles)

---

## 🛠️ Tech Stack

- **Next.js 15+**
- **TypeScript**
- **Tailwind CSS**
- **wagmi v2, viem v2** (wallet & EVM tools)
- **@coinbase/wallet-sdk** (Coinbase Wallet)
- **@coinbase/onchainkit** (Coinbase Embedded Wallet)
- **Base, Base Sepolia chains**

---

## 🚀 Getting Started

```bash
git clone https://github.com/Anton-dot911/NftFractionalizer.git
cd NftFractionalizer
git checkout stage-1-foundation
npm install
npm run dev
```

---

## 📦 File Structure

```
/components
  WalletContext.tsx
  EmailVerificationContext.tsx
  UserProfileContext.tsx
  WalletConnectButton.tsx
  EmailVerification.tsx
  UserProfileCard.tsx
  NetworkSwitcher.tsx

/pages
  _app.tsx
  index.tsx
  /api
    send-verification.ts
    verify-code.ts

/styles
  globals.css

tailwind.config.js
package.json
tsconfig.json
README.md
```

---

## 🗝️ Authentication & Profile

- **Wallet:** Connect via Coinbase Wallet or create an Embedded Smart Account (Coinbase OnchainKit)
- **Email:** Modular, context-driven email verification flow (send code, verify code)
- **User Profile:** Combines wallet address/type with verified email for full user onboarding

---

## 🌐 Network Switching

- Toggle between Base and Base Sepolia
- Easily extend for other EVM chains

---

## 💡 Extending

- Swap out API routes for production-grade email (SendGrid, Resend, SES, etc.)
- Connect user profile context to your backend (MongoDB, Supabase, etc.)
- Add NFT fractionalization smart contracts and marketplace UI

---

## 🟢 Stage 1 Complete

You have a robust, production-ready foundation for building a Web3 NFT fractionalizer marketplace—with secure, flexible onboarding and user management.  
Ready for NFT features, backend persistence, and advanced user flows!

---

## 📄 License

MIT
