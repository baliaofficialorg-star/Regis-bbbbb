import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAccount, useWriteContract, useWaitForTransactionReceipt } from 'wagmi';
import { useToast } from '@/hooks/use-toast';
import { Copy, QrCode, Send } from 'lucide-react';
import { useState } from 'react';
import { parseTokenAmount } from '@/lib/erc20';
import { REGIS_TOKEN_ADDRESS, regisTestnet } from '@/lib/wagmi';
import { ERC20_ABI } from '@/lib/erc20';
import { isAddress } from 'viem';

interface SendReceiveProps {
  type: 'send' | 'receive';
  onClose: () => void;
}

const SendReceive = ({ type, onClose }: SendReceiveProps) => {
  const { address } = useAccount();
  const { toast } = useToast();
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const { writeContract, data: hash } = useWriteContract();
  const { isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash,
  });

  const copyAddress = () => {
    if (address) {
      navigator.clipboard.writeText(address);
      toast({ title: 'Copied!', description: 'Address copied to clipboard' });
    }
  };

  const handleSend = async () => {
    if (!recipient || !amount) {
      toast({ title: 'Error', description: 'Please fill in all fields' });
      return;
    }

    if (!isAddress(recipient)) {
      toast({ title: 'Error', description: 'Invalid recipient address' });
      return;
    }

    try {
      setIsLoading(true);
      const parsedAmount = parseTokenAmount(amount);
      
      writeContract({
        address: REGIS_TOKEN_ADDRESS,
        abi: ERC20_ABI,
        functionName: 'transfer',
        args: [recipient as `0x${string}`, parsedAmount],
        chain: regisTestnet,
        account: address,
      });

      toast({ title: 'Transaction sent!', description: 'Please wait for confirmation' });
    } catch (error) {
      console.error('Send error:', error);
      toast({ title: 'Error', description: 'Failed to send transaction' });
    } finally {
      setIsLoading(false);
    }
  };

  if (type === 'receive') {
    return (
      <Dialog open onOpenChange={onClose}>
        <DialogContent className="glass">
          <DialogHeader>
            <DialogTitle>Receive REGIS</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Share your wallet address to receive REGIS tokens:
            </p>
            <div className="p-4 glass rounded-lg text-center space-y-3">
              <QrCode className="h-24 w-24 mx-auto text-primary" />
              <p className="font-mono text-sm break-all">{address}</p>
              <Button onClick={copyAddress} variant="secondary" size="sm">
                <Copy className="h-4 w-4 mr-2" />
                Copy Address
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="glass">
        <DialogHeader>
          <DialogTitle>Send REGIS</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient Address</Label>
            <Input
              id="recipient"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="amount">Amount (REGIS)</Label>
            <Input
              id="amount"
              type="number"
              step="0.000001"
              placeholder="0.0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button onClick={onClose} variant="secondary" className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleSend} 
              disabled={isLoading || isConfirming || !address}
              className="flex-1"
            >
              <Send className="h-4 w-4 mr-2" />
              {isLoading || isConfirming ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SendReceive;