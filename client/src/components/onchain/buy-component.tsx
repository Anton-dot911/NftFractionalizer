import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CreditCard, DollarSign, Zap } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';

export function BuyComponent() {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const [showWidget, setShowWidget] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleContinue = async () => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    try {
      // Simulate OnchainKit Buy component initialization
      await new Promise(resolve => setTimeout(resolve, 1500));
      setShowWidget(true);
      
      toast({
        title: "Buy Component Ready",
        description: "OnchainKit Buy widget is now available.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load buy component. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (showWidget) {
    return (
      <div className="space-y-6">
        <Card className="glass-effect border-border">
          <CardContent className="p-6">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
                <CreditCard className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">OnchainKit Buy Component</h3>
              <p className="text-muted-foreground">Secure fiat-to-crypto conversion powered by Coinbase</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <DollarSign className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="text-sm font-medium">Multiple Fiat</p>
                <p className="text-xs text-muted-foreground">USD, EUR, GBP</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <Zap className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-sm font-medium">Instant</p>
                <p className="text-xs text-muted-foreground">Fast settlement</p>
              </div>
              <div className="text-center p-4 bg-secondary/50 rounded-lg">
                <CreditCard className="w-6 h-6 mx-auto mb-2 text-purple-500" />
                <p className="text-sm font-medium">Secure</p>
                <p className="text-xs text-muted-foreground">KYC verified</p>
              </div>
            </div>
            
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 text-center">
              <p className="text-sm text-primary mb-2">🚀 OnchainKit Integration Active</p>
              <p className="text-xs text-muted-foreground">
                This component would display the actual OnchainKit Buy widget for fiat-to-crypto purchases
              </p>
            </div>
            
            <Button 
              data-testid="button-close-widget"
              onClick={() => setShowWidget(false)}
              variant="outline"
              className="w-full mt-4"
            >
              Close Widget
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="text-center">
      <Button 
        data-testid="button-continue-buy"
        onClick={handleContinue}
        disabled={isLoading}
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 glow-effect hover:opacity-90 transition-opacity"
      >
        <ArrowRight className="w-4 h-4 mr-2" />
        {isLoading ? 'Loading OnchainKit...' : 'Continue to Buy Crypto'}
      </Button>
      <p data-testid="text-integration-note" className="text-sm text-muted-foreground mt-4">
        OnchainKit integration provides secure fiat-to-crypto conversion
      </p>
    </div>
  );
}
