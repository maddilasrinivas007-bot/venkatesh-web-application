'use client';

import { motion } from 'framer-motion';
import { FileText, Sparkles, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DOCUMENT_TEMPLATES } from '@nyayaai/shared';

export function DocumentGeneratorSection() {
  return (
    <section className="py-24 bg-secondary/5">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-secondary/10 px-4 py-2 text-sm font-medium text-secondary mb-6">
              <Sparkles className="h-4 w-4" />
              AI Document Automation
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Generate Legal Documents <span className="gradient-text">in Minutes</span>
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Create legally structured templates for notices, agreements, affidavits, and court petitions.
              AI-powered drafting with export to PDF and Word.
            </p>
            <Link href="/dashboard/documents">
              <Button variant="gradient" size="lg" className="gap-2">
                <FileText className="h-5 w-5" />
                Start Generating
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {DOCUMENT_TEMPLATES.slice(0, 9).map((doc) => (
              <Card key={doc.type} className="glass-card border-0 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-4 text-center">
                  <FileText className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <div className="text-xs font-medium">{doc.label}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

const highCourtUpdates = [
  { court: 'Delhi High Court', case: 'Property dispute — adverse possession claim dismissed', date: '2026-06-28' },
  { court: 'Bombay High Court', case: 'Employment termination — reinstatement ordered with back wages', date: '2026-06-25' },
  { court: 'Madras High Court', case: 'Consumer complaint — builder directed to refund with interest', date: '2026-06-22' },
  { court: 'Karnataka High Court', case: 'Cheque bounce — conviction upheld under Section 138 NI Act', date: '2026-06-20' },
];

export function HighCourtSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">
            High Court <span className="gradient-text">Updates</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Latest judgments and orders from High Courts across India
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
          {highCourtUpdates.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-xl p-5 hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="text-xs font-medium text-primary mb-1">{item.court}</div>
              <div className="font-medium text-sm mb-2">{item.case}</div>
              <div className="text-xs text-muted-foreground">{new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
