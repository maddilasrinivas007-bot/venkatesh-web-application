import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { CONTACT_INFO } from '@nyayaai/shared';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

const footerLinks = {
  Platform: [
    { label: 'AI Assistant', href: '/dashboard/ai' },
    { label: 'Legal Research', href: '/dashboard/research' },
    { label: 'Document Generator', href: '/dashboard/documents' },
    { label: 'Advocate Marketplace', href: '/dashboard/advocates' },
  ],
  Resources: [
    { label: 'Constitution', href: '/dashboard/constitution' },
    { label: 'Judgments', href: '/dashboard/research' },
    { label: 'Legislation', href: '/dashboard/research' },
    { label: 'Contact Us', href: '/#contact' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border bg-muted/20">
      <div className="container mx-auto px-4 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
                <Scale className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Nyaya<span className="text-primary">AI</span></span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4 max-w-sm">
              Empowering Every Citizen with Trusted Legal Intelligence.
            </p>
            <OwnerHighlight variant="footer" />
            <div className="space-y-2.5 text-sm text-muted-foreground">
              <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                {CONTACT_INFO.email}
              </a>
              <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-2 hover:text-primary transition-colors">
                <Phone className="h-4 w-4 shrink-0" />
                {CONTACT_INFO.phone}
              </a>
              <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-600 transition-colors">
                <MessageCircle className="h-4 w-4 shrink-0" />
                WhatsApp: {CONTACT_INFO.whatsapp}
              </a>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{CONTACT_INFO.address}</span>
              </div>
            </div>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {CONTACT_INFO.ownerDisplay} · {CONTACT_INFO.organization} · NyayaAI
          </p>
          <p className="text-xs text-muted-foreground max-w-lg text-center md:text-right">
            NyayaAI provides legal information only and does not constitute legal advice.
            Always consult a qualified advocate for your specific legal matters.
          </p>
        </div>
      </div>
    </footer>
  );
}
