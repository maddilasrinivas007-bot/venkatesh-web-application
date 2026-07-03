'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';

const defaultNotifications = [
  { title: 'Bharatiya Nyaya Sanhita comes into force', ministry: 'Ministry of Home Affairs', publishedAt: '2024-07-01' },
  { title: 'New Consumer Protection Rules notified', ministry: 'Ministry of Consumer Affairs', publishedAt: '2024-06-15' },
  { title: 'Digital Personal Data Protection Act guidelines', ministry: 'Ministry of Electronics & IT', publishedAt: '2024-05-20' },
];

const defaultBlogPosts = [
  { title: 'Understanding the Bharatiya Nyaya Sanhita: A Complete Guide', excerpt: 'Everything you need to know about India\'s new criminal code replacing the IPC.', author: 'NyayaAI Legal Team', slug: 'understanding-bharatiya-nyaya-sanhita', tags: ['Criminal Law', 'BNS'] },
  { title: 'Your Rights When Facing Employment Termination', excerpt: 'A practical guide to Indian labour laws and wrongful termination remedies.', author: 'Adv. Rajesh Sharma', slug: 'employment-termination-rights', tags: ['Labour Law'] },
  { title: 'How to Respond to a Legal Notice: Step-by-Step', excerpt: 'Critical steps to protect your interests when you receive a legal notice.', author: 'NyayaAI Legal Team', slug: 'respond-to-legal-notice', tags: ['Civil Law'] },
];

export function GovernmentNotificationsSection() {
  const [notifications] = useState(defaultNotifications);

  return (
    <section className="py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center gap-3 mb-12">
          <div className="h-10 w-10 rounded-xl bg-accent/20 flex items-center justify-center">
            <Bell className="h-5 w-5 text-accent" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">Government Notifications</h2>
            <p className="text-muted-foreground text-sm">Latest gazette notifications and legal updates</p>
          </div>
        </div>
        <div className="grid md:grid-cols-3 gap-4">
          {notifications.map((n, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-0 h-full hover:shadow-lg transition-shadow">
                <CardContent className="p-5">
                  <div className="text-xs text-accent font-medium mb-2">{n.ministry}</div>
                  <h3 className="font-semibold text-sm mb-2">{n.title}</h3>
                  <div className="text-xs text-muted-foreground">
                    {new Date(n.publishedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function BlogSection() {
  const [posts] = useState(defaultBlogPosts);

  return (
    <section className="py-24">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="font-display text-4xl font-bold mb-4">Legal <span className="gradient-text">Blog</span></h2>
          <p className="text-lg text-muted-foreground">Expert insights on Indian law, explained simply</p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <motion.div key={post.slug} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <Card className="glass-card border-0 h-full hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {post.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">{tag}</span>
                    ))}
                  </div>
                  <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{post.excerpt}</p>
                  <div className="text-xs text-muted-foreground">By {post.author}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      await api('/content/newsletter', { method: 'POST', body: JSON.stringify({ email }) });
      setStatus('success');
      setEmail('');
    } catch {
      setStatus('success');
      setEmail('');
    }
  }

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="glass-card rounded-3xl p-8 md:p-12 text-center max-w-2xl mx-auto">
          <Mail className="h-10 w-10 text-primary mx-auto mb-4" />
          <h2 className="font-display text-3xl font-bold mb-2">Stay Informed</h2>
          <p className="text-muted-foreground mb-6">
            Get weekly legal updates, judgment summaries, and platform news delivered to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex gap-2 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              className="flex-1"
            />
            <Button type="submit" variant="gradient" disabled={status === 'loading'} className="gap-1 shrink-0">
              {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
              Subscribe
            </Button>
          </form>
          {status === 'success' && (
            <p className="text-sm text-secondary mt-3">Thank you for subscribing!</p>
          )}
        </div>
      </div>
    </section>
  );
}
