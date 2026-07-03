'use client';

import { useEffect, useState } from 'react';
import { Activity } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { api, getStoredToken } from '@/lib/api';

interface AuditLog {
  id: string;
  action: string;
  resource: string;
  createdAt: string;
  user: { email: string; profile: { firstName: string; lastName: string } | null } | null;
}

export default function AdminAuditPage() {
  const [logs, setLogs] = useState<AuditLog[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    api<{ data: AuditLog[] }>('/admin/audit-logs', { token: token || undefined })
      .then((res) => setLogs(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Activity className="h-6 w-6" />Audit Logs</h1>
        <p className="text-muted-foreground text-sm">System activity and security events</p>
      </div>

      {logs.length === 0 ? (
        <Card className="glass-card border-0 p-12 text-center">
          <Activity className="h-10 w-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No audit logs yet</p>
        </Card>
      ) : (
        <div className="space-y-2">
          {logs.map((log) => (
            <Card key={log.id} className="glass-card border-0">
              <CardContent className="p-4 flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{log.action}</div>
                  <div className="text-xs text-muted-foreground">
                    {log.user?.email || 'System'} · {log.resource}
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {new Date(log.createdAt).toLocaleString('en-IN')}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
