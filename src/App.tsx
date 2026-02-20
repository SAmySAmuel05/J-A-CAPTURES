import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './App.css';

// Import sections
import Navigation from './sections/Navigation';
import Hero from './sections/Hero';
import StudioIntro from './sections/StudioIntro';
import SelectedWork from './sections/SelectedWork';
import PortfolioGallery from './sections/PortfolioGallery';
import Process from './sections/Process';
import Services from './sections/Services';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQ';
import Contact from './sections/Contact';
import Footer from './sections/Footer';
import ShutterAnimation from './sections/ShutterAnimation';
import CustomCursor from './sections/CustomCursor';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const [shutterComplete, setShutterComplete] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Refresh ScrollTrigger after all content loads
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 100);

    return () => {
      clearTimeout(timer);
    };
  }, [shutterComplete]);

  return (
    <div className="relative bg-charcoal min-h-screen overflow-x-hidden">
      {/* Custom Cursor */}
      <CustomCursor />
      
      {/* Grain overlay */}
      <div className="grain-overlay" />
      
      {/* Shutter animation */}
      <ShutterAnimation onComplete={() => setShutterComplete(true)} />
      
      {/* Navigation */}
      <Navigation />
      
      {/* Main content */}
      <main ref={mainRef} className="relative">
        <Hero shutterComplete={shutterComplete} />
        <StudioIntro />
        <SelectedWork />
        <PortfolioGallery />
        <Process />
        <Services />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;