import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Loader2 } from 'lucide-react';
import { insertHybridSaleSchema, type InsertHybridSale } from '@shared/schema';
import { apiRequest } from '@/lib/queryClient';
import { useWallet } from '@/hooks/use-wallet';
import { useToast } from '@/hooks/use-toast';

export function SaleForm() {
  const { isConnected } = useWallet();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<InsertHybridSale>({
    resolver: zodResolver(insertHybridSaleSchema),
    defaultValues: {
      contractAddress: '',
      tokenId: '',
      network: 'Base',
      minimumPrice: '',
      saleStartDate: '',
      saleEndDate: '',
      paymentAddress: '',
      paymentCurrency: 'ETH',
      sellerId: '',
    },
  });

  const createSaleMutation = useMutation({
    mutationFn: async (data: InsertHybridSale) => {
      const response = await apiRequest('POST', '/api/hybrid-sales', data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "Sale Created",
        description: "Your hybrid NFT sale has been created successfully!",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['/api/hybrid-sales'] });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create sale. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = async (data: InsertHybridSale) => {
    if (!isConnected) {
      toast({
        title: "Wallet Required",
        description: "Please connect your wallet to create a sale.",
        variant: "destructive",
      });
      return;
    }

    createSaleMutation.mutate(data);
  };

  return (
    <Card className="bg-secondary/50 border-border">
      <CardHeader>
        <CardTitle data-testid="text-form-title" className="text-xl text-center">Create Hybrid Sale</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="contractAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Contract Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-contract-address"
                          placeholder="0x..."
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="tokenId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Token ID</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-token-id"
                          placeholder="123"
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="network"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Network</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-network" className="bg-input border-border">
                            <SelectValue placeholder="Select network" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Base">Base</SelectItem>
                          <SelectItem value="Base Sepolia">Base Sepolia</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="minimumPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Minimum Price (ETH)</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-minimum-price"
                          type="number"
                          step="0.001"
                          placeholder="1.0"
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="saleStartDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale Start Date</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-start-date"
                          type="datetime-local"
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="saleEndDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sale End Date</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-end-date"
                          type="datetime-local"
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentAddress"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Address</FormLabel>
                      <FormControl>
                        <Input 
                          {...field} 
                          data-testid="input-payment-address"
                          placeholder="0x..."
                          className="bg-input border-border"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="paymentCurrency"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Payment Currency</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger data-testid="select-payment-currency" className="bg-input border-border">
                            <SelectValue placeholder="Select currency" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="ETH">ETH</SelectItem>
                          <SelectItem value="USDC">USDC</SelectItem>
                          <SelectItem value="USDT">USDT</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <div className="text-center pt-6">
              <Button 
                data-testid="button-create-sale"
                type="submit"
                disabled={createSaleMutation.isPending}
                className="bg-gradient-to-r from-primary to-accent text-primary-foreground px-8 py-3 glow-effect hover:opacity-90 transition-opacity"
              >
                {createSaleMutation.isPending ? (
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <ArrowRight className="w-4 h-4 mr-2" />
                )}
                {createSaleMutation.isPending ? 'Creating Sale...' : 'Continue to Hybrid Sale'}
              </Button>
              <p data-testid="text-smart-contract-note" className="text-sm text-muted-foreground mt-4">
                Smart contract automatically handles fractional distribution and refunds
              </p>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
