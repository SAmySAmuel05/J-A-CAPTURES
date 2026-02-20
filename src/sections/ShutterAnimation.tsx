import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface ShutterAnimationProps {
  onComplete: () => void;
}

export default function ShutterAnimation({ onComplete }: ShutterAnimationProps) {
  const shutterRef = useRef<HTMLDivElement>(null);
  const goldLineRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const shutter = shutterRef.current;
    const goldLine = goldLineRef.current;
    const logo = logoRef.current;
    if (!shutter || !goldLine || !logo) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.set(shutter, { display: 'none' });
        onComplete();
      }
    });

    // Logo fades in quickly
    tl.fromTo(logo,
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
    );

    // Gold line expands fast
    tl.fromTo(goldLine, 
      { scaleX: 0 },
      { scaleX: 1, duration: 0.3, ease: 'power2.out' },
      '-=0.1'
    );

    // Brief pause
    tl.to({}, { duration: 0.2 });

    // Everything exits quickly
    tl.to(logo, {
      opacity: 0,
      y: -20,
      duration: 0.2,
      ease: 'power2.in'
    }, '-=0.1');

    // Shutter opens fast
    tl.to(shutter, {
      yPercent: -100,
      duration: 0.6,
      ease: 'power3.inOut',
    }, '-=0.1');

    return () => {
      tl.kill();
    };
  }, [onComplete]);

  return (
    <div 
      ref={shutterRef}
      className="fixed inset-0 bg-charcoal z-[100] flex flex-col items-center justify-center"
    >
      {/* Logo */}
      <div ref={logoRef} className="mb-8" style={{ opacity: 0 }}>
        <span className="font-display text-6xl md:text-8xl text-text-primary tracking-tight">
          J<span className="text-gold">&</span>A
        </span>
        <p className="font-display text-xl text-text-secondary tracking-[0.3em] text-center mt-2">
          CAPTURES
        </p>
      </div>

      {/* Gold line */}
      <div 
        ref={goldLineRef}
        className="w-48 h-[2px] bg-gold origin-center"
        style={{ transform: 'scaleX(0)' }}
      />
    </div>
  );
}