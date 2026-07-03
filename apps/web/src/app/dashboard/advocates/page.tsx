'use client';

import { useEffect, useState } from 'react';
import { Star, MapPin, IndianRupee, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { api } from '@/lib/api';

interface Advocate {
  id: string;
  practiceAreas: string[];
  experience: number;
  consultationFee: string;
  rating: string;
  reviewCount: number;
  biography: string;
  user: {
    profile: { firstName: string; lastName: string; city: string; state: string } | null;
  };
}

export default function AdvocatesPage() {
  const [advocates, setAdvocates] = useState<Advocate[]>([]);

  useEffect(() => {
    api<{ data: Advocate[] }>('/legal/advocates')
      .then((res) => setAdvocates(res.data))
      .catch(() => {});
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Advocate Marketplace</h1>
        <p className="text-muted-foreground text-sm">Find and book verified advocates across India</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {advocates.map((adv) => {
          const profile = adv.user.profile;
          const name = profile ? `Adv. ${profile.firstName} ${profile.lastName}` : 'Advocate';
          return (
            <Card key={adv.id} className="glass-card border-0 hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-14 w-14 rounded-2xl gradient-primary flex items-center justify-center text-white text-lg font-bold">
                    {profile?.firstName?.[0]}{profile?.lastName?.[0]}
                  </div>
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="flex items-center gap-1 text-sm">
                      <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                      <span>{adv.rating}</span>
                      <span className="text-muted-foreground">({adv.reviewCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {adv.practiceAreas.map((area) => (
                    <span key={area} className="text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">{area}</span>
                  ))}
                </div>

                {adv.biography && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{adv.biography}</p>
                )}

                <div className="space-y-1.5 text-sm text-muted-foreground mb-4">
                  {profile?.city && (
                    <div className="flex items-center gap-2"><MapPin className="h-3.5 w-3.5" />{profile.city}, {profile.state}</div>
                  )}
                  <div className="flex items-center gap-2"><Clock className="h-3.5 w-3.5" />{adv.experience} years</div>
                  <div className="flex items-center gap-2"><IndianRupee className="h-3.5 w-3.5" />₹{adv.consultationFee}/session</div>
                </div>

                <Button variant="gradient" className="w-full" size="sm">Book Consultation</Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
