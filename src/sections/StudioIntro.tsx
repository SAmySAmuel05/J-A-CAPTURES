import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function StudioIntro() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftImageRef = useRef<HTMLDivElement>(null);
  const rightImageRef = useRef<HTMLDivElement>(null);
  const textBlockRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const leftImage = leftImageRef.current;
    const rightImage = rightImageRef.current;
    const textBlock = textBlockRef.current;
    const label = labelRef.current;

    if (!section || !leftImage || !rightImage || !textBlock || !label) return;

    // Fast entrance on scroll - NO PINNING for smoother feel
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        end: 'top 20%',
        scrub: 0.3, // Much faster scrub
      }
    });

    tl.fromTo(leftImage,
      { x: -100, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, ease: 'none' },
      0
    );

    tl.fromTo(rightImage,
      { x: 100, opacity: 0, scale: 0.95 },
      { x: 0, opacity: 1, scale: 1, ease: 'none' },
      0
    );

    tl.fromTo(textBlock,
      { y: 60, opacity: 0 },
      { y: 0, opacity: 1, ease: 'none' },
      0.1
    );

    tl.fromTo(label,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, ease: 'none' },
      0
    );

    // Mouse parallax on images
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      gsap.to(leftImage, {
        x: xPercent * -12,
        y: yPercent * -8,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(rightImage, {
        x: xPercent * 12,
        y: yPercent * -8,
        duration: 0.4,
        ease: 'power2.out',
      });

      gsap.to(textBlock, {
        x: xPercent * 5,
        y: yPercent * 3,
        duration: 0.4,
        ease: 'power2.out',
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      tl.kill();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-charcoal"
    >
      {/* Top Label */}
      <div 
        ref={labelRef}
        className="text-center mb-12"
        style={{ opacity: 0 }}
      >
        <span className="micro-label">El estudio</span>
      </div>

      <div className="section-padding">
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
          {/* Left Image Window */}
          <div 
            ref={leftImageRef}
            className="w-full lg:w-[28vw] h-[50vh] lg:h-[64vh] overflow-hidden rounded-lg image-hover-zoom"
            style={{ opacity: 0 }}
            data-cursor-text="Ver"
          >
            <img 
              src={assetUrl('images/studio_window_01.jpg')} 
              alt="Momento de preparación"
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>

          {/* Center Text Block */}
          <div 
            ref={textBlockRef}
            className="w-full lg:w-[34vw] min-w-[320px] text-center py-8 lg:py-0"
            style={{ opacity: 0 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary leading-tight">
              Fotografía que cuenta tu historia.
            </h2>
            <p className="mt-6 text-text-secondary text-base md:text-lg leading-relaxed">
              Bodas, sesiones de pareja y eventos: capturamos los instantes reales, la luz natural y los detalles que querrás conservar para siempre.
            </p>
            <a 
              href="#selected-work"
              className="inline-flex items-center gap-2 mt-8 text-gold font-mono text-sm uppercase tracking-[0.12em] hover:gap-4 transition-all duration-300 group"
            >
              Ver trabajo seleccionado
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Right Image Window */}
          <div 
            ref={rightImageRef}
            className="w-full lg:w-[28vw] h-[50vh] lg:h-[64vh] overflow-hidden rounded-lg image-hover-zoom"
            style={{ opacity: 0 }}
            data-cursor-text="Ver"
          >
            <img 
              src={assetUrl('images/studio_window_02.jpg')} 
              alt="Pareja en exterior"
              className="w-full h-full object-cover transition-transform duration-700"
            />
          </div>
        </div>
      </div>
    </section>
  );
}