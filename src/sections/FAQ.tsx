import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: 'How far in advance should we book?',
    answer: 'We recommend booking 8-12 months in advance for weddings, especially during peak season (May-October). For engagement sessions and smaller events, 4-6 weeks is typically sufficient.',
  },
  {
    question: 'Do you travel for destination weddings?',
    answer: 'Absolutely! We love destination weddings. Travel fees are calculated based on location and include airfare, accommodation, and transportation. Contact us for a custom quote.',
  },
  {
    question: "What's included in the gallery?",
    answer: 'All packages include a private online gallery with high-resolution, edited images. You\'ll receive print-ready files with full printing rights, and the gallery stays active for one year.',
  },
  {
    question: 'Can we add a second photographer?',
    answer: 'Yes! A second photographer is included in our full wedding coverage package. They capture alternate angles, candid moments, and help ensure no moment is missed.',
  },
  {
    question: 'How long until we receive our photos?',
    answer: 'Engagement sessions are delivered within 2-3 weeks. Wedding galleries are typically ready within 6-8 weeks during peak season, and 4-6 weeks during off-peak. Rush delivery is available as an add-on.',
  },
];

export default function FAQ() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const items = itemsRef.current.filter(Boolean) as HTMLDivElement[];

    if (!section || !headline || items.length === 0) return;

    // Headline animation
    gsap.fromTo(headline,
      { opacity: 0, y: 16 },
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

    // FAQ items animation with stagger
    items.forEach((item, index) => {
      gsap.fromTo(item,
        { opacity: 0, y: '6vh' },
        {
          opacity: 1,
          y: 0,
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

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section 
      ref={sectionRef}
      id="faq"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="section-padding">
        <div className="max-w-3xl mx-auto">
          {/* Headline */}
          <div 
            ref={headlineRef}
            className="text-center mb-16"
            style={{ opacity: 0 }}
          >
            <span className="micro-label">FAQ</span>
            <h2 className="font-display text-5xl md:text-6xl text-text-primary mt-4">
              FAQ
            </h2>
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                ref={(el) => { itemsRef.current[index] = el; }}
                className="border border-white/10 rounded-lg overflow-hidden"
                style={{ opacity: 0 }}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors duration-300"
                >
                  <span className="font-display text-xl md:text-2xl text-text-primary pr-4">
                    {faq.question}
                  </span>
                  <div className="flex-shrink-0 w-8 h-8 rounded-full border border-gold/30 flex items-center justify-center">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4 text-gold" />
                    ) : (
                      <Plus className="w-4 h-4 text-gold" />
                    )}
                  </div>
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-out ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6">
                    <p className="text-text-secondary leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <a 
              href="#contact"
              className="inline-flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-[0.12em] hover:gap-4 transition-all duration-300"
            >
              Still have questions? Ask us directly
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}