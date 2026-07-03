'use client';

import { useEffect, useState } from 'react';
import { Shield, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api, getStoredToken } from '@/lib/api';

export default function AdminAdvocatesPage() {
  const [advocates, setAdvocates] = useState<Array<{
    id: string;
    barCouncilNumber: string;
    verificationStatus: string;
    practiceAreas: string[];
    user: { profile: { firstName: string; lastName: string } | null };
  }>>([]);

  useEffect(() => {
    api<{ data: typeof advocates }>('/legal/advocates')
      .then((res) => setAdvocates(res.data))
      .catch(() => {});
  }, []);

  async function handleVerify(id: string, status: 'VERIFIED' | 'REJECTED') {
    const token = getStoredToken();
    try {
      await api(`/admin/advocates/${id}/verify`, {
        method: 'PATCH',
        token: token || undefined,
        body: JSON.stringify({ status }),
      });
    } catch { /* empty */ }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Shield className="h-6 w-6" />Advocate Verification</h1>
        <p className="text-muted-foreground text-sm">Review and verify advocate registrations</p>
      </div>

      {advocates.map((adv) => (
        <Card key={adv.id} className="glass-card border-0">
          <CardContent className="p-5 flex items-center justify-between">
            <div>
              <div className="font-semibold">
                Adv. {adv.user.profile?.firstName} {adv.user.profile?.lastName}
              </div>
              <div className="text-sm text-muted-foreground">Bar Council: {adv.barCouncilNumber}</div>
              <div className="flex gap-1.5 mt-2">
                {adv.practiceAreas.map((a) => (
                  <span key={a} className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary">{a}</span>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                adv.verificationStatus === 'VERIFIED' ? 'bg-secondary/10 text-secondary' : 'bg-accent/20 text-accent-foreground'
              }`}>{adv.verificationStatus}</span>
              {adv.verificationStatus === 'PENDING' && (
                <>
                  <Button size="sm" variant="outline" className="gap-1" onClick={() => handleVerify(adv.id, 'VERIFIED')}>
                    <CheckCircle className="h-3 w-3" />Verify
                  </Button>
                  <Button size="sm" variant="ghost" className="gap-1 text-destructive" onClick={() => handleVerify(adv.id, 'REJECTED')}>
                    <XCircle className="h-3 w-3" />Reject
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
