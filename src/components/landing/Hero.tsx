
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section id="hero" className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Animated Purple Galaxy Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-background to-purple-800/20"></div>
        <div className="stars absolute inset-0"></div>
        <div className="galaxy absolute inset-0"></div>
      </div>
      
      <div className="container relative z-10 py-28">
        <div className="max-w-3xl">
          <p className="text-sm tracking-widest text-muted-foreground mb-3 animate-fade-in">TESTNET LIVE</p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight gradient-text animate-fade-in">
            RegisBlockchain — The Modular L3 for Builders
          </h1>
          <p className="mt-5 text-lg sm:text-xl text-muted-foreground max-w-2xl animate-fade-in">
            Built on Arbitrum Orbit for ultra-scalable modular L3. Connect your wallet to join the testnet, deploy dApps, and help shape the network.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 animate-fade-in">
            <Button asChild variant="hero" size="xl">
              <a href="/testnet">Join the Testnet</a>
            </Button>
            <Button asChild variant="glass">
              <a href="#about">Learn More</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
