import { Instagram, Facebook, Linkedin, Mail } from 'lucide-react';

const socialLinks = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:hello@jandacaptures.studio', label: 'Email' },
];

const navLinks = [
  { label: 'Trabajo', href: '#selected-work' },
  { label: 'Servicios', href: '#services' },
  { label: 'Proceso', href: '#process' },
  { label: 'Preguntas', href: '#faq' },
  { label: 'Contacto', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative bg-charcoal border-t border-white/5">
      <div className="section-padding py-16 md:py-20">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          {/* Left - Logo & Tagline */}
          <div className="max-w-sm">
            <a href="#" className="inline-block">
              <span className="font-display text-4xl text-text-primary tracking-tight">
                J<span className="text-gold">&</span>A
              </span>
              <span className="block font-display text-lg text-text-secondary tracking-[0.2em] mt-1">
                CAPTURES
              </span>
            </a>
            <p className="mt-4 text-text-secondary text-sm leading-relaxed">
              Estudio de fotografía de bodas y editorial con sede en México. Trabajamos en ciertas zonas del país.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-4 mt-6">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-text-secondary hover:text-gold hover:border-gold/30 transition-all duration-300"
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right - Navigation */}
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div>
              <h4 className="font-mono text-xs text-text-secondary uppercase tracking-[0.12em] mb-4">
                Navegación
              </h4>
              <ul className="space-y-3">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="text-text-primary hover:text-gold transition-colors duration-300"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-mono text-xs text-text-secondary uppercase tracking-[0.12em] mb-4">
                Contacto
              </h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@jandacaptures.studio"
                    className="text-text-primary hover:text-gold transition-colors duration-300"
                  >
                    hello@jandacaptures.studio
                  </a>
                </li>
                <li>
                  <span className="text-text-secondary">
                    Ciudad de México
                  </span>
                </li>
                <li>
                  <span className="text-text-secondary">
                    Ciertas zonas de México
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-text-secondary/60 text-sm">
            © {new Date().getFullYear()} J&A Captures. Todos los derechos reservados.
          </p>
          <p className="text-text-secondary/60 text-sm">
            Hecho con cuidado para los momentos que importan.
          </p>
        </div>
      </div>
    </footer>
  );
}