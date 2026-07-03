'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Send, Sparkles, Mic, FileUp, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { api, getStoredToken } from '@/lib/api';
import { LEGAL_DISCLAIMER } from '@nyayaai/shared';
import type { AILegalResponse } from '@nyayaai/shared';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  citations?: {
    constitutional?: Array<{ title: string; reference: string }>;
    statutory?: Array<{ title: string; reference: string }>;
    precedents?: Array<{ title: string; reference: string }>;
  };
  metadata?: {
    practicalGuidance?: string[];
    requiredDocuments?: string[];
    potentialRisks?: string[];
  };
}

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [conversationId, setConversationId] = useState<string | undefined>();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const token = getStoredToken();
      const result = await api<{
        data: {
          conversationId: string;
          response: AILegalResponse;
          messageId: string;
        };
      }>('/ai/chat', {
        method: 'POST',
        token: token || undefined,
        body: JSON.stringify({ query: userMessage, conversationId }),
      });

      setConversationId(result.data.conversationId);
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: result.data.response.answer,
          citations: {
            constitutional: result.data.response.constitutionalProvisions,
            statutory: result.data.response.statutoryProvisions,
            precedents: result.data.response.judicialPrecedents,
          },
          metadata: {
            practicalGuidance: result.data.response.practicalGuidance,
            requiredDocuments: result.data.response.requiredDocuments,
            potentialRisks: result.data.response.potentialRisks,
          },
        },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'I apologize, but I\'m unable to process your request right now. Please ensure you\'re logged in, or try again later.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)]">
      <div className="mb-4">
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Sparkles className="h-6 w-6 text-primary" />
          AI Legal Assistant
        </h1>
        <p className="text-sm text-muted-foreground">Ask any question about Indian law</p>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 mb-4">
        {messages.length === 0 && (
          <div className="text-center py-16">
            <Sparkles className="h-12 w-12 text-primary/30 mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">How can I help you today?</h2>
            <p className="text-muted-foreground text-sm max-w-md mx-auto mb-6">
              Ask about legal notices, employment issues, property disputes, cheque bounce, and more.
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {['I received a legal notice', 'Cheque bounce case', 'Employment termination'].map((q) => (
                <button
                  key={q}
                  onClick={() => setInput(q)}
                  className="text-xs px-3 py-2 rounded-full border hover:border-primary/50 hover:bg-primary/5 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] p-4 border-0 ${
              msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'glass-card'
            }`}>
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>

              {msg.citations && (
                <div className="mt-4 space-y-3 border-t border-border/50 pt-3">
                  {msg.citations.constitutional && msg.citations.constitutional.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-primary mb-1">Constitutional Provisions</div>
                      {msg.citations.constitutional.map((c, j) => (
                        <div key={j} className="text-xs text-muted-foreground">{c.reference}: {c.title}</div>
                      ))}
                    </div>
                  )}
                  {msg.citations.statutory && msg.citations.statutory.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-secondary mb-1">Statutory Provisions</div>
                      {msg.citations.statutory.map((c, j) => (
                        <div key={j} className="text-xs text-muted-foreground">{c.reference}: {c.title}</div>
                      ))}
                    </div>
                  )}
                  {msg.citations.precedents && msg.citations.precedents.length > 0 && (
                    <div>
                      <div className="text-xs font-semibold text-accent mb-1">Case Law</div>
                      {msg.citations.precedents.map((c, j) => (
                        <div key={j} className="text-xs text-muted-foreground">{c.reference}: {c.title}</div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {msg.metadata?.practicalGuidance && (
                <div className="mt-3 border-t border-border/50 pt-3">
                  <div className="text-xs font-semibold mb-1">Practical Steps</div>
                  <ol className="text-xs text-muted-foreground list-decimal list-inside space-y-0.5">
                    {msg.metadata.practicalGuidance.map((step, j) => (
                      <li key={j}>{step}</li>
                    ))}
                  </ol>
                </div>
              )}
            </Card>
          </motion.div>
        ))}

        {loading && (
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Analyzing your legal query...
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSend} className="flex items-center gap-2 p-2 rounded-2xl glass-card">
        <Button type="button" variant="ghost" size="icon"><FileUp className="h-5 w-5" /></Button>
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask a legal question..."
          className="flex-1 border-0 bg-transparent shadow-none focus-visible:ring-0"
          disabled={loading}
        />
        <Button type="button" variant="ghost" size="icon"><Mic className="h-5 w-5" /></Button>
        <Button type="submit" variant="gradient" size="icon" disabled={loading || !input.trim()}>
          <Send className="h-4 w-4" />
        </Button>
      </form>

      <p className="text-xs text-muted-foreground text-center mt-2 italic">{LEGAL_DISCLAIMER}</p>
    </div>
  );
}
