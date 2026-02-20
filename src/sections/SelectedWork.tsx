import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<(HTMLDivElement | null)[]>([]);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const tiles = tilesRef.current.filter(Boolean) as HTMLDivElement[];
    const title = titleRef.current;

    if (!section || tiles.length === 0 || !title) return;

    // Fast scroll-triggered animations - NO PINNING
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 85%',
        end: 'top 30%',
        scrub: 0.2, // Very fast scrub
      }
    });

    // Staggered tile entrance
    tiles.forEach((tile, index) => {
      const direction = index % 2 === 0 ? -80 : 80;
      tl.fromTo(tile,
        { x: direction, opacity: 0, scale: 0.9 },
        { x: 0, opacity: 1, scale: 1, ease: 'none' },
        index * 0.05
      );
    });

    tl.fromTo(title,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, ease: 'none' },
      0.2
    );

    // Continuous floating animation for tiles
    tiles.forEach((tile, index) => {
      gsap.to(tile, {
        y: index % 2 === 0 ? -8 : 8,
        duration: 2 + index * 0.3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
      });
    });

    // Mouse parallax on hover
    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      
      const xPercent = (clientX / innerWidth - 0.5) * 2;
      const yPercent = (clientY / innerHeight - 0.5) * 2;

      tiles.forEach((tile, index) => {
        const depth = (index + 1) * 3;
        gsap.to(tile, {
          x: xPercent * depth,
          y: (yPercent * depth) + (index % 2 === 0 ? -8 : 8), // Add floating offset
          duration: 0.3,
          ease: 'power2.out',
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      tl.kill();
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const tiles = [
    { ref: 0, src: assetUrl('images/mosaic_tile_a.jpg'), label: 'Weddings', aspect: 'aspect-[21/9]' },
    { ref: 1, src: assetUrl('images/mosaic_tile_b.jpg'), label: 'Engagement', aspect: 'aspect-[4/5]' },
    { ref: 2, src: assetUrl('images/mosaic_tile_c.jpg'), label: 'Editorial', aspect: 'aspect-[4/5]' },
    { ref: 3, src: assetUrl('images/mosaic_tile_d.jpg'), label: 'Events', aspect: 'aspect-[16/9]' },
    { ref: 4, src: assetUrl('images/mosaic_tile_e.jpg'), label: 'Details', aspect: 'aspect-[21/9]' },
  ];

  return (
    <section 
      ref={sectionRef}
      id="selected-work"
      className="relative w-full min-h-screen py-24 md:py-32 overflow-hidden bg-charcoal"
    >
      <div className="section-padding">
        {/* Mosaic Grid */}
        <div className="grid grid-cols-12 gap-4 md:gap-6 max-w-7xl mx-auto">
          {/* Tile A - Top Left Wide */}
          <div 
            ref={(el) => { tilesRef.current[0] = el; }}
            className="col-span-12 md:col-span-7 relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ opacity: 0 }}
            data-cursor-text="View"
          >
            <div className="aspect-[21/9] md:aspect-[16/7]">
              <img 
                src={tiles[0].src}
                alt={tiles[0].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">{tiles[0].label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Tile B - Top Right */}
          <div 
            ref={(el) => { tilesRef.current[1] = el; }}
            className="col-span-6 md:col-span-5 relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ opacity: 0 }}
            data-cursor-text="View"
          >
            <div className="aspect-[4/5]">
              <img 
                src={tiles[1].src}
                alt={tiles[1].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">{tiles[1].label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Tile C - Middle Left */}
          <div 
            ref={(el) => { tilesRef.current[2] = el; }}
            className="col-span-6 md:col-span-4 relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ opacity: 0 }}
            data-cursor-text="View"
          >
            <div className="aspect-[4/5]">
              <img 
                src={tiles[2].src}
                alt={tiles[2].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">{tiles[2].label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Center Title Block */}
          <div 
            ref={titleRef}
            className="col-span-12 md:col-span-4 flex flex-col items-center justify-center py-8 md:py-0"
            style={{ opacity: 0 }}
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-text-primary text-center">
              Selected
              <br />
              <span className="text-gold">Work</span>
            </h2>
            <p className="mt-4 font-mono text-xs text-text-secondary uppercase tracking-[0.14em] text-center">
              Weddings • Events • Portraits
            </p>
            <a 
              href="#portfolio"
              className="mt-6 inline-flex items-center gap-2 text-gold font-mono text-sm uppercase tracking-[0.12em] hover:gap-4 transition-all duration-300 group"
            >
              View all
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </div>

          {/* Tile D - Middle Right */}
          <div 
            ref={(el) => { tilesRef.current[3] = el; }}
            className="col-span-12 md:col-span-4 relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ opacity: 0 }}
            data-cursor-text="View"
          >
            <div className="aspect-[16/9] md:aspect-[4/5]">
              <img 
                src={tiles[3].src}
                alt={tiles[3].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">{tiles[3].label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          </div>

          {/* Tile E - Bottom Wide */}
          <div 
            ref={(el) => { tilesRef.current[4] = el; }}
            className="col-span-12 relative overflow-hidden rounded-xl group cursor-pointer"
            style={{ opacity: 0 }}
            data-cursor-text="View"
          >
            <div className="aspect-[21/9] md:aspect-[21/7]">
              <img 
                src={tiles[4].src}
                alt={tiles[4].label}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300">
                <div className="absolute bottom-4 left-4 flex items-center gap-2">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">{tiles[4].label}</span>
                  <ArrowUpRight className="w-4 h-4 text-gold" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}