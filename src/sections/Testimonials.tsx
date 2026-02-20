import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  {
    quote: "They didn't just capture our wedding—they captured the feeling of it.",
    author: 'Maya & Jon',
    role: 'Wedding Clients',
    image: assetUrl('images/testimonial_left.jpg'),
    rating: 5,
  },
  {
    quote: "The attention to detail was incredible. Every photo tells a story.",
    author: 'Sarah & Michael',
    role: 'Engagement Session',
    image: assetUrl('images/testimonial_right.jpg'),
    rating: 5,
  },
  {
    quote: "Professional, creative, and so easy to work with. Highly recommend!",
    author: 'Emily Chen',
    role: 'Corporate Event',
    image: assetUrl('images/portfolio_social_01.jpg'),
    rating: 5,
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const quoteRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

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

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  const changeTestimonial = (newIndex: number) => {
    if (isAnimating || newIndex === activeIndex) return;
    setIsAnimating(true);

    const quote = quoteRef.current;
    const image = imageRef.current;

    if (quote && image) {
      // Exit animation
      gsap.to(quote, {
        opacity: 0,
        x: newIndex > activeIndex ? -50 : 50,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          setActiveIndex(newIndex);
          // Entrance animation
          gsap.fromTo(quote,
            { opacity: 0, x: newIndex > activeIndex ? 50 : -50 },
            { opacity: 1, x: 0, duration: 0.4, ease: 'power3.out' }
          );
        }
      });

      gsap.to(image, {
        opacity: 0,
        scale: 0.95,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => {
          gsap.fromTo(image,
            { opacity: 0, scale: 1.05 },
            { opacity: 1, scale: 1, duration: 0.4, ease: 'power3.out', onComplete: () => setIsAnimating(false) }
          );
        }
      });
    }
  };

  const next = () => {
    const newIndex = (activeIndex + 1) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const prev = () => {
    const newIndex = (activeIndex - 1 + testimonials.length) % testimonials.length;
    changeTestimonial(newIndex);
  };

  const current = testimonials[activeIndex];

  return (
    <section 
      ref={sectionRef}
      className="relative w-full bg-charcoal py-24 md:py-32 overflow-hidden"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="section-header text-center mb-16">
          <span className="micro-label">Testimonials</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary mt-4">
            Client Love
          </h2>
        </div>

        {/* Testimonial Content */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div 
              ref={imageRef}
              className="relative aspect-[4/3] rounded-2xl overflow-hidden"
            >
              <img 
                src={current.image}
                alt={current.author}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/50 to-transparent" />
            </div>

            {/* Quote */}
            <div ref={quoteRef} className="relative">
              <Quote className="w-12 h-12 text-gold/30 mb-6" />
              
              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-gold fill-gold" />
                ))}
              </div>

              <blockquote className="font-display text-3xl md:text-4xl text-text-primary leading-tight mb-8">
                "{current.quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                  <span className="font-display text-lg text-gold">
                    {current.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-display text-xl text-text-primary">
                    {current.author}
                  </p>
                  <p className="font-mono text-xs text-text-secondary uppercase tracking-[0.12em]">
                    {current.role}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <button
              onClick={prev}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 disabled:opacity-50"
              data-cursor-text="Prev"
            >
              <ChevronLeft className="w-5 h-5 text-text-primary" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => changeTestimonial(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'w-8 bg-gold' 
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              disabled={isAnimating}
              className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300 disabled:opacity-50"
              data-cursor-text="Next"
            >
              <ChevronRight className="w-5 h-5 text-text-primary" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}