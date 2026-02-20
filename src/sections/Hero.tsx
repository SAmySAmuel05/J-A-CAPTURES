import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronDown } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  shutterComplete: boolean;
}

export default function Hero({ shutterComplete }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const taglineRef = useRef<HTMLDivElement>(null);
  const bottomLeftRef = useRef<HTMLDivElement>(null);
  const bottomRightRef = useRef<HTMLDivElement>(null);
  const bounceIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!shutterComplete) return;

    const section = sectionRef.current;
    const image = imageRef.current;
    const logo = logoRef.current;
    const tagline = taglineRef.current;
    const bottomLeft = bottomLeftRef.current;
    const bottomRight = bottomRightRef.current;

    if (!section || !image || !logo || !tagline || !bottomLeft || !bottomRight) return;

    // Fast entrance animation
    const entranceTl = gsap.timeline();
    
    entranceTl.fromTo(image,
      { scale: 1.15, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8, ease: 'power2.out' }
    );

    entranceTl.fromTo(logo,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
      '-=0.5'
    );

    entranceTl.fromTo(tagline,
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' },
      '-=0.3'
    );

    entranceTl.fromTo([bottomLeft, bottomRight],
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out' },
      '-=0.2'
    );

    // Mouse parallax effect
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      // Subtle parallax on image
      gsap.to(image, {
        x: xPercent * -15,
        y: yPercent * -10,
        duration: 0.5,
        ease: 'power2.out',
      });

      // Counter-movement on logo for depth
      gsap.to(logo, {
        x: xPercent * 8,
        y: yPercent * 5,
        duration: 0.5,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    // Continuous floating animation for scroll indicator
    if (bounceIconRef.current) {
      gsap.to(bounceIconRef.current, {
        y: 8,
        duration: 0.8,
        repeat: -1,
        yoyo: true,
        ease: 'power1.inOut',
      });
    }

    return () => {
      entranceTl.kill();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, [shutterComplete]);

  return (
    <section 
      ref={sectionRef}
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background Image with parallax */}
      <div 
        ref={imageRef}
        className="absolute inset-0 w-full h-full scale-110"
        style={{ opacity: 0 }}
      >
        <img 
          src={assetUrl('images/hero_couple.jpg')} 
          alt="Fotografía de bodas"
          className="w-full h-full object-cover"
          style={{ objectPosition: '70% 30%' }}
        />
        <div className="absolute inset-0 hero-gradient" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        {/* Logo Block */}
        <div ref={logoRef} className="text-center" style={{ opacity: 0 }}>
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl text-text-primary tracking-tight leading-none">
            J<span className="text-gold">&</span>A
          </h1>
          <p className="font-display text-2xl md:text-3xl lg:text-4xl text-text-primary tracking-[0.2em] mt-2">
            CAPTURES
          </p>
        </div>

        {/* Tagline */}
        <div 
          ref={taglineRef} 
          className="mt-8 text-center"
          style={{ opacity: 0 }}
        >
          <p className="font-mono text-xs md:text-sm uppercase tracking-[0.14em] text-text-secondary">
            Fotografía de bodas y editorial
          </p>
        </div>

        {/* CTA Button */}
        <div className="mt-12">
          <a 
            href="#contact"
            className="btn-gold inline-flex items-center gap-2 group"
            data-cursor-text="Reservar"
          >
            Reservar sesión
            <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      {/* Bottom Left Caption */}
      <div 
        ref={bottomLeftRef}
        className="absolute bottom-8 left-6 md:left-12 z-10"
        style={{ opacity: 0 }}
      >
        <p className="font-mono text-xs text-text-secondary tracking-[0.08em] max-w-[280px]">
          Con sede en México — disponibles en todo el país y el mundo.
        </p>
      </div>

      {/* Bottom Right Scroll Hint */}
      <div 
        ref={bottomRightRef}
        className="absolute bottom-8 right-6 md:right-12 z-10"
        style={{ opacity: 0 }}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-mono text-xs text-text-secondary uppercase tracking-[0.12em]">Deslizar</span>
          <div ref={bounceIconRef}>
            <ChevronDown className="w-4 h-4 text-gold" />
          </div>
        </div>
      </div>
    </section>
  );
}