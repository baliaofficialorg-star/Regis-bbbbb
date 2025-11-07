
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const links: { href: string; label: string }[] = [
  { href: "/about", label: "About" },
  { href: "/testnet", label: "Testnet" },
  { href: "#tokenomics", label: "Tokenomics" },
  { href: "#roadmap", label: "Roadmap" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/40 backdrop-blur-xl">
      <nav className="container flex items-center justify-between py-3">
        <a href="#hero" className="flex items-center gap-3">
          <img
            src="/lovable-uploads/d693bf16-db4a-47b5-847e-c378aa61cbf3.png"
            alt="RegisBlockchain logo"
            width={36}
            height={36}
            decoding="async"
            loading="eager"
          />
          <span className="font-display text-lg tracking-wide">RegisBlockchain</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm text-muted-foreground">
            {links.map((l) => (
              <li key={l.href}>
                <a className="story-link hover:text-foreground" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex items-center gap-3">
            <Button asChild variant="hero" size="sm">
              <a href="/testnet">Join Testnet</a>
            </Button>
          </div>
        </div>

        <button
          className="md:hidden p-2 rounded-md hover:bg-secondary/60"
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-border/60 bg-background/95 animate-fade-in">
          <div className="container py-4">
            <ul className="grid gap-4 text-sm text-muted-foreground">
              {links.map((l) => (
                <li key={l.href}>
                  <a
                    className="block py-2 hover:text-foreground"
                    href={l.href}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <Button asChild variant="hero" size="lg" className="w-full">
                <a href="/testnet" onClick={() => setOpen(false)}>Join Testnet</a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
