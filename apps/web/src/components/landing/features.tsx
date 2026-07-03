'use client';

import { motion } from 'framer-motion';
import {
  Brain, Search, FileText, Scale, Users, Shield,
  BookOpen, Gavel, Mic, FileSearch, Languages, Clock,
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { PRACTICE_AREAS } from '@nyayaai/shared';

const features = [
  {
    icon: Brain,
    title: 'AI Legal Assistant',
    description: 'ChatGPT-style assistant with constitutional citations, statutory references, and case law precedents.',
    color: 'from-blue-500 to-blue-600',
  },
  {
    icon: Search,
    title: 'Judicial Research',
    description: 'Search 1M+ Supreme Court and High Court judgments with advanced filters and AI summaries.',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    icon: FileText,
    title: 'Document Generator',
    description: 'Generate legal notices, agreements, affidavits, and court petitions with AI assistance.',
    color: 'from-amber-500 to-amber-600',
  },
  {
    icon: Users,
    title: 'Advocate Marketplace',
    description: 'Connect with verified advocates, book consultations, and get expert legal guidance.',
    color: 'from-purple-500 to-purple-600',
  },
  {
    icon: BookOpen,
    title: 'Constitution Explorer',
    description: 'Interactive exploration of the Constitution of India with articles, amendments, and rights.',
    color: 'from-rose-500 to-rose-600',
  },
  {
    icon: Shield,
    title: 'Contract Review',
    description: 'AI-powered contract analysis with clause extraction, risk assessment, and recommendations.',
    color: 'from-cyan-500 to-cyan-600',
  },
  {
    icon: Mic,
    title: 'Voice Assistant',
    description: 'Ask legal questions by voice with speech recognition and synthesis in Indian languages.',
    color: 'from-indigo-500 to-indigo-600',
  },
  {
    icon: FileSearch,
    title: 'PDF Chat & OCR',
    description: 'Upload legal documents, extract text via OCR, and chat with your documents using AI.',
    color: 'from-teal-500 to-teal-600',
  },
  {
    icon: Languages,
    title: 'Multi-Language',
    description: 'Legal guidance in English, Hindi, and 10+ Indian regional languages.',
    color: 'from-orange-500 to-orange-600',
  },
];

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Complete Legal <span className="gradient-text">Intelligence</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Everything you need to understand, research, and act on Indian law — in one powerful platform.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <Card className="h-full glass-card hover:shadow-2xl hover:shadow-primary/5 transition-all duration-300 group border-0">
                <CardHeader>
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${feature.color} text-white shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20"
        >
          <h3 className="text-2xl font-bold text-center mb-8">Practice Areas</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {PRACTICE_AREAS.map((area) => (
              <span
                key={area}
                className="px-4 py-2 rounded-full glass text-sm font-medium hover:bg-primary/10 transition-colors cursor-default"
              >
                {area}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function TrustedBySection() {
  const orgs = ['Supreme Court Bar Association', 'Delhi High Court Bar', 'NLSIU Bangalore', 'ILS Pune', 'Bar Council of India', 'Legal Aid Society'];
  return (
    <section className="py-16 border-y border-border/50">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground mb-8">Trusted by leading legal organizations</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60">
          {orgs.map((org) => (
            <div key={org} className="text-sm font-semibold tracking-wide">{org}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ConstitutionSection() {
  const articles = [
    { num: '14', title: 'Equality before Law', type: 'Fundamental Right' },
    { num: '19', title: 'Freedom of Speech', type: 'Fundamental Right' },
    { num: '21', title: 'Right to Life & Liberty', type: 'Fundamental Right' },
    { num: '32', title: 'Constitutional Remedies', type: 'Fundamental Right' },
    { num: '39A', title: 'Equal Justice & Free Legal Aid', type: 'Directive Principle' },
    { num: '51A', title: 'Fundamental Duties', type: 'Fundamental Duty' },
  ];

  return (
    <section id="constitution" className="py-24 bg-gradient-to-b from-primary/5 to-transparent">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary mb-6">
              <Scale className="h-4 w-4" />
              Constitution Explorer
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Explore the Constitution of India
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Navigate all 448 articles, 12 schedules, and 105 amendments. Understand your fundamental rights,
              duties, and directive principles with AI-powered explanations.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Gavel className="h-4 w-4 text-primary" />
                <span>448 Articles</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-secondary" />
                <span>105 Amendments</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            {articles.map((article) => (
              <Card key={article.num} className="glass-card border-0 hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-5">
                  <div className="text-3xl font-bold text-primary mb-2">Art. {article.num}</div>
                  <div className="font-medium mb-1">{article.title}</div>
                  <div className="text-xs text-muted-foreground">{article.type}</div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
