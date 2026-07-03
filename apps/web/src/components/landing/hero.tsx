'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Search, Sparkles, ArrowRight, Mic, FileText, Shield,
  Gavel, BookOpen, Users, Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LANDING_STATS } from '@nyayaai/shared';
import { api } from '@/lib/api';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

const floatingIcons = [
  { Icon: Gavel, delay: 0, x: '10%', y: '20%' },
  { Icon: BookOpen, delay: 1, x: '85%', y: '15%' },
  { Icon: Shield, delay: 2, x: '75%', y: '70%' },
  { Icon: FileText, delay: 0.5, x: '15%', y: '75%' },
];

const suggestions = [
  'I received a legal notice',
  'My employer terminated me',
  'Property dispute with neighbor',
  'Cheque bounce case',
  'Landlord won\'t return deposit',
];

export function HeroSection() {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    try {
      const result = await api<{ data: { answer: string } }>('/ai/public-chat', {
        method: 'POST',
        body: JSON.stringify({ query }),
      });
      setResponse(result.data.answer);
    } catch {
      setResponse('Unable to connect to AI service. Please try again or sign up for full access.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-secondary/5" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      {floatingIcons.map(({ Icon, delay, x, y }, i) => (
        <motion.div
          key={i}
          className="absolute hidden lg:flex h-12 w-12 items-center justify-center rounded-2xl glass-card text-primary/40"
          style={{ left: x, top: y }}
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 4, delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <Icon className="h-6 w-6" />
        </motion.div>
      ))}

      <div className="container relative mx-auto px-4 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-accent" />
              <span>India&apos;s #1 AI-Powered Legal Platform</span>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="mb-8 flex justify-center"
            >
              <OwnerHighlight variant="banner" />
            </motion.div>

            <h1 className="font-display text-5xl md:text-7xl font-bold tracking-tight mb-6">
              Trusted Legal
              <br />
              <span className="gradient-text">Intelligence</span>
              <br />
              for Every Citizen
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              Understand Indian laws, research judgments, generate legal documents,
              and connect with verified advocates — powered by advanced AI with
              constitutional citations.
            </p>
          </motion.div>

          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            onSubmit={handleSearch}
            className="max-w-2xl mx-auto mb-6"
          >
            <div className="relative flex items-center gap-2 p-2 rounded-2xl glass-card shadow-2xl shadow-primary/10">
              <Search className="absolute left-6 h-5 w-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Ask any legal question... e.g., 'My cheque has bounced'"
                className="flex-1 border-0 bg-transparent pl-12 h-14 text-base shadow-none focus-visible:ring-0"
              />
              <Button type="button" variant="ghost" size="icon" className="shrink-0">
                <Mic className="h-5 w-5" />
              </Button>
              <Button type="submit" variant="gradient" size="lg" disabled={loading} className="shrink-0">
                {loading ? 'Analyzing...' : 'Ask AI'}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </motion.form>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => setQuery(s)}
                className="text-xs px-3 py-1.5 rounded-full border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors"
              >
                {s}
              </button>
            ))}
          </motion.div>

          {response && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-2xl mx-auto mb-12 p-6 rounded-2xl glass-card text-left"
            >
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">NyayaAI Response</span>
              </div>
              <p className="text-sm leading-relaxed">{response}</p>
              <p className="text-xs text-muted-foreground mt-4 italic">
                This is informational only. Consult a qualified advocate for legal advice.
              </p>
            </motion.div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {LANDING_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                <div className="text-xs md:text-sm text-muted-foreground mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
          >
            <Link href="/register">
              <Button variant="gradient" size="lg" className="gap-2">
                <Zap className="h-5 w-5" />
                Start Free Trial
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button variant="outline" size="lg" className="gap-2">
                <Users className="h-5 w-5" />
                Explore Platform
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
