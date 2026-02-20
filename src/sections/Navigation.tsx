import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const navLinks = [
  { label: 'Work', href: '#selected-work' },
  { label: 'Services', href: '#services' },
  { label: 'Process', href: '#process' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show navigation after scrolling past hero
    ScrollTrigger.create({
      trigger: '#hero',
      start: 'bottom top+=100',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === '#hero') st.kill();
      });
    };
  }, []);

  useEffect(() => {
    if (menuRef.current) {
      if (isMenuOpen) {
        gsap.fromTo(menuRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.3, ease: 'power2.out' }
        );
        gsap.fromTo(menuRef.current.querySelectorAll('.menu-item'),
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out', delay: 0.1 }
        );
      }
    }
  }, [isMenuOpen]);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1.2,
        scrollTo: { y: target, offsetY: 0 },
        ease: 'power3.inOut'
      });
    }
  };

  return (
    <>
      {/* Fixed Navigation */}
      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full'
        }`}
      >
        <div className="bg-charcoal/80 backdrop-blur-md border-b border-white/5">
          <div className="flex items-center justify-between section-padding py-4">
            {/* Logo */}
            <a href="#" className="font-display text-2xl text-text-primary tracking-tight">
              J<span className="text-gold">&</span>A
            </a>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="font-mono text-xs uppercase tracking-[0.12em] text-text-secondary hover:text-gold transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={(e) => handleLinkClick(e, '#contact')}
                className="btn-gold text-sm py-2 px-6"
              >
                Book
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(true)}
              className="md:hidden flex items-center gap-2 text-text-primary"
            >
              <span className="font-mono text-xs uppercase tracking-[0.12em]">Menu</span>
              <div className="w-2 h-2 rounded-full bg-gold" />
            </button>
          </div>
        </div>
      </nav>

      {/* Logo (always visible on hero) */}
      <div className={`fixed top-6 left-6 md:left-12 z-40 transition-opacity duration-500 ${isVisible ? 'opacity-0' : 'opacity-100'}`}>
        <span className="font-display text-2xl md:text-3xl text-text-primary tracking-tight">
          J<span className="text-gold">&</span>A
        </span>
      </div>

      {/* Menu Button (always visible on hero) */}
      <button 
        onClick={() => setIsMenuOpen(true)}
        className={`fixed top-6 right-6 md:right-12 z-40 flex items-center gap-2 text-text-primary transition-opacity duration-500 ${isVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <span className="font-mono text-xs uppercase tracking-[0.12em]">Menu</span>
        <div className="w-2 h-2 rounded-full bg-gold" />
      </button>

      {/* Full Screen Menu */}
      {isMenuOpen && (
        <div 
          ref={menuRef}
          className="fixed inset-0 bg-charcoal z-[90] flex flex-col items-center justify-center"
        >
          <button
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 md:right-12 text-text-primary"
          >
            <X className="w-6 h-6" />
          </button>

          <div className="flex flex-col items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="menu-item font-display text-4xl md:text-6xl text-text-primary hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center">
            <p className="font-mono text-xs text-text-secondary tracking-[0.12em]">
              hello@jandacaptures.studio
            </p>
          </div>
        </div>
      )}
    </>
  );
}