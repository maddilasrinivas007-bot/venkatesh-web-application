'use client';

import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@nyayaai/shared';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

export function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <OwnerHighlight variant="card" className="mb-8" />
          <h2 className="font-display text-4xl font-bold mb-4">
            Get in <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Contact <strong className="text-foreground">{CONTACT_INFO.ownerDisplay}</strong> at {CONTACT_INFO.organization} for legal assistance and consultations.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
                  <Mail className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Email</h3>
                <a
                  href={`mailto:${CONTACT_INFO.email}`}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors break-all"
                >
                  {CONTACT_INFO.email}
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <Phone className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Phone</h3>
                <a
                  href={CONTACT_INFO.phoneHref}
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  {CONTACT_INFO.phone}
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10 text-secondary mb-4">
                  <MessageCircle className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">WhatsApp</h3>
                <a
                  href={CONTACT_INFO.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-secondary transition-colors"
                >
                  {CONTACT_INFO.whatsapp}
                </a>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Card className="glass-card border-0 h-full hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-accent/20 text-accent-foreground mb-4">
                  <MapPin className="h-6 w-6" />
                </div>
                <h3 className="font-semibold mb-2">Office</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {CONTACT_INFO.address}
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        <div className="text-center mt-10">
          <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noopener noreferrer">
            <Button variant="gradient" size="lg" className="gap-2">
              <MessageCircle className="h-5 w-5" />
              Chat on WhatsApp
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
}
