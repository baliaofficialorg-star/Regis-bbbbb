import SectionHeading from "./SectionHeading";
import useScrollAnimation from "@/hooks/use-scroll-animation";

const items = [
  { label: "Testnet Incentives", pct: "35%", desc: "Rewards for validators, builders, and power testers." },
  { label: "Community & Ecosystem", pct: "25%", desc: "Grants, partnerships, and growth programs." },
  { label: "Core Contributors", pct: "20%", desc: "Long-term aligned contributors and developers." },
  { label: "Treasury", pct: "15%", desc: "Protocol sustainability and strategic reserves." },
  { label: "Airdrops", pct: "5%", desc: "Early community members and key contributors." },
];

const Tokenomics = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollAnimation<HTMLDivElement>({ rootMargin: "0px 0px -100px 0px" });
  const { ref: supplyRef, isVisible: supplyVisible } = useScrollAnimation<HTMLDivElement>({ rootMargin: "0px 0px -50px 0px" });

  return (
    <section 
      id="tokenomics" 
      className={`py-20 border-t border-border/60 relative overflow-hidden scroll-animate ${sectionVisible ? 'animate' : ''}`}
      ref={sectionRef}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      <div className="container relative z-10">
        <SectionHeading subtitle="ECONOMICS" title="Tokenomics Overview" />
        <div 
          ref={cardsRef}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {items.map((t, index) => (
            <article 
              key={t.label} 
              className={`group rounded-xl border border-border/60 bg-card/50 backdrop-blur-sm p-8 shadow-lg hover-scale relative overflow-hidden scroll-animate-scale scroll-stagger-${(index % 5) + 1} ${cardsVisible ? 'animate' : ''}`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10">
                <div className="text-5xl font-bold gradient-text mb-3">{t.pct}</div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">{t.label}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{t.desc}</p>
              </div>
              <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
            </article>
          ))}
        </div>
        <div 
          ref={supplyRef}
          className={`mt-16 text-center scroll-animate-fade ${supplyVisible ? 'animate' : ''}`}
        >
          <div className="inline-flex items-center gap-4 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/60">
            <div className="w-3 h-3 rounded-full bg-primary animate-pulse"></div>
            <span className="text-sm font-medium text-muted-foreground">Total Supply: 1,000,000,000 REGIS</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Tokenomics;
