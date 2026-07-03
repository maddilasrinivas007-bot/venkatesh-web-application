import { Scale, Award } from 'lucide-react';
import { CONTACT_INFO } from '@nyayaai/shared';
import { cn } from '@/lib/utils';

interface OwnerHighlightProps {
  variant?: 'banner' | 'card' | 'compact' | 'footer';
  className?: string;
}

export function OwnerHighlight({ variant = 'card', className }: OwnerHighlightProps) {
  if (variant === 'banner') {
    return (
      <div className={cn(
        'inline-flex items-center gap-3 rounded-2xl border border-accent/30 bg-gradient-to-r from-accent/15 via-primary/10 to-secondary/10 px-5 py-3 shadow-lg shadow-accent/10',
        className
      )}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-secondary text-white shadow-md">
          <Scale className="h-5 w-5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase tracking-widest text-accent font-semibold">
            Application Owner
          </div>
          <div className="text-lg font-bold gradient-text leading-tight">
            {CONTACT_INFO.ownerDisplay}
          </div>
          <div className="text-xs text-muted-foreground">{CONTACT_INFO.organization}</div>
        </div>
        <Award className="h-6 w-6 text-accent hidden sm:block" />
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <span className={cn(
        'inline-flex items-center gap-1.5 rounded-full bg-accent/15 border border-accent/30 px-3 py-1 text-xs font-semibold text-foreground',
        className
      )}>
        <Scale className="h-3 w-3 text-primary" />
        {CONTACT_INFO.ownerDisplay}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={cn(
        'rounded-xl border border-accent/25 bg-gradient-to-r from-accent/10 to-primary/5 p-4 mb-4',
        className
      )}>
        <div className="text-[10px] uppercase tracking-wider text-accent font-bold mb-1">
          Application Owner
        </div>
        <div className="text-base font-bold text-foreground">
          {CONTACT_INFO.ownerName}{' '}
          <span className="text-primary">— {CONTACT_INFO.ownerTitle}</span>
        </div>
        <div className="text-xs text-muted-foreground mt-0.5">{CONTACT_INFO.organization}</div>
      </div>
    );
  }

  return (
    <div className={cn(
      'glass-card rounded-2xl border border-accent/20 p-6 text-center max-w-md mx-auto',
      className
    )}>
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-secondary text-white text-2xl font-bold shadow-xl mb-4">
        V
      </div>
      <div className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
        Application Owner
      </div>
      <h3 className="text-2xl font-bold mb-1">
        {CONTACT_INFO.ownerName}
      </h3>
      <p className="text-lg font-semibold text-primary mb-2">{CONTACT_INFO.ownerTitle}</p>
      <p className="text-sm text-muted-foreground">{CONTACT_INFO.organization} · Tirupati, AP</p>
    </div>
  );
}
