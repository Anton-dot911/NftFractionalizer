import { Header } from '@/components/layout/header';
import { BuyComponent } from '@/components/onchain/buy-component';
import { Card, CardContent } from '@/components/ui/card';
import { CreditCard, Zap, Shield } from 'lucide-react';

export default function Buy() {
  const features = [
    {
      icon: CreditCard,
      title: 'Multiple Payment Methods',
      description: 'Credit cards, bank transfers, and more',
      color: 'text-green-500'
    },
    {
      icon: Zap,
      title: 'Instant Settlement',
      description: 'Crypto delivered directly to your wallet',
      color: 'text-blue-500'
    },
    {
      icon: Shield,
      title: 'Secure & Compliant',
      description: 'KYC verified and regulated',
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
                  <CreditCard className="w-8 h-8 text-white" />
                </div>
                <h2 data-testid="text-page-title" className="text-3xl font-bold mb-4">Buy Crypto</h2>
                <p data-testid="text-page-description" className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  Purchase cryptocurrency quickly and easily with fiat currency. Powered by OnchainKit for secure, seamless transactions directly to your wallet.
                </p>
              </div>
              
              {/* Hero Image */}
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1621761191319-c6fb62004040?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
                  alt="Modern cryptocurrency exchange interface with charts and trading data" 
                  className="rounded-xl w-full h-64 object-cover"
                  data-testid="img-buy-hero"
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
              
              {/* OnchainKit Buy Component */}
              <BuyComponent />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
