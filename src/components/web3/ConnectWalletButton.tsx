import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';

const truncate = (addr?: string) => addr ? `${addr.slice(0, 6)}…${addr.slice(-4)}` : '';

const ConnectWalletButton = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect, isPending } = useConnect();
  const { disconnect } = useDisconnect();

  if (!isConnected) {
    // Detect mobile and prefer appropriate connector
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    let preferredConnector;
    if (isMobile) {
      // On mobile, prefer WalletConnect or MetaMask app
      preferredConnector = connectors.find(c => c.id === 'walletConnect') || 
                          connectors.find(c => c.id === 'metaMask') ||
                          connectors.find(c => c.id === 'coinbaseWallet') ||
                          connectors[0];
    } else {
      // On desktop, prefer injected (browser extension)
      preferredConnector = connectors.find(c => c.id === 'injected') || 
                          connectors.find(c => c.id === 'metaMask') ||
                          connectors[0];
    }
    
    return (
      <Button
        variant="hero"
        size="lg"
        onClick={() => preferredConnector && connect({ connector: preferredConnector })}
        disabled={!preferredConnector || isPending}
        className="min-h-[44px] min-w-[120px]" // Better touch targets for mobile
      >
        {isPending ? 'Connecting…' : 'Connect Wallet'}
      </Button>
    );
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
      <Button variant="secondary" disabled className="w-full sm:w-auto min-h-[44px]">
        {truncate(address)}
      </Button>
      <Button 
        variant="ghost" 
        onClick={() => disconnect()}
        className="w-full sm:w-auto min-h-[44px]"
      >
        Disconnect
      </Button>
    </div>
  );
};

export default ConnectWalletButton;
