import Link from 'next/link';
import { Scale, Mail, Phone, MapPin, MessageCircle, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@nyayaai/shared';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-secondary/5">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>

        <OwnerHighlight variant="card" className="mb-8" />

        <div className="flex items-center gap-3 mb-8">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white">
            <Scale className="h-6 w-6" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Contact {CONTACT_INFO.ownerDisplay}</h1>
            <p className="text-muted-foreground">{CONTACT_INFO.organization}</p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="glass-card border-0">
            <CardContent className="p-6 space-y-5">
              <div className="flex items-start gap-4">
                <Mail className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Email</div>
                  <a href={`mailto:${CONTACT_INFO.email}`} className="text-sm text-muted-foreground hover:text-primary">
                    {CONTACT_INFO.email}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="h-5 w-5 text-secondary mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Phone</div>
                  <a href={CONTACT_INFO.phoneHref} className="text-sm text-muted-foreground hover:text-secondary">
                    {CONTACT_INFO.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MessageCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <div className="font-medium mb-1">WhatsApp</div>
                  <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-green-600">
                    {CONTACT_INFO.whatsapp}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <MapPin className="h-5 w-5 text-accent mt-0.5" />
                <div>
                  <div className="font-medium mb-1">Office Address</div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{CONTACT_INFO.address}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardContent className="p-6 flex flex-col justify-center h-full text-center">
              <h2 className="text-xl font-semibold mb-1">{CONTACT_INFO.ownerDisplay}</h2>
              <p className="text-sm text-primary font-medium mb-4">{CONTACT_INFO.ownerTagline}</p>
              <p className="text-sm text-muted-foreground mb-6">
                Connect with Advocate Venkatesh garu via WhatsApp for quick assistance or email for detailed legal inquiries.
              </p>
              <div className="flex flex-col gap-3">
                <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noopener noreferrer">
                  <Button variant="gradient" className="w-full gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </Button>
                </a>
                <a href={`mailto:${CONTACT_INFO.email}`}>
                  <Button variant="outline" className="w-full gap-2">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
