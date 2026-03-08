'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Mail, Eye, EyeOff, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { SocialAuth } from './SocialAuth';
import { AuthFooter } from './AuthFooter';
import { AuthLogo } from './AuthLogo';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import { triggerShake } from './AuthCard';
import Link from 'next/link';

const signInSchema = z.object({
  email: z.string().min(1, 'Email là bắt buộc').email('Email không hợp lệ'),
  password: z.string().min(1, 'Mật khẩu là bắt buộc'),
});

type SignInFormData = z.infer<typeof signInSchema>;

interface SignInFormProps {
  onSubmit: (data: SignInFormData) => Promise<void>;
  onGoogleSignIn?: () => void;
}

export function SignInForm({ onSubmit, onGoogleSignIn }: SignInFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  useGSAP(() => {
    // Stagger form fields
    authAnimations.fieldsStagger('.form-field', 0.3);
  }, []);

  const handleFormSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    try {
      await onSubmit(data);
    } catch (error) {
      triggerShake();
      setError('root', { message: 'Email hoặc mật khẩu không đúng' });
    } finally {
      setIsLoading(false);
    }
  };

  // Input focus/blur animations
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputFocus(e.target);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputBlur(e.target);
  };

  return (
    <div className="signin-form">
      <AuthLogo
        title="Đăng nhập"
        subtitle="Học sinh và Giáo viên dùng chung trang này"
      />

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Email Input */}
        <div className="form-field space-y-2">
          <Label htmlFor="email" className="text-sm font-medium text-[#1D3557]">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D3557]/40" />
            <Input
              id="email"
              type="email"
              placeholder="email@example.com"
              className={cn(
                'auth-input h-11 pl-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
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

        {/* Password Input */}
        <div className="form-field space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#1D3557]">
            Mật khẩu
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Nhập mật khẩu"
              className={cn(
                'auth-input h-11 pr-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.password && 'border-[#E63946] focus:border-[#E63946] focus:ring-[#E63946]/30'
              )}
              {...register('password')}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1D3557]/40 hover:text-[#1D3557]"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
          {errors.password && (
            <p className="text-xs text-[#E63946]">{errors.password.message}</p>
          )}

          {/* Forgot Password */}
          <div className="text-right">
            <Link
              href="/forgot-password"
              className="text-[11px] text-[#457B9D] hover:text-[#1D3557] hover:underline"
            >
              Quên mật khẩu?
            </Link>
          </div>
        </div>

        {/* Root Error */}
        {errors.root && (
          <p className="text-center text-xs text-[#E63946]">{errors.root.message}</p>
        )}

        {/* Sign In Button */}
        <Button
          type="submit"
          disabled={isLoading}
          className={cn(
            'h-12 w-full bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-lg',
            'hover:from-[#C1121F] hover:to-[#A00F1A] hover:shadow-xl',
            'disabled:from-[#E63946]/50 disabled:to-[#C1121F]/50',
            'transition-all duration-200'
          )}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              Đang đăng nhập...
            </span>
          ) : (
            'Đăng nhập'
          )}
        </Button>

        {/* Social Auth */}
        <SocialAuth onGoogleClick={onGoogleSignIn} />

        {/* Footer */}
        <AuthFooter mode="signin" showAutoRouteNotice />
      </form>
    </div>
  );
}

export default SignInForm;
