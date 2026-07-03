'use client';

import { useState } from 'react';
import { Shield, Upload, AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api, getStoredToken } from '@/lib/api';
import { LEGAL_DISCLAIMER } from '@nyayaai/shared';

interface ContractAnalysis {
  summary: string;
  clauses: Array<{ name: string; content: string; risk: 'low' | 'medium' | 'high' }>;
  risks: string[];
  recommendations: string[];
}

const riskColors = {
  low: 'bg-secondary/10 text-secondary',
  medium: 'bg-accent/20 text-accent-foreground',
  high: 'bg-destructive/10 text-destructive',
};

export default function ContractReviewPage() {
  const [text, setText] = useState('');
  const [analysis, setAnalysis] = useState<ContractAnalysis | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleAnalyze() {
    if (text.length < 100) return;
    setLoading(true);
    try {
      const token = getStoredToken();
      const result = await api<{ data: ContractAnalysis }>('/ai/review-contract', {
        method: 'POST',
        token: token || undefined,
        body: JSON.stringify({ text }),
      });
      setAnalysis(result.data);
    } catch { /* empty */ }
    finally { setLoading(false); }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          AI Contract Review
        </h1>
        <p className="text-muted-foreground text-sm">
          Upload or paste contract text for AI-powered clause extraction and risk analysis
        </p>
      </div>

      <Card className="glass-card border-0">
        <CardContent className="p-6 space-y-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Paste your contract text here for AI analysis..."
            className="w-full h-48 rounded-xl border border-input bg-background p-4 text-sm resize-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2" disabled>
              <Upload className="h-4 w-4" />
              Upload PDF
            </Button>
            <Button variant="gradient" onClick={handleAnalyze} disabled={loading || text.length < 100} className="gap-2">
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Shield className="h-4 w-4" />}
              {loading ? 'Analyzing...' : 'Analyze Contract'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Card className="glass-card border-0">
            <CardHeader><CardTitle className="text-lg">Summary</CardTitle></CardHeader>
            <CardContent><p className="text-sm leading-relaxed">{analysis.summary}</p></CardContent>
          </Card>

          <Card className="glass-card border-0">
            <CardHeader><CardTitle className="text-lg">Clause Analysis</CardTitle></CardHeader>
            <CardContent className="space-y-3">
              {analysis.clauses.map((clause, i) => (
                <div key={i} className="p-4 rounded-xl bg-muted/50">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-sm">{clause.name}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${riskColors[clause.risk]}`}>
                      {clause.risk} risk
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">{clause.content}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-4">
            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5 text-destructive" />
                  Risks Identified
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.risks.map((risk, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <AlertTriangle className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                      {risk}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="glass-card border-0">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-secondary" />
                  Recommendations
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {analysis.recommendations.map((rec, i) => (
                    <li key={i} className="text-sm flex items-start gap-2">
                      <CheckCircle className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
                      {rec}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          <p className="text-xs text-muted-foreground italic text-center">{LEGAL_DISCLAIMER}</p>
        </div>
      )}
    </div>
  );
}
