'use client';

import { useEffect, useState } from 'react';
import { Scale, Shield, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { api } from '@/lib/api';

interface Article {
  id: string;
  articleNumber: string;
  title: string;
  content: string;
  part: string;
  isFundamentalRight: boolean;
  isFundamentalDuty: boolean;
  isDirectivePrinciple: boolean;
}

export default function ConstitutionPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [selected, setSelected] = useState<Article | null>(null);
  const [filter, setFilter] = useState<'all' | 'rights' | 'duties'>('all');

  useEffect(() => {
    const params = filter === 'rights' ? '?fundamentalRights=true' : '';
    api<{ data: Article[] }>(`/legal/constitution${params}`)
      .then((res) => setArticles(res.data))
      .catch(() => {});
  }, [filter]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Scale className="h-6 w-6 text-primary" />
          Constitution Explorer
        </h1>
        <p className="text-muted-foreground text-sm">Explore the Constitution of India</p>
      </div>

      <div className="flex gap-2">
        {[
          { key: 'all' as const, label: 'All Articles', icon: BookOpen },
          { key: 'rights' as const, label: 'Fundamental Rights', icon: Shield },
        ].map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              filter === f.key ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground hover:bg-muted/80'
            }`}
          >
            <f.icon className="h-4 w-4" />
            {f.label}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2 max-h-[600px] overflow-y-auto">
          {articles.map((article) => (
            <Card
              key={article.id}
              className={`border-0 cursor-pointer transition-all hover:shadow-md ${
                selected?.id === article.id ? 'ring-2 ring-primary' : ''
              }`}
              onClick={() => setSelected(article)}
            >
              <CardContent className="p-4">
                <div className="text-lg font-bold text-primary">Art. {article.articleNumber}</div>
                <div className="text-sm font-medium">{article.title}</div>
                {article.isFundamentalRight && (
                  <span className="text-xs text-secondary mt-1 inline-block">Fundamental Right</span>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="lg:col-span-2">
          {selected ? (
            <Card className="glass-card border-0">
              <CardContent className="p-6">
                <div className="text-sm text-primary font-medium mb-1">Article {selected.articleNumber} · Part {selected.part}</div>
                <h2 className="text-2xl font-bold mb-4">{selected.title}</h2>
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{selected.content}</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass-card border-0 p-12 text-center">
              <Scale className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Select an article to view its content</p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
