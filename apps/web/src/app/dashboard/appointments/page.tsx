'use client';

import { useEffect, useState } from 'react';
import { Calendar, Video, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { api, getStoredToken } from '@/lib/api';

interface Appointment {
  id: string;
  scheduledAt: string;
  status: string;
  type: string;
  duration: number;
  advocate: { profile: { firstName: string; lastName: string } | null };
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    const token = getStoredToken();
    api<{ data: Appointment[] }>('/appointments', { token: token || undefined })
      .then((res) => setAppointments(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Appointments</h1>
        <p className="text-muted-foreground text-sm">Manage your legal consultations</p>
      </div>

      {appointments.length === 0 ? (
        <Card className="glass-card border-0 p-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No appointments scheduled</p>
          <p className="text-sm text-muted-foreground mt-2">Book a consultation with a verified advocate</p>
        </Card>
      ) : (
        <div className="space-y-3">
          {appointments.map((apt) => (
            <Card key={apt.id} className="glass-card border-0">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Video className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      Adv. {apt.advocate.profile?.firstName} {apt.advocate.profile?.lastName}
                    </div>
                    <div className="text-sm text-muted-foreground flex items-center gap-3 mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(apt.scheduledAt).toLocaleDateString('en-IN')}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {apt.duration} min
                      </span>
                    </div>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-secondary/10 text-secondary font-medium">{apt.status}</span>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
