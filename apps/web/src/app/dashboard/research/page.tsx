'use client';

import { useState } from 'react';
import { Search, Filter, Gavel, Star } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';

interface Judgment {
  id: string;
  title: string;
  citation: string;
  court: string;
  year: number;
  subject: string;
  summary: string;
  isLandmark: boolean;
}

export default function ResearchPage() {
  const [query, setQuery] = useState('');
  const [judgments, setJudgments] = useState<Judgment[]>([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await api<{ data: Judgment[] }>(`/legal/judgments?q=${encodeURIComponent(query)}`);
      setJudgments(result.data);
    } catch {
      setJudgments([]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Legal Research</h1>
        <p className="text-muted-foreground text-sm">Search judgments, legislation, and case law</p>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by keywords, citation, subject..."
            className="pl-10"
          />
        </div>
        <Button type="button" variant="outline"><Filter className="h-4 w-4" /></Button>
        <Button type="submit" variant="gradient" disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </Button>
      </form>

      <div className="space-y-4">
        {judgments.length === 0 && !loading && (
          <Card className="glass-card border-0 p-8 text-center">
            <Gavel className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-muted-foreground">Search for judgments to get started</p>
          </Card>
        )}
        {judgments.map((j) => (
          <Card key={j.id} className="glass-card border-0 hover:shadow-lg transition-shadow cursor-pointer">
            <CardContent className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-medium text-primary">{j.court} · {j.year}</span>
                    {j.isLandmark && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-accent/20 text-accent flex items-center gap-1">
                        <Star className="h-3 w-3" /> Landmark
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold mb-1">{j.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{j.citation}</p>
                  {j.summary && <p className="text-sm leading-relaxed">{j.summary}</p>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
