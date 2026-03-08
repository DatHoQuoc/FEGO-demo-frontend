'use client';

import { useRef, type ReactNode } from 'react';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import { cn } from '@/lib/utils';

interface AuthCardProps {
  children: ReactNode;
  className?: string;
}

export function AuthCard({ children, className }: AuthCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (cardRef.current) {
      authAnimations.cardMount('.auth-card');
    }
  }, []);

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#1D3557] via-[#457B9D] to-[#1D3557] p-4">
      {/* Geometric pattern overlay */}
      <div className="absolute inset-0 opacity-[0.03]">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="1"/>
              <circle cx="0" cy="0" r="2" fill="white"/>
              <circle cx="60" cy="0" r="2" fill="white"/>
              <circle cx="0" cy="60" r="2" fill="white"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute left-[10%] top-[20%] h-24 w-24 rotate-12 rounded-2xl border border-white/10 bg-white/5 blur-sm" />
      <div className="absolute right-[15%] top-[30%] h-16 w-16 -rotate-12 rounded-xl border border-white/10 bg-white/5 blur-sm" />
      <div className="absolute bottom-[25%] left-[20%] h-20 w-20 rotate-45 rounded-2xl border border-white/10 bg-white/5 blur-sm" />
      <div className="absolute bottom-[20%] right-[10%] h-28 w-28 -rotate-6 rounded-3xl border border-white/10 bg-white/5 blur-sm" />

      {/* Auth card */}
      <div
        ref={cardRef}
        className={cn(
          'auth-card relative z-10 w-full max-w-md rounded-2xl bg-white/95 p-8 shadow-2xl backdrop-blur-sm',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

// Trigger error shake animation
export function triggerShake() {
  authAnimations.shakeError('.auth-card');
}

export default AuthCard;
