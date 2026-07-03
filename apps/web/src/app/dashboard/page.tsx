'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Brain, Search, FileText, Users, Calendar, ArrowRight,
  Scale, BookOpen, TrendingUp,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const quickActions = [
  { href: '/dashboard/ai', label: 'Ask AI', icon: Brain, color: 'from-navy to-primary' },
  { href: '/dashboard/research', label: 'Research', icon: Search, color: 'from-primary to-[#2563EB]' },
  { href: '/dashboard/documents', label: 'Documents', icon: FileText, color: 'from-accent to-[#EAB308]' },
  { href: '/dashboard/advocates', label: 'Find Advocate', icon: Users, color: 'from-navy to-primary' },
];

const recentActivity = [
  { title: 'AI Query: Cheque bounce procedure', time: '2 hours ago', type: 'ai' },
  { title: 'Saved: Kesavananda Bharati judgment', time: '1 day ago', type: 'research' },
  { title: 'Draft: Legal Notice to tenant', time: '3 days ago', type: 'document' },
];

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Welcome to NyayaAI</h1>
        <p className="text-muted-foreground mt-1">Your personalized legal intelligence workspace</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Cases', value: '2', icon: Scale },
          { label: 'AI Conversations', value: '12', icon: Brain },
          { label: 'Saved Research', value: '8', icon: BookOpen },
          { label: 'Appointments', value: '1', icon: Calendar },
        ].map((stat) => (
          <Card key={stat.label} className="glass-card border-0">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions.map((action, i) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Link href={action.href}>
              <Card className="glass-card border-0 hover:shadow-lg transition-all cursor-pointer group">
                <CardContent className="p-6 text-center">
                  <div className={`inline-flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${action.color} text-white mb-3 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-6 w-6" />
                  </div>
                  <div className="font-medium">{action.label}</div>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((item) => (
              <div key={item.title} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <div className="text-sm font-medium">{item.title}</div>
                  <div className="text-xs text-muted-foreground">{item.time}</div>
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">Legal Disclaimer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              NyayaAI provides legal information for educational purposes only. It does not constitute
              legal advice and should not be relied upon as a substitute for consultation with a
              qualified advocate. Always verify critical information with a licensed legal professional.
            </p>
            <Link href="/dashboard/ai">
              <Button variant="gradient" className="mt-4 gap-2">
                <Brain className="h-4 w-4" />
                Start AI Consultation
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
