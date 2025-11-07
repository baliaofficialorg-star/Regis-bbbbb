import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { HelmetProvider } from 'react-helmet-async'
import { WagmiProvider } from 'wagmi'
import { wagmiConfig } from '@/lib/wagmi'

createRoot(document.getElementById("root")!).render(
  <WagmiProvider config={wagmiConfig}>
    <HelmetProvider>
      <App />
    </HelmetProvider>
  </WagmiProvider>
);
