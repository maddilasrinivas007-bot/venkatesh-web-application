'use client';

import { Settings, Mail, Phone, MessageCircle, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CONTACT_INFO } from '@nyayaai/shared';
import { OwnerHighlight } from '@/components/landing/owner-highlight';

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Settings className="h-6 w-6" />
          Settings
        </h1>
      </div>
      <Card className="glass-card border-0 max-w-2xl">
        <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div><label className="text-sm font-medium mb-1 block">First Name</label><Input /></div>
            <div><label className="text-sm font-medium mb-1 block">Last Name</label><Input /></div>
          </div>
          <div><label className="text-sm font-medium mb-1 block">Email</label><Input type="email" /></div>
          <div><label className="text-sm font-medium mb-1 block">Phone</label><Input type="tel" /></div>
          <Button variant="gradient">Save Changes</Button>
        </CardContent>
      </Card>

      <OwnerHighlight variant="footer" className="max-w-2xl" />

      <Card className="glass-card border-0 max-w-2xl">
        <CardHeader><CardTitle>Support & Contact — {CONTACT_INFO.ownerDisplay}</CardTitle></CardHeader>
        <CardContent className="space-y-3 text-sm">
          <a href={`mailto:${CONTACT_INFO.email}`} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Mail className="h-4 w-4" />{CONTACT_INFO.email}
          </a>
          <a href={CONTACT_INFO.phoneHref} className="flex items-center gap-2 text-muted-foreground hover:text-primary">
            <Phone className="h-4 w-4" />{CONTACT_INFO.phone}
          </a>
          <a href={CONTACT_INFO.whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-muted-foreground hover:text-secondary">
            <MessageCircle className="h-4 w-4" />WhatsApp: {CONTACT_INFO.whatsapp}
          </a>
          <div className="flex items-start gap-2 text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0 mt-0.5" />{CONTACT_INFO.address}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
