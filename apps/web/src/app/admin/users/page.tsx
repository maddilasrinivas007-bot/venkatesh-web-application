'use client';

import { useEffect, useState } from 'react';
import { Users, Search } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { api, getStoredToken } from '@/lib/api';

interface UserRecord {
  id: string;
  email: string;
  role: string;
  status: string;
  createdAt: string;
  profile: { firstName: string; lastName: string } | null;
}

const roleColors: Record<string, string> = {
  CITIZEN: 'bg-primary/10 text-primary',
  ADVOCATE: 'bg-secondary/10 text-secondary',
  ADMIN: 'bg-accent/20 text-accent-foreground',
  SUPER_ADMIN: 'bg-destructive/10 text-destructive',
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<UserRecord[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const token = getStoredToken();
    api<{ data: UserRecord[] }>('/admin/users', { token: token || undefined })
      .then((res) => setUsers(res.data))
      .catch(() => {});
  }, []);

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.profile?.firstName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><Users className="h-6 w-6" />User Management</h1>
        <p className="text-muted-foreground text-sm">{users.length} registered users</p>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search users..." className="pl-10" />
      </div>

      <div className="space-y-2">
        {filtered.map((user) => (
          <Card key={user.id} className="glass-card border-0">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-sm font-bold">
                  {user.profile?.firstName?.[0] || user.email[0].toUpperCase()}
                </div>
                <div>
                  <div className="font-medium text-sm">
                    {user.profile ? `${user.profile.firstName} ${user.profile.lastName}` : user.email}
                  </div>
                  <div className="text-xs text-muted-foreground">{user.email}</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${roleColors[user.role] || ''}`}>{user.role}</span>
                <span className="text-xs text-muted-foreground">{user.status}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
