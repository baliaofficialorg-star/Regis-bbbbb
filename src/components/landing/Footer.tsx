import { Github, Twitter, MessageSquare, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="mt-24 border-t border-border/60">
      <div className="container py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <p className="text-sm text-muted-foreground">© {new Date().getFullYear()} RegisBlockchain. All rights reserved.</p>
        <nav className="flex items-center gap-4 text-muted-foreground">
          <a className="hover:text-foreground" href="#" aria-label="Twitter"><Twitter /></a>
          <a className="hover:text-foreground" href="https://t.me/+pkaATDoI2vQ4NDU0" target="_blank" rel="noopener noreferrer" aria-label="Telegram"><Send /></a>
          <a className="hover:text-foreground" href="https://discord.gg/Gc2PtaVUpA" target="_blank" rel="noopener noreferrer" aria-label="Discord"><MessageSquare /></a>
          <a className="hover:text-foreground" href="https://github.com/regisblockchain" target="_blank" rel="noopener noreferrer" aria-label="GitHub"><Github /></a>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
