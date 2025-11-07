import SectionHeading from "./SectionHeading";
import useScrollAnimation from "@/hooks/use-scroll-animation";

const roadmap = [
  {
    q: "Q1",
    items: ["Public testnet launch", "Explorer + Faucet", "Core module audits"],
  },
  {
    q: "Q2",
    items: ["Node operator program", "Ecosystem grants", "Cross-chain bridges"],
  },
  {
    q: "Q3",
    items: ["Performance upgrades", "Incentivized testing", "Tokenomics finalize"],
  },
  {
    q: "Q4",
    items: ["Mainnet readiness", "Genesis validator set", "Launch preparations"],
  },
];

const Roadmap = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: timelineRef, isVisible: timelineVisible } = useScrollAnimation<HTMLDivElement>({ rootMargin: "0px 0px -100px 0px" });

  return (
    <section 
      id="roadmap" 
      className={`py-20 border-t border-border/60 scroll-animate ${sectionVisible ? 'animate' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <SectionHeading subtitle="FORWARD" title="Roadmap 2026" />
        <div 
          ref={timelineRef}
          className="relative pl-6"
        >
          <div className={`absolute left-0 top-1 bottom-1 w-px bg-border transition-all duration-1000 ${timelineVisible ? 'opacity-100' : 'opacity-0'}`} aria-hidden />
          <ul className="grid gap-8">
            {roadmap.map((r, index) => (
              <li 
                key={r.q} 
                className={`grid gap-2 scroll-animate-slide-left scroll-stagger-${index + 1} ${timelineVisible ? 'animate' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`h-3 w-3 rounded-full bg-primary transition-all duration-500 delay-${index * 200} ${timelineVisible ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`} />
                  <h3 className="font-display text-xl">{r.q}</h3>
                </div>
                <ul className="ml-6 list-disc text-muted-foreground">
                  {r.items.map((i, itemIndex) => (
                    <li 
                      key={i}
                      className={`scroll-animate-fade transition-all duration-300 delay-${(index * 200) + (itemIndex * 100) + 300} ${timelineVisible ? 'opacity-100' : 'opacity-0'}`}
                    >
                      {i}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Roadmap;
