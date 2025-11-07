import { createConfig, http } from 'wagmi';
import { defineChain } from 'viem';
import { injected, walletConnect, metaMask, coinbaseWallet } from '@wagmi/connectors';

// Regis Testnet Chain Configuration
export const regisTestnet = defineChain({
  id: 421614, // Using Arbitrum Sepolia ID as base
  name: 'Regis Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'Regis',
    symbol: 'REGIS',
  },
  rpcUrls: {
    default: { http: ['https://sepolia-rollup.arbitrum.io/rpc'] }, // Using Arbitrum Sepolia for now
  },
  blockExplorers: {
    default: { name: 'Explorer', url: 'https://sepolia.arbiscan.io' },
  },
  testnet: true,
});

export const wagmiConfig = createConfig({
  chains: [regisTestnet],
  connectors: [
    injected(),
    walletConnect({ 
      projectId: 'f7edb8b7e6b3d4c5a2d7e8f9a0b1c2d3',
      showQrModal: true
    }),
    metaMask(),
    coinbaseWallet({
      appName: 'RegisBlockchain',
      appLogoUrl: '/lovable-uploads/d693bf16-db4a-47b5-847e-c378aa61cbf3.png'
    })
  ],
  transports: {
    [regisTestnet.id]: http(),
  },
});

// Contract addresses
export const REGIS_TOKEN_ADDRESS = '0x9555ec75780819C94E84704Ed452d9031C8196F9' as const;
export const FAUCET_WALLET_ADDRESS = '0xefc6180bb3e2cf8936bddcba8e0e198fdf7dc885' as const;
