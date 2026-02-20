import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Plus, Minus, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: '¿Con cuánta anticipación debemos reservar?',
    answer: 'Recomendamos reservar con 8-12 meses de anticipación para bodas, sobre todo en temporada alta (mayo-octubre). Para sesiones de pareja y eventos pequeños, 4-6 semanas suele ser suficiente.',
  },
  {
    question: '¿Hacen bodas en otros destinos?',
    answer: '¡Sí! Nos encantan las bodas destino. Los costos de traslado se calculan según el lugar e incluyen vuelos, hospedaje y transporte. Contáctanos para una cotización personalizada.',
  },
  {
    question: '¿Qué incluye la galería?',
    answer: 'Todos los paquetes incluyen una galería en línea privada con imágenes en alta resolución y editadas. Recibirás archivos listos para imprimir con derechos de impresión, y la galería permanece activa un año.',
  },
  {
    question: '¿Podemos sumar un segundo fotógrafo?',
    answer: '¡Sí! Un segundo fotógrafo está incluido en nuestro paquete de cobertura completa de boda. Captura otros ángulos, momentos espontáneos y ayuda a que no se pierda ningún instante.',
  },
  {
    question: '¿En cuánto tiempo recibimos las fotos?',
    answer: 'Las sesiones de pareja se entregan en 2-3 semanas. Las galerías de boda suelen estar listas en 6-8 semanas en temporada alta y 4-6 en temporada baja. La entrega express está disponible como extra.',
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
            <span className="micro-label">Preguntas frecuentes</span>
            <h2 className="font-display text-5xl md:text-6xl text-text-primary mt-4">
              Preguntas frecuentes
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
              ¿Más preguntas? Escríbenos
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}