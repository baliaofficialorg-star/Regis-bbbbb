
import { useState } from "react";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ConnectWalletButton from "@/components/web3/ConnectWalletButton";
import TokenBalance from "@/components/web3/TokenBalance";
import SendReceive from "@/components/web3/SendReceive";
import { useAccount } from "wagmi";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Testnet = () => {
  const { toast } = useToast();
  const { address, isConnected } = useAccount();
  const [sendReceiveModal, setSendReceiveModal] = useState<'send' | 'receive' | null>(null);
  const [isClaimingFaucet, setIsClaimingFaucet] = useState(false);

  const comingSoon = (feature: string) =>
    toast({ title: `${feature} coming soon`, description: "We'll enable this after full wiring." });

  const handleFaucet = async () => {
    if (!address) return;
    
    setIsClaimingFaucet(true);
    try {
      const { data, error } = await supabase.functions.invoke('faucet', {
        body: { walletAddress: address }
      });

      if (error) throw error;

      if (data?.error) {
        if (data.error === 'Already claimed today') {
          const nextClaim = new Date(data.nextClaimTime).toLocaleString();
          toast({ 
            title: 'Already claimed today', 
            description: `You can claim again at ${nextClaim}` 
          });
        } else {
          toast({ title: 'Error', description: data.error });
        }
      } else {
        toast({ 
          title: 'Success!', 
          description: data.message || 'Faucet claim successful!' 
        });
      }
    } catch (error) {
      console.error('Faucet error:', error);
      toast({ title: 'Error', description: 'Failed to claim from faucet' });
    } finally {
      setIsClaimingFaucet(false);
    }
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 testnet-grid"></div>
      <div className="relative z-10">
        {/* Navigation */}
        <header className="border-b border-border/60 bg-background/95 backdrop-blur-xl">
          <nav className="container flex items-center justify-between py-4">
            <Link to="/" className="flex items-center gap-3">
              <img
                src="/lovable-uploads/d693bf16-db4a-47b5-847e-c378aa61cbf3.png"
                alt="RegisBlockchain logo"
                width={36}
                height={36}
              />
              <span className="font-display text-lg tracking-wide">RegisBlockchain</span>
            </Link>
            <Button asChild variant="outline" className="gap-2">
              <Link to="/">
                <ArrowLeft className="h-4 w-4" />
                Back to Homepage
              </Link>
            </Button>
          </nav>
        </header>

        <main className="container py-24">
          <Helmet>
            <title>RegisBlockchain Testnet - Test Our Layer 3 Blockchain</title>
            <meta name="description" content="Access RegisBlockchain testnet tools. Claim faucet tokens, send transactions, and test our modular Layer 3 blockchain infrastructure." />
            <meta name="keywords" content="blockchain testnet, faucet, RegisBlockchain, Layer 3, crypto testing" />
            <link rel="canonical" href={`${window.location.origin}/testnet`} />
          </Helmet>

        <section className="max-w-3xl mx-auto text-center">
          <h1 className="font-display text-4xl mb-4 gradient-text">Regis Testnet</h1>
          <p className="text-muted-foreground mb-6">
            Built on Arbitrum Orbit. Connect your wallet to access testnet utilities and start building.
          </p>
          <ConnectWalletButton />
          
          {isConnected && (
            <div className="mt-8">
              <TokenBalance />
            </div>
          )}
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-12"
          style={{ minHeight: 'auto' }}
        >
          {[
            { 
              title: "Faucet", 
              desc: "Request 0.1 REGIS tokens per day.",
              action: handleFaucet,
              loading: isClaimingFaucet
            },
            { 
              title: "Send", 
              desc: "Transfer tokens to another address.",
              action: () => setSendReceiveModal('send')
            },
            { 
              title: "Receive", 
              desc: "Share your address to receive tokens.",
              action: () => setSendReceiveModal('receive')
            },
            { 
              title: "Swap", 
              desc: "Swap tokens with a simple interface.",
              action: () => comingSoon("Swap"),
              comingSoon: true
            },
            { 
              title: "Stake", 
              desc: "Stake tokens and earn rewards.",
              action: () => comingSoon("Stake"),
              comingSoon: true
            },
            { 
              title: "Explorer", 
              desc: "View transactions and blocks.",
              action: () => window.open('https://sepolia.arbiscan.io', '_blank'),
              comingSoon: false
            },
          ].map((c) => (
            <article key={c.title} className="glass rounded-lg p-4 sm:p-6 hover:border-primary/50 transition-all duration-300 hover-scale">
              <h2 className="font-semibold text-base sm:text-lg mb-2">{c.title}</h2>
              <p className="text-sm sm:text-base text-muted-foreground mb-4">{c.desc}</p>
              <Button 
                variant={c.comingSoon ? "secondary" : "default"}
                onClick={c.action} 
                disabled={!isConnected || c.loading}
                className="w-full min-h-[48px] text-sm sm:text-base"
              >
                {!isConnected 
                  ? 'Connect wallet first' 
                  : c.loading 
                    ? 'Processing...'
                    : c.comingSoon 
                      ? 'Coming Soon'
                      : 'Open'
                }
              </Button>
            </article>
          ))}
        </section>

        {sendReceiveModal && (
          <SendReceive 
            type={sendReceiveModal} 
            onClose={() => setSendReceiveModal(null)} 
          />
        )}
      </main>
      </div>
    </div>
  );
};

export default Testnet;
