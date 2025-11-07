import { useAccount, useReadContract } from 'wagmi';
import { REGIS_TOKEN_ADDRESS } from '@/lib/wagmi';
import { ERC20_ABI, formatTokenAmount } from '@/lib/erc20';

const TokenBalance = () => {
  const { address, isConnected } = useAccount();

  const { data: balance, isLoading } = useReadContract({
    address: REGIS_TOKEN_ADDRESS,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address && isConnected,
    },
  });

  if (!isConnected || !address) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="glass rounded-lg p-4 text-center">
        <p className="text-sm text-muted-foreground">Loading balance...</p>
      </div>
    );
  }

  const formattedBalance = balance ? formatTokenAmount(balance) : '0';

  return (
    <div className="glass rounded-lg p-4 text-center">
      <p className="text-sm text-muted-foreground mb-1">Your Balance</p>
      <p className="text-2xl font-display gradient-text">
        {formattedBalance} REGIS
      </p>
    </div>
  );
};

export default TokenBalance;