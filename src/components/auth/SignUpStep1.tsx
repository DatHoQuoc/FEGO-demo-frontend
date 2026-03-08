'use client';

import { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { RoleSelector, type Role } from './RoleSelector';
import { SocialAuth } from './SocialAuth';
import { AuthFooter } from './AuthFooter';
import { AuthLogo } from './AuthLogo';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import gsap from 'gsap';

const step1Schema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
});

type Step1FormData = z.infer<typeof step1Schema>;

interface SignUpStep1Props {
  selectedRole: Role;
  onRoleSelect: (role: 'student' | 'teacher') => void;
  onContinue: (email: string) => void;
  onGoogleSignUp?: () => void;
}

export function SignUpStep1({
  selectedRole,
  onRoleSelect,
  onContinue,
  onGoogleSignUp,
}: SignUpStep1Props) {
  const formRef = useRef<HTMLFormElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<Step1FormData>({
    resolver: zodResolver(step1Schema),
  });

  useGSAP(() => {
    // CTA button enable animation when role is selected
    if (selectedRole) {
      gsap.to('.cta-btn', {
        opacity: 1,
        scale: 1,
        duration: 0.3,
        ease: 'power1.out',
      });
    }
  }, [selectedRole]);

  const onSubmit = (data: Step1FormData) => {
    if (!selectedRole) {
      authAnimations.shakeError('.role-selector');
      return;
    }
    onContinue(data.email);
  };

  // Handle input focus/blur animations
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputFocus(e.target);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputBlur(e.target);
  };

  return (
    <div className="step-1">
      <AuthLogo title="Tạo tài khoản" />

      <form ref={formRef} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Role Selector */}
        <div className="role-selector">
          <RoleSelector selectedRole={selectedRole} onRoleSelect={onRoleSelect} />
        </div>

        {/* Email Input */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#1D3557]">
            Email của bạn
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D3557]/40" />
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              suppressHydrationWarning
              className={cn(
                'h-11 pl-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.email && 'border-[#E63946] focus:border-[#E63946] focus:ring-[#E63946]/30'
              )}
              {...register('email')}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {errors.email && (
            <p className="text-xs text-[#E63946]">{errors.email.message}</p>
          )}
        </div>

        {/* Continue Button */}
        <Button
          type="submit"
          disabled={!selectedRole || isSubmitting}
          className={cn(
            'cta-btn h-12 w-full bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-lg',
            'hover:from-[#C1121F] hover:to-[#A00F1A] hover:shadow-xl',
            'disabled:from-[#E63946]/50 disabled:to-[#C1121F]/50 disabled:cursor-not-allowed',
            'transition-all duration-200'
          )}
        >
          Tiếp tục với Email
        </Button>

        {/* Social Auth */}
        <SocialAuth onGoogleClick={onGoogleSignUp} disabled={!selectedRole} />

        {/* Footer */}
        <AuthFooter mode="signup" />
      </form>
    </div>
  );
}

export default SignUpStep1;
