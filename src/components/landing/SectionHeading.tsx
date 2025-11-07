import useScrollAnimation from "@/hooks/use-scroll-animation";

interface SectionHeadingProps {
  subtitle?: string;
  title: string;
}

const SectionHeading = ({ subtitle, title }: SectionHeadingProps) => {
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({ threshold: 0.3 });

  return (
    <div 
      ref={ref}
      className="text-center mb-12"
    >
      {subtitle && (
        <p className={`text-xs tracking-widest text-muted-foreground mb-2 scroll-animate-fade ${isVisible ? 'animate' : ''}`}>
          {subtitle}
        </p>
      )}
      <h2 className={`text-3xl sm:text-4xl font-display font-extrabold gradient-text scroll-animate scroll-stagger-1 ${isVisible ? 'animate' : ''}`}>
        {title}
      </h2>
    </div>
  );
};

export default SectionHeading;
