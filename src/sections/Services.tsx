import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera, Heart, Building2, Plus, ArrowRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Camera,
    title: 'Wedding Coverage',
    description: 'Full-day documentation, two photographers, online gallery.',
    features: ['8+ hours coverage', '2 photographers', 'Online gallery', 'Print-ready files'],
    price: 'From $4,500',
    popular: true,
  },
  {
    icon: Heart,
    title: 'Engagement Session',
    description: 'Scouted locations, styling notes, 60–90 minutes.',
    features: ['Location scouting', 'Styling guidance', '60-90 minutes', '20+ edited photos'],
    price: 'From $800',
    popular: false,
  },
  {
    icon: Building2,
    title: 'Editorial & Events',
    description: 'Corporate dinners, launches, and brand storytelling.',
    features: ['Corporate events', 'Brand photography', 'Product launches', 'Team portraits'],
    price: 'Custom quote',
    popular: false,
  },
  {
    icon: Plus,
    title: 'Add-Ons',
    description: 'Film scans, albums, drone, and expedited delivery.',
    features: ['Film photography', 'Custom albums', 'Drone footage', 'Rush delivery'],
    price: 'From $300',
    popular: false,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || cards.length === 0) return;

    // Headline animation
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

    // Cards animation with stagger
    cards.forEach((card, index) => {
      gsap.fromTo(card,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.08,
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
      id="services"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="section-header text-center mb-16 max-w-2xl mx-auto">
          <span className="micro-label">Services</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary mt-4">
            What We Offer
          </h2>
          <p className="mt-6 text-text-secondary text-lg leading-relaxed">
            From intimate ceremonies to full-weekend celebrations—coverage that fits your story.
          </p>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isHovered = hoveredCard === index;
            
            return (
              <div
                key={service.title}
                ref={(el) => { cardsRef.current[index] = el; }}
                className={`group relative bg-slate rounded-2xl p-8 border transition-all duration-500 overflow-hidden ${
                  service.popular 
                    ? 'border-gold/50' 
                    : 'border-white/5 hover:border-gold/30'
                } ${isHovered ? 'scale-[1.02]' : ''}`}
                style={{ opacity: 0 }}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
                data-cursor-text="Details"
              >
                {/* Popular Badge */}
                {service.popular && (
                  <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1 bg-gold/20 rounded-full">
                    <Sparkles className="w-3 h-3 text-gold" />
                    <span className="font-mono text-[10px] text-gold uppercase tracking-wider">Popular</span>
                  </div>
                )}

                {/* Background Glow on Hover */}
                <div className={`absolute -inset-px bg-gradient-to-br from-gold/20 via-transparent to-gold/5 rounded-2xl transition-opacity duration-500 ${
                  isHovered ? 'opacity-100' : 'opacity-0'
                }`} />

                {/* Content */}
                <div className="relative">
                  {/* Icon */}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 transition-all duration-300 ${
                    isHovered ? 'bg-gold' : 'bg-gold/10'
                  }`}>
                    <Icon className={`w-6 h-6 transition-colors duration-300 ${
                      isHovered ? 'text-charcoal' : 'text-gold'
                    }`} />
                  </div>

                  {/* Title & Price */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-display text-2xl md:text-3xl text-text-primary">
                      {service.title}
                    </h3>
                    <span className="font-mono text-sm text-gold">
                      {service.price}
                    </span>
                  </div>

                  <p className="text-text-secondary leading-relaxed mb-6">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2 mb-8">
                    {service.features.map((feature, i) => (
                      <li 
                        key={feature}
                        className="flex items-center gap-3 text-text-secondary text-sm"
                        style={{
                          transitionDelay: `${i * 30}ms`,
                        }}
                      >
                        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                          isHovered ? 'bg-gold scale-125' : 'bg-gold/50'
                        }`} />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <a 
                    href="#contact"
                    className={`inline-flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-[0.12em] transition-all duration-300 ${
                      isHovered ? 'gap-3' : ''
                    }`}
                  >
                    Learn more
                    <ArrowRight className={`w-4 h-4 transition-transform duration-300 ${
                      isHovered ? 'translate-x-1' : ''
                    }`} />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a 
            href="#contact"
            className="btn-gold inline-flex items-center gap-2 group"
          >
            Request custom quote
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
}