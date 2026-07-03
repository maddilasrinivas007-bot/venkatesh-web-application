'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Scale, LayoutDashboard, Users, Calendar, FileText, Brain,
  BarChart3, Settings, LogOut, Bell, Menu, X, Shield, Gavel,
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/theme-toggle';
import { Button } from '@/components/ui/button';
import { clearTokens } from '@/lib/api';

const navItems = [
  { href: '/dashboard/advocate', label: 'Overview', icon: LayoutDashboard },
  { href: '/dashboard/advocate/clients', label: 'Clients', icon: Users },
  { href: '/dashboard/advocate/cases', label: 'Cases', icon: Gavel },
  { href: '/dashboard/advocate/calendar', label: 'Calendar', icon: Calendar },
  { href: '/dashboard/advocate/documents', label: 'Documents', icon: FileText },
  { href: '/dashboard/advocate/ai', label: 'AI Drafting', icon: Brain },
  { href: '/dashboard/advocate/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/dashboard/advocate/settings', label: 'Settings', icon: Settings },
];

export function AdvocateLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-background">
      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <aside className={cn(
        'fixed lg:static inset-y-0 left-0 z-50 w-64 bg-sidebar text-sidebar-foreground border-r border-white/10 flex flex-col transition-transform lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <div className="flex items-center gap-2 p-4 border-b border-white/10">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-gold text-white">
            <Scale className="h-4 w-4" />
          </div>
          <div>
            <span className="font-bold text-sm text-white">Nyaya<span className="text-accent">AI</span></span>
            <div className="text-[10px] text-white/60">Advocate Workspace</div>
          </div>
          <button className="ml-auto lg:hidden text-white" onClick={() => setSidebarOpen(false)}><X className="h-5 w-5" /></button>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link key={item.href} href={item.href} onClick={() => setSidebarOpen(false)}
                className={cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
                  isActive ? 'bg-secondary text-white' : 'text-white/70 hover:bg-white/10 hover:text-white')}>
                <item.icon className="h-4 w-4" />{item.label}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-white/10">
          <button onClick={() => { clearTokens(); window.location.href = '/login'; }}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/70 hover:bg-destructive/20 hover:text-red-300 w-full">
            <LogOut className="h-4 w-4" />Sign Out
          </button>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0">
        <header className="h-14 border-b border-border flex items-center justify-between px-4 lg:px-6 glass sticky top-0 z-30">
          <button className="lg:hidden" onClick={() => setSidebarOpen(true)}><Menu className="h-5 w-5" /></button>
          <div className="flex-1" />
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon"><Bell className="h-5 w-5" /></Button>
            <ThemeToggle />
            <div className="h-8 w-8 rounded-full gradient-gold flex items-center justify-center text-white text-xs font-bold">A</div>
          </div>
        </header>
        <main className="flex-1 p-4 lg:p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
