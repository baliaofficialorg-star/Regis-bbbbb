
import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import About from "@/components/landing/About";
import Guide from "@/components/landing/Guide";
import Tokenomics from "@/components/landing/Tokenomics";
import Roadmap from "@/components/landing/Roadmap";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Guide />
        <Tokenomics />
        <Roadmap />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
