
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Helmet } from "react-helmet-async";
import { 
  Zap, 
  DollarSign, 
  Users, 
  Shield, 
  Rocket, 
  Code2,
  Twitter,
  Github,
  MessageCircle,
  Globe,
  Send,
  ArrowLeft
} from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Experience blazing-fast transactions with sub-second finality powered by advanced Layer 3 architecture."
    },
    {
      icon: <DollarSign className="h-8 w-8" />,
      title: "Ultra-Low Gas Fees",
      description: "Enjoy minimal transaction costs, making DeFi accessible to everyone regardless of transaction size."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Community Owned",
      description: "Fully decentralized and governed by the community. Your voice matters in shaping the future of RegisBlockchain."
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Enterprise Security",
      description: "Built with institutional-grade security protocols and audited smart contracts for maximum protection."
    },
    {
      icon: <Rocket className="h-8 w-8" />,
      title: "Infinite Scalability",
      description: "Handle millions of transactions per second without compromising on decentralization or security."
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "Developer Friendly",
      description: "Full EVM compatibility with enhanced tooling and SDKs for seamless dApp development and deployment."
    }
  ];

  const socials = [
    { icon: <Twitter className="h-5 w-5" />, label: "Twitter", href: "#" },
    { icon: <Send className="h-5 w-5" />, label: "Telegram", href: "https://t.me/+pkaATDoI2vQ4NDU0" },
    { icon: <MessageCircle className="h-5 w-5" />, label: "Discord", href: "https://discord.gg/cfQ7cq27PD" },
    { icon: <Github className="h-5 w-5" />, label: "GitHub", href: "https://github.com/regisblockchain" },
    { icon: <Globe className="h-5 w-5" />, label: "Website", href: "/" }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <div className="absolute inset-0 about-waves"></div>
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

      <main className="container py-12 space-y-16">
        <Helmet>
          <title>About RegisBlockchain - Modular Layer 3 Blockchain Platform</title>
          <meta name="description" content="Learn about RegisBlockchain's modular Layer 3 infrastructure, our mission to empower builders, and join our growing community." />
          <meta name="keywords" content="RegisBlockchain, Layer 3, modular blockchain, decentralized, Web3, blockchain platform" />
          <link rel="canonical" href={`${window.location.origin}/about`} />
        </Helmet>
        
        {/* Hero Section */}
        <section className="text-center space-y-6 animate-fade-in">
          <h1 className="font-display text-4xl md:text-6xl font-bold gradient-text">
            About RegisBlockchain
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            RegisBlockchain is a modular Layer 3 focused on empowering builders. Compose specialized 
            execution environments, plug in the modules you need, and deliver blazing-fast user experiences.
          </p>
        </section>

        {/* Mission Section */}
        <section className="grid md:grid-cols-2 gap-12 items-center animate-fade-in">
          <div className="space-y-6">
            <h2 className="font-display text-3xl font-bold">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              The testnet enables rapid iteration on core modules like data availability, settlement, 
              and execution. Your feedback drives the roadmap, token distribution, and mainnet launch strategy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              We're building the future of decentralized applications with a focus on scalability, 
              security, and developer experience. Join us in creating a more open and accessible blockchain ecosystem.
            </p>
          </div>
          <div className="relative">
            <div className="glass rounded-2xl p-8 text-center hover:border-primary/50 transition-all duration-300">
              <h3 className="font-display text-2xl font-bold mb-4">Built for the Future</h3>
              <p className="text-muted-foreground">
                Next-generation blockchain infrastructure designed for mass adoption and real-world applications.
              </p>
            </div>
          </div>
        </section>

        {/* Why Choose Regis Section */}
        <section className="space-y-12 animate-fade-in">
          <div className="text-center space-y-4">
            <h2 className="font-display text-3xl md:text-4xl font-bold">Why Choose RegisBlockchain?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover what makes RegisBlockchain the perfect choice for your next project
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="glass border-border/50 hover:border-primary/50 transition-all duration-300 hover-scale">
                <CardContent className="p-8 text-center space-y-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary">
                    {feature.icon}
                  </div>
                  <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Connect Section */}
        <section className="text-center space-y-8 py-12 animate-fade-in">
          <h2 className="font-display text-3xl font-bold">Connect With Us</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join our growing community and stay updated on the latest developments
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            {socials.map((social, index) => (
              <Button key={index} variant="outline" size="lg" className="gap-2 hover-scale" asChild>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.icon}
                  {social.label}
                </a>
              </Button>
            ))}
          </div>

          <div className="pt-8">
            <Button asChild variant="hero" size="xl" className="hover-scale">
              <Link to="/testnet">Join the Testnet</Link>
            </Button>
          </div>
        </section>
      </main>
      </div>
    </div>
  );
};

export default About;
