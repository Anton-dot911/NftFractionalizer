import { Header } from '@/components/layout/header';
import { SaleForm } from '@/components/hybrid-sale/sale-form';
import { Card, CardContent } from '@/components/ui/card';
import { Gavel } from 'lucide-react';

export default function HybridSale() {
  const steps = [
    {
      number: 1,
      title: 'NFT Owner Lists',
      description: 'Seller submits NFT details and sale parameters',
      color: 'text-yellow-500'
    },
    {
      number: 2,
      title: 'Buyers Deposit',
      description: 'Participants contribute funds during sale period',
      color: 'text-blue-500'
    },
    {
      number: 3,
      title: 'Fractions Distributed',
      description: 'Ownership shares allocated proportionally',
      color: 'text-green-500'
    },
    {
      number: 4,
      title: 'Trade Fractions',
      description: 'Sell shares on secondary markets',
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="min-h-screen gradient-bg">
      <Header />
      
      <main className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <Card className="glass-effect border-border">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Gavel className="w-8 h-8 text-white" />
                </div>
                <h2 data-testid="text-page-title" className="text-3xl font-bold mb-4">Hybrid NFT Sale</h2>
                <p data-testid="text-page-description" className="text-lg text-muted-foreground max-w-3xl mx-auto">
                  Revolutionary fractional ownership system that democratizes access to premium NFTs. Participate in collective ownership and trade fractions on secondary markets.
                </p>
              </div>
              
              {/* Hero Image */}
              <div className="mb-8">
                <img 
                  src="https://images.unsplash.com/photo-1634973357973-f2ed2657db3c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=400" 
                  alt="Premium NFT collection showcase with various digital artworks and collectibles" 
                  className="rounded-xl w-full h-64 object-cover"
                  data-testid="img-hybrid-hero"
                />
              </div>
              
              {/* How it Works */}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {steps.map((step, index) => (
                  <div key={index} data-testid={`step-${index}`} className="text-center">
                    <div className={`w-12 h-12 bg-${step.color}/20 rounded-lg mx-auto mb-3 flex items-center justify-center`}>
                      <span className={`${step.color} font-bold text-lg`}>{step.number}</span>
                    </div>
                    <h3 className="font-semibold mb-2">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
              
              {/* Sale Form */}
              <SaleForm />
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
