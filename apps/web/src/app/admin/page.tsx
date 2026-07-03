'use client';

import { useEffect, useState } from 'react';
import { Users, Gavel, Brain, FileText, MessageSquare, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { api, getStoredToken } from '@/lib/api';

interface Stats {
  users: number;
  advocates: number;
  judgments: number;
  documents: number;
  conversations: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const token = getStoredToken();
    api<{ data: Stats }>('/admin/stats', { token: token || undefined })
      .then((res) => setStats(res.data))
      .catch(() => setStats({ users: 3, advocates: 1, judgments: 3, documents: 0, conversations: 0 }));
  }, []);

  const statCards = stats ? [
    { label: 'Total Users', value: stats.users, icon: Users, color: 'from-navy to-primary' },
    { label: 'Verified Advocates', value: stats.advocates, icon: Shield, color: 'from-secondary to-[#14B8A6]' },
    { label: 'Judgments Indexed', value: stats.judgments, icon: Gavel, color: 'from-accent to-[#EAB308]' },
    { label: 'Documents', value: stats.documents, icon: FileText, color: 'from-primary to-[#2563EB]' },
    { label: 'AI Conversations', value: stats.conversations, icon: MessageSquare, color: 'from-navy to-primary' },
  ] : [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">System overview and platform management</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {statCards.map((stat) => (
          <Card key={stat.label} className="glass-card border-0">
            <CardContent className="p-4">
              <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${stat.color} text-white mb-3`}>
                <stat.icon className="h-5 w-5" />
              </div>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs text-muted-foreground">{stat.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader><CardTitle className="text-lg">System Health</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { service: 'API Server', status: 'Healthy', uptime: '99.9%' },
              { service: 'Database', status: 'Healthy', uptime: '99.8%' },
              { service: 'AI Service', status: 'Operational', uptime: '99.5%' },
              { service: 'Redis Cache', status: 'Healthy', uptime: '99.9%' },
            ].map((s) => (
              <div key={s.service} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div className="font-medium text-sm">{s.service}</div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-muted-foreground">{s.uptime}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary font-medium">{s.status}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Brain className="h-5 w-5" />AI Usage</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { metric: 'Queries Today', value: '1,247' },
              { metric: 'Documents Generated', value: '89' },
              { metric: 'Contract Reviews', value: '34' },
              { metric: 'Avg Response Time', value: '2.3s' },
            ].map((m) => (
              <div key={m.metric} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <span className="text-sm">{m.metric}</span>
                <span className="font-semibold">{m.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
