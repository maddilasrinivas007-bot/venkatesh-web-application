'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Quote } from 'lucide-react';

const faqs = [
  {
    q: 'Is NyayaAI a substitute for a lawyer?',
    a: 'No. NyayaAI provides legal information and research assistance only. It does not replace advice from a qualified advocate. Always consult a licensed legal professional for your specific situation.',
  },
  {
    q: 'How accurate is the AI legal assistant?',
    a: 'Our AI is trained on Indian legal databases including the Constitution, major statutes, and landmark judgments. It provides citations and references, but accuracy may vary. We recommend verifying critical information with an advocate.',
  },
  {
    q: 'Can I generate legally valid documents?',
    a: 'Yes, our document generator creates structured legal templates based on Indian law. However, all generated documents should be reviewed by a qualified advocate before use in legal proceedings.',
  },
  {
    q: 'How are advocates verified on the platform?',
    a: 'All advocates undergo Bar Council verification, credential checks, and background review by our admin team before being listed on the marketplace.',
  },
  {
    q: 'What languages does NyayaAI support?',
    a: 'NyayaAI supports English, Hindi, and 10+ Indian regional languages including Tamil, Telugu, Kannada, Malayalam, Marathi, Gujarati, Bengali, Punjabi, Odia, and Urdu.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use enterprise-grade encryption, secure cloud infrastructure, and comply with Indian data protection standards. Your legal conversations and documents are private and never shared without consent.',
  },
];

const testimonials = [
  {
    name: 'Ananya Patel',
    role: 'Small Business Owner, Ahmedabad',
    text: 'NyayaAI helped me understand consumer protection laws when a vendor defaulted. The AI explained my rights clearly with proper citations.',
    rating: 5,
  },
  {
    name: 'Rahul Mehta',
    role: 'Law Student, NLSIU',
    text: 'The judgment research tool is incredible. AI summaries save hours of reading, and the citation generator is a game-changer for my moot court prep.',
    rating: 5,
  },
  {
    name: 'Sunita Devi',
    role: 'Homemaker, Patna',
    text: 'I received a legal notice and was terrified. NyayaAI explained what it meant and connected me with a verified advocate who helped me respond properly.',
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <h2 className="font-display text-4xl font-bold text-center mb-16">
          Success <span className="gradient-text">Stories</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-card rounded-2xl p-6"
            >
              <Quote className="h-8 w-8 text-primary/30 mb-4" />
              <p className="text-sm leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
              <div>
                <div className="font-semibold text-sm">{t.name}</div>
                <div className="text-xs text-muted-foreground">{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h2 className="font-display text-4xl font-bold text-center mb-16">
          Frequently Asked <span className="gradient-text">Questions</span>
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="glass-card rounded-xl overflow-hidden">
              <button
                className="w-full flex items-center justify-between p-5 text-left font-medium"
                onClick={() => setOpen(open === i ? null : i)}
              >
                {faq.q}
                <ChevronDown className={`h-5 w-5 shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-sm text-muted-foreground leading-relaxed">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CTASection() {
  return (
    <section id="pricing" className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden"
        >
          <div className="absolute inset-0 bg-hero-judiciary" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggIGQ9Ik0zNiAzNGg0djJoLTR6bTAgNGg0djJoLTR6bTAtNGg0djJoLTR6bTAtNGg0djJoLTR6bTAtNGg0djJoLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative px-8 py-16 md:py-20 text-center text-white">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Ready to Access Legal Intelligence?
            </h2>
            <p className="text-lg opacity-90 max-w-2xl mx-auto mb-8">
              Join thousands of citizens, advocates, and businesses using NyayaAI to navigate Indian law with confidence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="/register" className="inline-flex h-13 items-center px-8 rounded-xl gradient-gold text-white font-semibold shadow-gold hover:opacity-95 transition-opacity">
                Start Free — No Credit Card
              </a>
              <a href="/dashboard/ai" className="inline-flex h-13 items-center px-8 rounded-xl border-2 border-white/30 font-semibold hover:bg-white/10 transition-colors">
                Try AI Assistant
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
