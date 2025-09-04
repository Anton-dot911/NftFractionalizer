import { Header } from '@/components/layout/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { Wallet, Layers, PuzzleIcon, Shield, Coins, Gavel } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: Wallet,
      title: 'Email Login',
      description: 'Automatic wallet creation with OTP verification'
    },
    {
      icon: Layers,
      title: 'Base Network',
      description: 'Built on Base and Base-Sepolia networks'
    },
    {
      icon: PuzzleIcon,
      title: 'Fractional NFTs',
      description: 'Revolutionary hybrid sale mechanism'
    },
    {
      icon: Shield,
      title: 'Smart Accounts',
      description: 'ERC-4337 account abstraction'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Section */}
          <div className="mb-8 relative">
            <img 
              src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600" 
              alt="Abstract cryptocurrency and blockchain visualization" 
              className="rounded-2xl shadow-2xl w-full h-80 object-cover glow-effect"
              data-testid="img-hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent rounded-2xl" />
            <div className="absolute bottom-8 left-8 right-8">
              <h1 
                data-testid="text-main-title"
                className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
              >
                Welcome to Fractional
              </h1>
              <p 
                data-testid="text-main-description"
                className="text-xl text-muted-foreground max-w-2xl mx-auto"
              >
                The next-generation Web3 platform for fractional NFT ownership, DeFi trading, and seamless crypto experiences.
              </p>
            </div>
          </div>
          
          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card 
                  key={index}
                  data-testid={`card-feature-${index}`}
                  className="glass-effect hover:glow-effect transition-all duration-300 border-border"
                >
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-lg mx-auto mb-4 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
          
          {/* CTA Section */}
          <div className="mt-12">
            <p 
              data-testid="text-cta-description"
              className="text-lg text-muted-foreground mb-6"
            >
              Choose a function to get started with your Web3 journey
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/buy">
                <Button 
                  data-testid="button-cta-buy"
                  className="bg-primary text-primary-foreground px-8 py-3 hover:opacity-90 transition-opacity"
                >
                  <Coins className="w-4 h-4 mr-2" />
                  Buy Crypto
                </Button>
              </Link>
              <Link href="/hybrid-sale">
                <Button 
                  data-testid="button-cta-hybrid-sale"
                  className="bg-accent text-accent-foreground px-8 py-3 hover:opacity-90 transition-opacity"
                >
                  <Gavel className="w-4 h-4 mr-2" />
                  Explore Hybrid Sales
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
