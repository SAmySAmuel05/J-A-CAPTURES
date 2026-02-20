import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, Send, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { cn, assetUrl } from '@/lib/utils';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [date, setDate] = useState<Date>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    const headline = headlineRef.current;
    const form = formRef.current;

    if (!section || !headline || !form) return;

    // Headline animation
    gsap.fromTo(headline,
      { opacity: 0, x: '-6vw' },
      {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
        }
      }
    );

    // Form animation
    gsap.fromTo(form,
      { opacity: 0, x: '6vw', scale: 0.98 },
      {
        opacity: 1,
        x: 0,
        scale: 1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 70%',
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(st => {
        if (st.vars.trigger === section) st.kill();
      });
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="relative w-full min-h-screen overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={assetUrl('images/closing_bg.jpg')} 
          alt="Background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal/70 via-charcoal/50 to-charcoal/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 section-padding py-24 md:py-32">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          {/* Left Column - Headline */}
          <div 
            ref={headlineRef}
            className="lg:w-[38%]"
            style={{ opacity: 0 }}
          >
            <span className="micro-label">Contact</span>
            <h2 className="font-display text-5xl md:text-6xl lg:text-7xl text-text-primary mt-4 leading-tight">
              Let's make something timeless.
            </h2>
            <p className="mt-6 text-text-secondary text-lg leading-relaxed">
              Tell us your date and what you're planning. We'll reply within one business day.
            </p>
            
            <div className="mt-8 flex items-center gap-3">
              <Mail className="w-5 h-5 text-gold" />
              <a 
                href="mailto:hello@jandacaptures.studio"
                className="text-text-secondary hover:text-gold transition-colors duration-300"
              >
                hello@jandacaptures.studio
              </a>
            </div>
          </div>

          {/* Right Column - Form */}
          <div 
            ref={formRef}
            className="lg:w-[50%] w-full"
            style={{ opacity: 0 }}
          >
            <div className="bg-slate/80 backdrop-blur-sm rounded-2xl p-8 md:p-10 border border-white/10">
              {submitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-6">
                    <Send className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="font-display text-3xl text-text-primary mb-3">
                    Message Sent!
                  </h3>
                  <p className="text-text-secondary">
                    Thank you for reaching out. We'll be in touch within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-text-secondary font-mono text-xs uppercase tracking-[0.12em]">
                      Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="bg-charcoal/50 border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:border-gold/50 focus:ring-gold/20"
                    />
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-text-secondary font-mono text-xs uppercase tracking-[0.12em]">
                      Email
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="your@email.com"
                      className="bg-charcoal/50 border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:border-gold/50 focus:ring-gold/20"
                    />
                  </div>

                  {/* Event Date */}
                  <div className="space-y-2">
                    <Label className="text-text-secondary font-mono text-xs uppercase tracking-[0.12em]">
                      Event Date
                    </Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal bg-charcoal/50 border-white/10 text-text-primary hover:bg-charcoal/70 hover:text-text-primary",
                            !date && "text-text-secondary/50"
                          )}
                        >
                          <Calendar className="mr-2 h-4 w-4 text-gold" />
                          {date ? format(date, "PPP") : "Select a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-slate border-white/10" align="start">
                        <CalendarComponent
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                          className="bg-slate text-text-primary"
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Message */}
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-text-secondary font-mono text-xs uppercase tracking-[0.12em]">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={4}
                      placeholder="Tell us about your event..."
                      className="bg-charcoal/50 border-white/10 text-text-primary placeholder:text-text-secondary/50 focus:border-gold/50 focus:ring-gold/20 resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-gold flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-charcoal/30 border-t-charcoal rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send inquiry
                        <Send className="w-4 h-4" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}