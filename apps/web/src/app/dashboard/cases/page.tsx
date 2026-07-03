'use client';

import { useEffect, useState } from 'react';
import { Plus, Scale, Clock, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { api, getStoredToken } from '@/lib/api';

interface CaseRecord {
  id: string;
  caseNumber: string;
  title: string;
  status: string;
  priority: string;
  category: string | null;
  courtName: string | null;
  nextHearing: string | null;
  updatedAt: string;
  _count: { documents: number; timeline: number };
}

const statusColors: Record<string, string> = {
  ACTIVE: 'bg-secondary/10 text-secondary',
  PENDING: 'bg-accent/20 text-accent-foreground',
  CLOSED: 'bg-muted text-muted-foreground',
  DRAFT: 'bg-primary/10 text-primary',
};

export default function CasesPage() {
  const [cases, setCases] = useState<CaseRecord[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', category: '', courtName: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadCases();
  }, []);

  async function loadCases() {
    try {
      const token = getStoredToken();
      const result = await api<{ data: CaseRecord[] }>('/cases', { token: token || undefined });
      setCases(result.data);
    } catch { /* empty */ }
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const token = getStoredToken();
      await api('/cases', {
        method: 'POST',
        token: token || undefined,
        body: JSON.stringify(form),
      });
      setShowForm(false);
      setForm({ title: '', description: '', category: '', courtName: '' });
      loadCases();
    } catch { /* empty */ }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Scale className="h-6 w-6 text-primary" />
            My Cases
          </h1>
          <p className="text-muted-foreground text-sm">Manage your legal cases and track progress</p>
        </div>
        <Button variant="gradient" onClick={() => setShowForm(!showForm)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Case
        </Button>
      </div>

      {showForm && (
        <Card className="glass-card border-0">
          <CardHeader><CardTitle className="text-lg">Create New Case</CardTitle></CardHeader>
          <CardContent>
            <form onSubmit={handleCreate} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Case Title</label>
                  <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Category</label>
                  <Input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder="e.g. Property Dispute" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Court</label>
                  <Input value={form.courtName} onChange={(e) => setForm({ ...form, courtName: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="text-sm font-medium mb-1 block">Description</label>
                  <Input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
                </div>
              </div>
              <Button type="submit" variant="gradient" disabled={loading}>
                {loading ? 'Creating...' : 'Create Case'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      {cases.length === 0 ? (
        <Card className="glass-card border-0 p-12 text-center">
          <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No cases yet. Create your first case to get started.</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {cases.map((c) => (
            <Card key={c.id} className="glass-card border-0 hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[c.status] || ''}`}>
                      {c.status}
                    </span>
                    <span className="text-xs text-muted-foreground">{c.caseNumber.slice(0, 8)}</span>
                  </div>
                  <h3 className="font-semibold">{c.title}</h3>
                  <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                    {c.category && <span>{c.category}</span>}
                    {c.courtName && <span>{c.courtName}</span>}
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {new Date(c.updatedAt).toLocaleDateString('en-IN')}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
