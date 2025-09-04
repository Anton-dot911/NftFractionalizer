import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';

export function SwapComponent() {
  const { isConnected } = useWallet();
  const { toast } = useToast();
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
      // TODO: Integrate OnchainKit Swap component
      // This would initialize the OnchainKit Swap widget
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
      
      toast({
        title: "Swap Widget Loading",
        description: "OnchainKit Swap component will be integrated here.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load swap component. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="text-center">
      <Button 
        data-testid="button-continue-swap"
        onClick={handleContinue}
        disabled={isLoading}
        className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 glow-effect hover:opacity-90 transition-opacity"
      >
        <ArrowRight className="w-4 h-4 mr-2" />
        {isLoading ? 'Loading...' : 'Continue to Swap'}
      </Button>
      <p data-testid="text-integration-note" className="text-sm text-muted-foreground mt-4">
        OnchainKit Swap component provides optimal DEX routing
      </p>
    </div>
  );
}
