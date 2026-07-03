'use client';

import { motion } from 'framer-motion';
import { Star, MapPin, Clock, IndianRupee } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const advocates = [
  {
    name: 'Adv. Rajesh Sharma',
    areas: ['Criminal Law', 'Civil Litigation'],
    experience: 14,
    rating: 4.8,
    reviews: 127,
    fee: 2500,
    city: 'Mumbai',
    languages: ['English', 'Hindi', 'Marathi'],
  },
  {
    name: 'Adv. Priya Nair',
    areas: ['Family Law', 'Property Law'],
    experience: 10,
    rating: 4.9,
    reviews: 89,
    fee: 2000,
    city: 'Bangalore',
    languages: ['English', 'Hindi', 'Kannada'],
  },
  {
    name: 'Adv. Amit Verma',
    areas: ['Corporate Law', 'Tax Law'],
    experience: 18,
    rating: 4.7,
    reviews: 203,
    fee: 5000,
    city: 'New Delhi',
    languages: ['English', 'Hindi'],
  },
  {
    name: 'Adv. Lakshmi Reddy',
    areas: ['Consumer Protection', 'Labour Law'],
    experience: 8,
    rating: 4.6,
    reviews: 56,
    fee: 1500,
    city: 'Hyderabad',
    languages: ['English', 'Hindi', 'Telugu'],
  },
];

export function AdvocatesSection() {
  return (
    <section id="advocates" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">
            Featured <span className="gradient-text">Advocates</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Connect with verified advocates across India. Book online consultations with transparent pricing.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {advocates.map((adv, i) => (
            <motion.div
              key={adv.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-0 h-full hover:shadow-xl transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-xl font-bold">
                      {adv.name.split(' ')[1]?.[0]}{adv.name.split(' ')[2]?.[0] || adv.name.split(' ')[1]?.[1]}
                    </div>
                    <div>
                      <div className="font-semibold">{adv.name}</div>
                      <div className="flex items-center gap-1 text-sm">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        <span>{adv.rating}</span>
                        <span className="text-muted-foreground">({adv.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {adv.areas.map((area) => (
                      <span key={area} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                        {area}
                      </span>
                    ))}
                  </div>

                  <div className="space-y-2 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-3.5 w-3.5" />
                      {adv.city}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3.5 w-3.5" />
                      {adv.experience} years experience
                    </div>
                    <div className="flex items-center gap-2">
                      <IndianRupee className="h-3.5 w-3.5" />
                      ₹{adv.fee}/consultation
                    </div>
                  </div>

                  <Button variant="outline" className="w-full" size="sm">
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const judgments = [
  {
    title: 'Kesavananda Bharati v. State of Kerala',
    citation: 'AIR 1973 SC 1461',
    court: 'Supreme Court',
    year: 1973,
    subject: 'Basic Structure Doctrine',
  },
  {
    title: 'Maneka Gandhi v. Union of India',
    citation: 'AIR 1978 SC 597',
    court: 'Supreme Court',
    year: 1978,
    subject: 'Article 21 — Right to Life',
  },
  {
    title: 'Vishaka v. State of Rajasthan',
    citation: 'AIR 1997 SC 3011',
    court: 'Supreme Court',
    year: 1997,
    subject: 'Sexual Harassment at Workplace',
  },
];

export function ResearchSection() {
  return (
    <section id="research" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">
            Recent <span className="gradient-text">Supreme Court</span> Judgments
          </h2>
          <p className="text-lg text-muted-foreground">
            Access landmark judgments with AI-powered summaries, annotations, and citation analysis.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {judgments.map((j, i) => (
            <motion.div
              key={j.citation}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass-card border-0 h-full hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="text-xs font-medium text-primary mb-2">{j.court} · {j.year}</div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{j.citation}</p>
                  <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary">{j.subject}</span>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
