'use client';

import { Users, Gavel, Calendar, IndianRupee, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function AdvocateDashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Advocate Dashboard</h1>
        <p className="text-muted-foreground mt-1">Manage your practice, clients, and cases</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Active Clients', value: '24', icon: Users, color: 'text-primary' },
          { label: 'Open Cases', value: '18', icon: Gavel, color: 'text-secondary' },
          { label: 'Appointments Today', value: '3', icon: Calendar, color: 'text-accent' },
          { label: 'Revenue (Month)', value: '₹1.2L', icon: IndianRupee, color: 'text-primary' },
        ].map((stat) => (
          <Card key={stat.label} className="glass-card border-0">
            <CardContent className="p-4 flex items-center gap-3">
              <stat.icon className={`h-8 w-8 ${stat.color}`} />
              <div>
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className="text-xs text-muted-foreground">{stat.label}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card className="glass-card border-0">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><Calendar className="h-5 w-5" />Today&apos;s Schedule</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { time: '10:00 AM', client: 'Priya Verma', type: 'Video Consultation' },
              { time: '2:00 PM', client: 'Amit Kumar', type: 'Case Review' },
              { time: '4:30 PM', client: 'Sunita Devi', type: 'Document Signing' },
            ].map((apt) => (
              <div key={apt.time} className="flex items-center justify-between p-3 rounded-xl bg-muted/50">
                <div>
                  <div className="font-medium text-sm">{apt.client}</div>
                  <div className="text-xs text-muted-foreground">{apt.type}</div>
                </div>
                <div className="text-sm font-medium text-secondary">{apt.time}</div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="glass-card border-0">
          <CardHeader><CardTitle className="text-lg flex items-center gap-2"><TrendingUp className="h-5 w-5" />Quick Actions</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-2 gap-3">
            <Link href="/dashboard/advocate/ai"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">AI Drafting</Button></Link>
            <Link href="/dashboard/advocate/cases"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">Manage Cases</Button></Link>
            <Link href="/dashboard/advocate/clients"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">View Clients</Button></Link>
            <Link href="/dashboard/advocate/analytics"><Button variant="outline" className="w-full h-auto py-4 flex-col gap-1">Analytics</Button></Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
