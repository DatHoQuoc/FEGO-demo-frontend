'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import { triggerShake } from './AuthCard';

const studentSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  grade: z.string().min(1, 'Vui lòng chọn lớp'),
  className: z.string().min(1, 'Vui lòng nhập tên lớp'),
  acceptTerms: z.literal(true, 'Bạn phải đồng ý với điều khoản'),

});

type StudentFormData = z.infer<typeof studentSchema>;

interface SignUpStep2StudentProps {
  email: string;
  onBack: () => void;
  onSubmit: (data: StudentFormData & { email: string }) => void;
}

export function SignUpStep2Student({ email, onBack, onSubmit }: SignUpStep2StudentProps) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<StudentFormData>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      acceptTerms: false as unknown as true,
    },
  });

  useGSAP(() => {
    // Slide in from right
    authAnimations.slideIn('.step-2-student', 'right');
    // Fields stagger
    authAnimations.fieldsStagger('.form-field', 0.2);
    // Role chip bounce
    authAnimations.chipBounce('.role-chip', 0.1);
  }, []);

  const handleFormSubmit = async (data: StudentFormData) => {
    try {
      await onSubmit({ ...data, email });
    } catch {
      triggerShake();
    }
  };

  const acceptTerms = watch('acceptTerms');

  // Input focus/blur animations
  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputFocus(e.target);
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    authAnimations.inputBlur(e.target);
  };

  return (
    <div className="step-2-student">
      {/* Navigation Header */}
      <div className="mb-6 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="flex items-center gap-1 text-sm text-[#457B9D] hover:text-[#1D3557] transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Quay lại
        </button>
        <span className="font-mono text-[11px] text-[#1D3557]/50">Bước 2 / 2</span>
        <span className="role-chip rounded-full border border-[#A8DADC] bg-[#A8DADC]/20 px-3 py-1 text-xs font-medium text-[#1D3557]">
          Học sinh
        </span>
      </div>

      {/* Page Title */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-[#1D3557]">Thông tin của bạn</h2>
        <p className="mt-1 text-xs text-[#1D3557]/50">Điền thông tin để bắt đầu học</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
        {/* Full Name */}
        <div className="form-field space-y-2">
          <Label htmlFor="fullName" className="text-sm font-medium text-[#1D3557]">
            Họ và tên
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D3557]/40" />
            <Input
              id="fullName"
              placeholder="Nguyễn Văn A"
              className={cn(
                'h-11 pl-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.fullName && 'border-[#E63946]'
              )}
              {...register('fullName')}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {errors.fullName && (
            <p className="text-xs text-[#E63946]">{errors.fullName.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="form-field space-y-2">
          <Label htmlFor="password" className="text-sm font-medium text-[#1D3557]">
            Mật khẩu
          </Label>
          <div className="relative">
            <Input
              id="password"
              type={showPassword ? 'text' : 'password'}
              placeholder="Tối thiểu 8 ký tự"
              className={cn(
                'h-11 pr-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.password && 'border-[#E63946]'
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
        </div>

        {/* Grade & Class Name Row */}
        <div className="form-field grid grid-cols-2 gap-3">
          {/* Grade */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1D3557]">Lớp</Label>
            <Select onValueChange={(value) => setValue('grade', value)}>
              <SelectTrigger
                className={cn(
                  'h-11 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557]',
                  'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                  errors.grade && 'border-[#E63946]'
                )}
              >
                <SelectValue placeholder="Chọn lớp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">Lớp 10</SelectItem>
                <SelectItem value="11">Lớp 11</SelectItem>
                <SelectItem value="12">Lớp 12</SelectItem>
              </SelectContent>
            </Select>
            {errors.grade && (
              <p className="text-xs text-[#E63946]">{errors.grade.message}</p>
            )}
          </div>

          {/* Class Name */}
          <div className="space-y-2">
            <Label htmlFor="className" className="text-sm font-medium text-[#1D3557]">
              Tên lớp
            </Label>
            <Input
              id="className"
              placeholder="VD: 12A1"
              className={cn(
                'h-11 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.className && 'border-[#E63946]'
              )}
              {...register('className')}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
            {errors.className && (
              <p className="text-xs text-[#E63946]">{errors.className.message}</p>
            )}
          </div>
        </div>

        {/* Terms Checkbox */}
        <div className="form-field flex items-start gap-2 pt-2">
          <Checkbox
            id="acceptTerms"
            checked={acceptTerms}
            onCheckedChange={(checked) => setValue('acceptTerms', checked === true ? true : false as unknown as true)}
            className="mt-0.5 border-[#A8DADC] data-[state=checked]:bg-[#457B9D] data-[state=checked]:border-[#457B9D]"
          />
          <label htmlFor="acceptTerms" className="text-xs leading-relaxed text-[#1D3557]/70">
            Tôi đồng ý với{' '}
            <a href="/terms" className="text-[#457B9D] hover:underline">
              Điều khoản
            </a>{' '}
            &{' '}
            <a href="/privacy" className="text-[#457B9D] hover:underline">
              Chính sách bảo mật
            </a>
          </label>
        </div>
        {errors.acceptTerms && (
          <p className="text-xs text-[#E63946]">{errors.acceptTerms.message}</p>
        )}

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={isSubmitting}
          className={cn(
            'submit-btn mt-4 h-12 w-full bg-gradient-to-r from-[#E63946] to-[#C1121F] text-white shadow-lg',
            'hover:from-[#C1121F] hover:to-[#A00F1A] hover:shadow-xl',
            'disabled:from-[#E63946]/50 disabled:to-[#C1121F]/50',
            'transition-all duration-200'
          )}
        >
          {isSubmitting ? 'Đang tạo...' : 'Tạo tài khoản'}
        </Button>
      </form>
    </div>
  );
}

export default SignUpStep2Student;
