'use client';

import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import Image from 'next/image';

interface AuthLogoProps {
  title: string;
  subtitle?: string;
}

export function AuthLogo({ title, subtitle }: AuthLogoProps) {
  useGSAP(() => {
    authAnimations.logoBounce('.auth-logo');
  }, []);

  return (
    <div className="mb-6 flex flex-col items-center gap-4">
      {/* Logo Mark */}
      {/* <div className="auth-logo flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-[#1D3557] to-[#457B9D] shadow-lg"> */}
        {/* <svg
          className="h-7 w-7 text-white"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        > */}
          {/* 3D Cube Icon representing geometry */}
          {/* <path d="M12 2L2 7l10 5 10-5-10-5z" />
          <path d="M2 17l10 5 10-5" />
          <path d="M2 12l10 5 10-5" />
        </svg> */}
         <Image
            src="/images/logo.svg"        // path inside /public folder
            alt="VisualEdu Logo"
            width={60}
            height={60}
            className="rounded-lg"
          />
      {/* </div> */}

      {/* Product Name */}
      <div className="text-center">
        <h1 className="text-[22px] font-bold text-[#1D3557]">VisualEdu</h1>
        <h2 className="mt-1 text-lg font-semibold text-[#1D3557]/80">{title}</h2>
        {subtitle && (
          <p className="mt-1 text-[11px] text-[#1D3557]/50">{subtitle}</p>
        )}
      </div>
    </div>
  );
}

export default AuthLogo;
