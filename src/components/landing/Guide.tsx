import { CheckCircle } from "lucide-react";
import SectionHeading from "./SectionHeading";
import useScrollAnimation from "@/hooks/use-scroll-animation";

const steps = [
  {
    title: "Join the community",
    desc: "Hop into Discord and follow updates on X for announcements.",
  },
  {
    title: "Get test tokens",
    desc: "Use the faucet to fund your testnet wallet for deployments.",
  },
  {
    title: "Run a node or deploy",
    desc: "Spin up a node, deploy contracts, or test dApps on the network.",
  },
  {
    title: "Report feedback",
    desc: "Submit issues and proposals. Top contributors are rewarded.",
  },
];

const Guide = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation<HTMLOListElement>({ rootMargin: "0px 0px -100px 0px" });
  const { ref: linksRef, isVisible: linksVisible } = useScrollAnimation<HTMLDivElement>({ rootMargin: "0px 0px -50px 0px" });

  return (
    <section 
      id="guide" 
      className={`py-20 border-t border-border/60 scroll-animate ${sectionVisible ? 'animate' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <SectionHeading subtitle="GET STARTED" title="How to Join the Testnet" />
        <ol 
          ref={stepsRef}
          className="grid md:grid-cols-2 gap-6"
        >
          {steps.map((s, i) => (
            <li 
              key={i} 
              className={`glass rounded-lg p-6 scroll-animate-scale scroll-stagger-${(i % 4) + 1} ${stepsVisible ? 'animate' : ''}`}
            >
              <div className="flex items-start gap-4">
                <CheckCircle className="text-primary mt-1" />
                <div>
                  <h3 className="font-semibold text-lg">{i + 1}. {s.title}</h3>
                  <p className="text-muted-foreground mt-1">{s.desc}</p>
                </div>
              </div>
            </li>
          ))}
        </ol>
        <div 
          ref={linksRef}
          className={`mt-8 flex gap-4 scroll-animate-fade ${linksVisible ? 'animate' : ''}`}
        >
          <a className="story-link" href="https://discord.gg/Gc2PtaVUpA">Discord</a>
          <a className="story-link" href="/testnet">Faucet</a>
          <a className="story-link" href="#">Docs</a>
        </div>
      </div>
    </section>
  );
};

export default Guide;
