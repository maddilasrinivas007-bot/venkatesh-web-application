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
        'inline-flex items-center gap-3 rounded-2xl border border-accent/40 bg-white/90 dark:bg-card/90 px-5 py-3 shadow-gold backdrop-blur-sm',
        className
      )}>
        <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-primary text-white shadow-judiciary">
          <Scale className="h-5 w-5" />
        </div>
        <div className="text-left">
          <div className="text-[10px] uppercase tracking-widest text-accent font-bold">
            Application Owner
          </div>
          <div className="text-lg font-bold text-navy dark:text-white leading-tight">
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
        'inline-flex items-center gap-1.5 rounded-full bg-accent/20 border border-accent/40 px-3 py-1 text-xs font-semibold text-accent',
        className
      )}>
        <Scale className="h-3 w-3" />
        {CONTACT_INFO.ownerDisplay}
      </span>
    );
  }

  if (variant === 'footer') {
    return (
      <div className={cn(
        'rounded-xl border border-accent/40 bg-white/10 p-4 mb-4',
        className
      )}>
        <div className="text-[10px] uppercase tracking-wider text-accent font-bold mb-1">
          Application Owner
        </div>
        <div className="text-base font-bold text-white">
          {CONTACT_INFO.ownerName}{' '}
          <span className="text-accent">— {CONTACT_INFO.ownerTitle}</span>
        </div>
        <div className="text-xs text-white/60 mt-0.5">{CONTACT_INFO.organization}</div>
      </div>
    );
  }

  return (
    <div className={cn(
      'judiciary-card p-6 text-center max-w-md mx-auto border-accent/20 shadow-judiciary',
      className
    )}>
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl gradient-gold text-white text-2xl font-bold shadow-gold mb-4">
        V
      </div>
      <div className="text-xs uppercase tracking-widest text-accent font-bold mb-2">
        Application Owner
      </div>
      <h3 className="text-2xl font-bold text-navy dark:text-white mb-1">
        {CONTACT_INFO.ownerName}
      </h3>
      <p className="text-lg font-semibold text-primary mb-2">{CONTACT_INFO.ownerTitle}</p>
      <p className="text-sm text-muted-foreground">{CONTACT_INFO.organization} · Tirupati, AP</p>
    </div>
  );
}
