import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Check, Calendar, MapPin, Image } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const processSteps = [
  {
    number: '01',
    title: 'Book',
    description: 'Choose your date and coverage. We\'ll confirm within 24 hours.',
    image: assetUrl('images/process_book.jpg'),
    icon: Calendar,
    details: ['Select your package', 'Pick your date', 'Sign the contract', 'Pay the retainer'],
  },
  {
    number: '02',
    title: 'Plan',
    description: 'Timeline, locations, and shot list—tailored to your day.',
    image: assetUrl('images/process_plan.jpg'),
    icon: MapPin,
    details: ['Pre-wedding consultation', 'Location scouting', 'Timeline creation', 'Shot list review'],
  },
  {
    number: '03',
    title: 'Receive',
    description: 'A curated gallery, print-ready files, and a keepsake edit.',
    image: assetUrl('images/process_receive.jpg'),
    icon: Image,
    details: ['Sneak peeks in 48hrs', 'Full gallery in 6-8 weeks', 'Print-ready files', 'Online gallery'],
  },
];

export default function Process() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [activeCard, setActiveCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || cards.length === 0) return;

    // Fast entrance animation - NO PINNING
    gsap.fromTo(section.querySelector('.section-header'),
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 0.6,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="process"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="section-header text-center mb-16">
          <span className="micro-label">How It Works</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary mt-4">
            Our Process
          </h2>
        </div>

        {/* Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            const isActive = activeCard === index;
            
            return (
              <div
                key={step.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ${
                  isActive ? 'md:scale-105' : 'hover:scale-[1.02]'
                }`}
                style={{ opacity: 0 }}
                onMouseEnter={() => setActiveCard(index)}
                onMouseLeave={() => setActiveCard(null)}
                data-cursor-text="Explore"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img 
                    src={step.image} 
                    alt={step.title}
                    className={`w-full h-full object-cover transition-transform duration-700 ${
                      isActive ? 'scale-110' : 'scale-100'
                    }`}
                  />
                  <div className={`absolute inset-0 transition-opacity duration-500 ${
                    isActive 
                      ? 'bg-gradient-to-t from-charcoal via-charcoal/80 to-charcoal/40' 
                      : 'bg-gradient-to-t from-charcoal via-charcoal/70 to-transparent'
                  }`} />
                </div>

                {/* Content */}
                <div className="relative h-[500px] md:h-[550px] p-8 flex flex-col">
                  {/* Top */}
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-5xl text-gold/30 font-bold">
                      {step.number}
                    </span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                      isActive ? 'bg-gold' : 'bg-gold/20'
                    }`}>
                      <Icon className={`w-5 h-5 transition-colors duration-300 ${
                        isActive ? 'text-charcoal' : 'text-gold'
                      }`} />
                    </div>
                  </div>

                  {/* Middle - Title & Description */}
                  <div className="mt-auto">
                    <h3 className="font-display text-4xl md:text-5xl text-text-primary">
                      {step.title}
                    </h3>
                    <p className="mt-3 text-text-secondary leading-relaxed">
                      {step.description}
                    </p>

                    {/* Expandable Details */}
                    <div className={`overflow-hidden transition-all duration-500 ${
                      isActive ? 'max-h-48 opacity-100 mt-6' : 'max-h-0 opacity-0'
                    }`}>
                      <ul className="space-y-2">
                        {step.details.map((detail, i) => (
                          <li 
                            key={i}
                            className="flex items-center gap-2 text-text-secondary text-sm"
                            style={{ 
                              transitionDelay: isActive ? `${i * 50}ms` : '0ms',
                              opacity: isActive ? 1 : 0,
                              transform: isActive ? 'translateX(0)' : 'translateX(-10px)',
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Check className="w-4 h-4 text-gold" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* CTA */}
                    <a 
                      href="#contact"
                      className={`inline-flex items-center gap-2 mt-6 text-gold font-mono text-sm uppercase tracking-[0.12em] transition-all duration-300 ${
                        isActive ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                      }`}
                    >
                      Get started
                      <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}