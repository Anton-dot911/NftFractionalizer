# Overview

This is a full-stack React application for fractional NFT ownership, built with modern web technologies. The platform allows users to create hybrid NFT sales where multiple participants can collectively purchase and own fractions of valuable NFTs. The application integrates OnchainKit for cryptocurrency operations including buying, swapping, and earning yield on Base network, while providing a seamless wallet-based authentication system.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI primitives with shadcn/ui design system
- **Styling**: Tailwind CSS with custom design tokens and dark theme support
- **Forms**: React Hook Form with Zod validation for type-safe form handling

## Backend Architecture
- **Runtime**: Node.js with Express.js RESTful API
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Storage**: In-memory storage implementation with interface for easy database integration
- **Validation**: Zod schemas for request/response validation
- **Development**: Hot module replacement with Vite middleware in development mode

## Authentication & Wallet Integration
- **Wallet Provider**: Custom React context wrapping Coinbase Wallet SDK
- **OnchainKit Integration**: Buy, Swap, and Earn components for DeFi operations
- **Account Abstraction**: ERC-4337 smart accounts for improved user experience
- **Network Support**: Base and Base-Sepolia networks

## Data Models
- **Users**: Email-based accounts with optional wallet addresses
- **Hybrid Sales**: NFT fractional ownership sales with timing, pricing, and payment configuration
- **Participations**: User contributions to sales with fractional share calculations
- **Database Schema**: UUID primary keys, decimal precision for financial data, timestamp tracking

## OnchainKit Integration Strategy
The application is structured to integrate OnchainKit components for:
- **Buy Component**: Fiat-to-crypto onramp functionality
- **Swap Component**: Token exchange with optimal routing
- **Earn Component**: Yield farming and staking opportunities
- **Wallet Management**: Smart account creation and connection handling

## API Design
RESTful endpoints following conventional patterns:
- `GET/POST /api/hybrid-sales` - List and create sales
- `GET /api/hybrid-sales/:id` - Individual sale details
- `GET/POST /api/hybrid-sales/:id/participations` - Sale participation management
- Error handling with proper HTTP status codes and structured responses

## Development Workflow
- **Type Safety**: Shared TypeScript schemas between client and server
- **Hot Reloading**: Vite development server with Express middleware
- **Database Migrations**: Drizzle Kit for schema management
- **Code Organization**: Monorepo structure with shared utilities and clear separation of concerns

# External Dependencies

## Core Infrastructure
- **Database**: Neon Database (PostgreSQL) for production data storage
- **Blockchain**: Base network (Ethereum L2) for smart contract interactions
- **Development**: Replit environment with integrated tooling

## Cryptocurrency Services
- **OnchainKit**: Coinbase's React components for web3 functionality
- **Coinbase Wallet SDK**: Wallet connection and smart account management
- **Web3 Operations**: Direct integration with Base network for transaction handling

## UI and Development Tools
- **Radix UI**: Accessibility-first component primitives
- **Tailwind CSS**: Utility-first styling framework
- **TanStack Query**: Server state management with caching and synchronization
- **Zod**: Runtime type validation and schema definition
- **React Hook Form**: Performant form handling with validation integration

## Build and Deployment
- **Vite**: Fast build tool with TypeScript support
- **ESBuild**: Production bundling for server-side code
- **PostCSS**: CSS processing pipeline with Tailwind integration