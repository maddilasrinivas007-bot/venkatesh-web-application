'use client';

import { useState } from 'react';
import { FileText, Download, Sparkles } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { DOCUMENT_TEMPLATES } from '@nyayaai/shared';
import { api, getStoredToken } from '@/lib/api';

export default function DocumentsPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [details, setDetails] = useState<Record<string, string>>({});
  const [generated, setGenerated] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleGenerate() {
    if (!selectedType) return;
    setLoading(true);
    try {
      const token = getStoredToken();
      const result = await api<{ data: { content: string } }>('/ai/generate-document', {
        method: 'POST',
        token: token || undefined,
        body: JSON.stringify({ type: selectedType, details }),
      });
      setGenerated(result.data.content);
    } catch {
      setGenerated('Document generation failed. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Document Generator</h1>
        <p className="text-muted-foreground text-sm">AI-powered legal document templates for India</p>
      </div>

      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {DOCUMENT_TEMPLATES.map((doc) => (
          <Card
            key={doc.type}
            className={`glass-card border-0 cursor-pointer transition-all hover:shadow-lg ${
              selectedType === doc.type ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => { setSelectedType(doc.type); setGenerated(null); }}
          >
            <CardContent className="p-4 text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <div className="text-sm font-medium">{doc.label}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {selectedType && (
        <Card className="glass-card border-0">
          <CardHeader>
            <CardTitle className="text-lg">
              Generate {DOCUMENT_TEMPLATES.find((d) => d.type === selectedType)?.label}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              {['partyName', 'oppositeParty', 'subject', 'date', 'address', 'details'].map((field) => (
                <div key={field}>
                  <label className="text-sm font-medium mb-1 block capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
                  <Input
                    value={details[field] || ''}
                    onChange={(e) => setDetails((prev) => ({ ...prev, [field]: e.target.value }))}
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
            </div>
            <Button variant="gradient" onClick={handleGenerate} disabled={loading} className="gap-2">
              <Sparkles className="h-4 w-4" />
              {loading ? 'Generating...' : 'Generate Document'}
            </Button>

            {generated && (
              <div className="mt-4 p-4 rounded-xl bg-muted/50">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm font-medium">Generated Document</span>
                  <Button variant="outline" size="sm" className="gap-1">
                    <Download className="h-3 w-3" /> Export
                  </Button>
                </div>
                <pre className="text-sm whitespace-pre-wrap font-sans leading-relaxed">{generated}</pre>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
