import { Header } from '@/components/layout/header';
import { SwapComponent } from '@/components/onchain/swap-component';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowLeftRight, Route, Percent, Clock } from 'lucide-react';

export default function Swap() {
  const features = [
    {
      icon: Route,
      title: 'Smart Routing',
      description: 'Best rates across DEX protocols',
      color: 'text-blue-500'
    },
    {
      icon: Percent,
      title: 'Low Fees',
      description: 'Minimal slippage and gas optimization',
      color: 'text-green-500'
    },
    {
      icon: Clock,
      title: 'Instant Swaps',
      description: 'Near-instant transaction settlement',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="glass-effect border-border">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <ArrowLeftRight className="w-8 h-8 text-white" />
                </div>
                <h2 data-testid="text-page-title" className="text-3xl font-bold mb-4">Swap Tokens</h2>
                <p data-testid="text-page-description" className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Exchange cryptocurrencies at the best rates with minimal slippage. Powered by OnchainKit's advanced routing for optimal trade execution.
                </p>
              </div>
              
              {/* Hero Image */}
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1642104704074-907c0698cbd9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
                  alt="Decentralized exchange interface showing token swapping and liquidity pools" 
                  className="rounded-xl w-full h-64 object-cover"
                  data-testid="img-swap-hero"
                />
              </div>
              
              {/* Feature Grid */}
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <div key={index} data-testid={`feature-${index}`} className="text-center">
                      <div className={`w-12 h-12 bg-${feature.color}/20 rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                        <Icon className={`w-6 h-6 ${feature.color}`} />
                      </div>
                      <h3 className="font-semibold mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  );
                })}
              </div>
              
              {/* OnchainKit Swap Component */}
              <SwapComponent />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
