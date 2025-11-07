import SectionHeading from "./SectionHeading";
import useScrollAnimation from "@/hooks/use-scroll-animation";

const About = () => {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollAnimation<HTMLElement>();
  const { ref: textRef, isVisible: textVisible } = useScrollAnimation<HTMLDivElement>({ rootMargin: "0px 0px -100px 0px" });

  return (
    <section 
      id="about" 
      className={`py-20 scroll-animate ${sectionVisible ? 'animate' : ''}`}
      ref={sectionRef}
    >
      <div className="container">
        <SectionHeading subtitle="ABOUT" title="What is RegisBlockchain?" />
        <div 
          ref={textRef}
          className={`grid md:grid-cols-2 gap-8 text-muted-foreground scroll-animate-fade ${textVisible ? 'animate' : ''}`}
        >
          <p className={`scroll-animate-slide-left scroll-stagger-1 ${textVisible ? 'animate' : ''}`}>
            RegisBlockchain is a modular Layer 3 focused on empowering builders. Compose specialized execution environments, plug in the modules you need, and deliver blazing-fast user experiences.
          </p>
          <p className={`scroll-animate-slide-right scroll-stagger-2 ${textVisible ? 'animate' : ''}`}>
            The testnet enables rapid iteration on core modules like data availability, settlement, and execution. Your feedback drives the roadmap, token distribution, and mainnet launch strategy.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
