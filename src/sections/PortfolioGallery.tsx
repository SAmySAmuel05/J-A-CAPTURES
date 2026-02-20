import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { X, ZoomIn } from 'lucide-react';
import { assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

type Category = 'all' | 'weddings' | 'corporate' | 'social' | 'portraits';

interface PortfolioItem {
  id: number;
  src: string;
  title: string;
  category: Category;
}

const portfolioItems: PortfolioItem[] = [
  { id: 1, src: assetUrl('images/hero_couple.jpg'), title: 'Eternal Love', category: 'weddings' },
  { id: 2, src: assetUrl('images/mosaic_tile_a.jpg'), title: 'Bridal Portrait', category: 'weddings' },
  { id: 3, src: assetUrl('images/mosaic_tile_b.jpg'), title: 'Urban Romance', category: 'weddings' },
  { id: 4, src: assetUrl('images/mosaic_tile_c.jpg'), title: 'Classic Elegance', category: 'weddings' },
  { id: 5, src: assetUrl('images/mosaic_tile_d.jpg'), title: 'Reception Magic', category: 'weddings' },
  { id: 6, src: assetUrl('images/mosaic_tile_e.jpg'), title: 'The Details', category: 'weddings' },
  { id: 7, src: assetUrl('images/portfolio_corporate_01.jpg'), title: 'Gala Evening', category: 'corporate' },
  { id: 8, src: assetUrl('images/portfolio_corporate_02.jpg'), title: 'Executive Portrait', category: 'corporate' },
  { id: 9, src: assetUrl('images/portfolio_corporate_03.jpg'), title: 'Conference Keynote', category: 'corporate' },
  { id: 10, src: assetUrl('images/portfolio_social_01.jpg'), title: 'Celebration', category: 'social' },
  { id: 11, src: assetUrl('images/portfolio_social_02.jpg'), title: 'Birthday Toast', category: 'social' },
  { id: 12, src: assetUrl('images/portfolio_portrait_01.jpg'), title: 'Studio Elegance', category: 'portraits' },
  { id: 13, src: assetUrl('images/portfolio_portrait_02.jpg'), title: 'Character Study', category: 'portraits' },
  { id: 14, src: assetUrl('images/studio_window_02.jpg'), title: 'Golden Hour', category: 'weddings' },
  { id: 15, src: assetUrl('images/testimonial_left.jpg'), title: 'Joyful Moments', category: 'weddings' },
];

const categories: { key: Category; label: string }[] = [
  { key: 'all', label: 'All Work' },
  { key: 'weddings', label: 'Weddings' },
  { key: 'corporate', label: 'Corporate' },
  { key: 'social', label: 'Social Events' },
  { key: 'portraits', label: 'Portraits' },
];

export default function PortfolioGallery() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedImage, setSelectedImage] = useState<PortfolioItem | null>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredItems = activeCategory === 'all' 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Section entrance
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

    // Staggered grid items entrance
    itemRefs.current.forEach((item, index) => {
      if (!item) return;
      gsap.fromTo(item,
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.5,
          delay: index * 0.05,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
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

  // Animate filter change
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const items = grid.querySelectorAll('.portfolio-item');
    
    gsap.fromTo(items,
      { opacity: 0, y: 30, scale: 0.95 },
      { 
        opacity: 1, 
        y: 0, 
        scale: 1, 
        duration: 0.4, 
        stagger: 0.04,
        ease: 'power3.out'
      }
    );
  }, [activeCategory]);

  return (
    <section 
      ref={sectionRef}
      id="portfolio"
      className="relative w-full bg-charcoal py-24 md:py-32"
    >
      <div className="section-padding">
        {/* Header */}
        <div className="section-header text-center mb-12">
          <span className="micro-label">Portfolio</span>
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary mt-4">
            Selected Work
          </h2>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => setActiveCategory(cat.key)}
              className={`px-5 py-2 rounded-full font-mono text-xs uppercase tracking-[0.12em] transition-all duration-300 ${
                activeCategory === cat.key
                  ? 'bg-gold text-charcoal'
                  : 'bg-slate text-text-secondary hover:text-gold hover:bg-slate/80'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry Grid */}
        <div 
          ref={gridRef}
          className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4"
        >
          {filteredItems.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => { itemRefs.current[index] = el; }}
              className="portfolio-item relative overflow-hidden rounded-lg break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedImage(item)}
              data-cursor-text="View"
            >
              <div className={`relative ${
                index % 3 === 0 ? 'aspect-[4/5]' : 
                index % 3 === 1 ? 'aspect-square' : 
                'aspect-[3/4]'
              }`}>
                <img 
                  src={item.src} 
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="font-mono text-xs text-gold uppercase tracking-[0.12em] mb-1">
                    {item.category}
                  </span>
                  <h3 className="font-display text-2xl text-text-primary">
                    {item.title}
                  </h3>
                  <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
                    <ZoomIn className="w-5 h-5 text-gold" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-charcoal/95 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-slate flex items-center justify-center hover:bg-gold/20 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-6 h-6 text-text-primary" />
          </button>
          
          <div 
            className="max-w-5xl max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            <img 
              src={selectedImage.src} 
              alt={selectedImage.title}
              className="max-w-full max-h-[80vh] object-contain rounded-lg"
            />
            <div className="mt-4 text-center">
              <span className="font-mono text-xs text-gold uppercase tracking-[0.12em]">
                {selectedImage.category}
              </span>
              <h3 className="font-display text-2xl text-text-primary mt-1">
                {selectedImage.title}
              </h3>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}