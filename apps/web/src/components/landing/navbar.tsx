'use client';

import Link from 'next/link';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Scale } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

const navLinks = [
  { href: '#features', label: 'Features' },
  { href: '#research', label: 'Research' },
  { href: '#advocates', label: 'Advocates' },
  { href: '#constitution', label: 'Constitution' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
  { href: '#faq', label: 'FAQ' },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-navy border-b border-white/10 shadow-judiciary"
    >
      <nav className="container mx-auto flex h-16 items-center justify-between px-4 lg:px-8">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl gradient-gold text-white shadow-gold">
            <Scale className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold text-white">
            Nyaya<span className="text-accent">AI</span>
          </span>
        </Link>

        <div className="hidden xl:flex items-center">
          <OwnerHighlight variant="compact" className="bg-white/10 border-white/20 text-white" />
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-white/75 hover:text-accent transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle className="text-white hover:bg-white/10" />
          <Link href="/login" className="hidden sm:block">
            <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 hover:text-white">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button variant="premium" size="sm">Get Started</Button>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/10"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-navy border-t border-white/10 overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="py-2 text-sm font-medium text-white/80 hover:text-accent"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" className="w-full border-white/30 text-white">Sign In</Button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
