'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ArrowLeft, Eye, EyeOff, User, Building2, Upload, Clock } from 'lucide-react';
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

const teacherSchema = z.object({
  fullName: z.string().min(2, 'Họ và tên phải có ít nhất 2 ký tự'),
  password: z.string().min(8, 'Mật khẩu phải có ít nhất 8 ký tự'),
  school: z.string().min(3, 'Tên trường phải có ít nhất 3 ký tự'),
  level: z.string().min(1, 'Vui lòng chọn cấp dạy'),
  subject: z.string().min(1, 'Vui lòng chọn môn dạy'),
  acceptTerms: z.literal(true, {
    errorMap: () => ({ message: 'Bạn phải đồng ý với điều khoản' }),
  }),
});

type TeacherFormData = z.infer<typeof teacherSchema>;

interface SignUpStep2TeacherProps {
  email: string;
  onBack: () => void;
  onSubmit: (data: TeacherFormData & { email: string; credential?: File }) => void;
}

export function SignUpStep2Teacher({ email, onBack, onSubmit }: SignUpStep2TeacherProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [credentialFile, setCredentialFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<TeacherFormData>({
    resolver: zodResolver(teacherSchema),
    defaultValues: {
      acceptTerms: false as unknown as true,
    },
  });

  useGSAP(() => {
    // Slide in from right
    authAnimations.slideIn('.step-2-teacher', 'right');
    // Fields stagger
    authAnimations.fieldsStagger('.form-field', 0.2);
    // Role chip bounce
    authAnimations.chipBounce('.role-chip', 0.1);
    // Upload zone animation
    authAnimations.bannerSlide('.upload-zone', 0.5);
    // Approval banner slide down
    authAnimations.bannerSlide('.approval-banner', 0.6);
  }, []);

  const handleFormSubmit = async (data: TeacherFormData) => {
    try {
      await onSubmit({ ...data, email, credential: credentialFile || undefined });
    } catch {
      triggerShake();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setCredentialFile(file);
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
    <div className="step-2-teacher">
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
        <span className="role-chip rounded-full border border-[#E63946]/30 bg-[#E63946]/10 px-3 py-1 text-xs font-medium text-[#E63946]">
          Giáo viên
        </span>
      </div>

      {/* Page Title */}
      <div className="mb-6 text-center">
        <h2 className="text-xl font-bold text-[#1D3557]">Thông tin giáo viên</h2>
        <p className="mt-1 text-xs text-[#E63946]/80">Tài khoản giáo viên cần xét duyệt thủ công</p>
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

        {/* School */}
        <div className="form-field space-y-2">
          <Label htmlFor="school" className="text-sm font-medium text-[#1D3557]">
            Trường công tác
          </Label>
          <div className="relative">
            <Building2 className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#1D3557]/40" />
            <Input
              id="school"
              placeholder="THPT Chu Văn An"
              className={cn(
                'h-11 pl-10 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557] placeholder:text-[#1D3557]/40',
                'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                errors.school && 'border-[#E63946]'
              )}
              {...register('school')}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
            />
          </div>
          {errors.school && (
            <p className="text-xs text-[#E63946]">{errors.school.message}</p>
          )}
        </div>

        {/* Level & Subject Row */}
        <div className="form-field grid grid-cols-2 gap-3">
          {/* Level */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1D3557]">Cấp dạy</Label>
            <Select onValueChange={(value) => setValue('level', value)}>
              <SelectTrigger
                className={cn(
                  'h-11 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557]',
                  'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                  errors.level && 'border-[#E63946]'
                )}
              >
                <SelectValue placeholder="Chọn cấp" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="thcs">THCS</SelectItem>
                <SelectItem value="thpt">THPT</SelectItem>
                <SelectItem value="luyenthi">Luyện thi</SelectItem>
              </SelectContent>
            </Select>
            {errors.level && (
              <p className="text-xs text-[#E63946]">{errors.level.message}</p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-[#1D3557]">Môn dạy</Label>
            <Select onValueChange={(value) => setValue('subject', value)}>
              <SelectTrigger
                className={cn(
                  'h-11 border-[#A8DADC]/50 bg-[#F1FAEE] text-[#1D3557]',
                  'focus:border-[#457B9D] focus:ring-2 focus:ring-[#A8DADC]/30',
                  errors.subject && 'border-[#E63946]'
                )}
              >
                <SelectValue placeholder="Chọn môn" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="toan">Toán</SelectItem>
                <SelectItem value="ly">Lý</SelectItem>
                <SelectItem value="hoa">Hóa</SelectItem>
                <SelectItem value="sinh">Sinh</SelectItem>
                <SelectItem value="tin">Tin học</SelectItem>
              </SelectContent>
            </Select>
            {errors.subject && (
              <p className="text-xs text-[#E63946]">{errors.subject.message}</p>
            )}
          </div>
        </div>

        {/* Credential Upload (Optional) */}
        <div className="upload-zone form-field">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.jpg,.jpeg,.png"
            onChange={handleFileChange}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              'flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed p-4',
              'border-[#A8DADC]/50 bg-[#F1FAEE] hover:border-[#457B9D] hover:bg-[#F1FAEE]/80',
              'transition-colors duration-200'
            )}
          >
            <Upload className="h-6 w-6 text-[#1D3557]/40" />
            <div className="text-center">
              <p className="text-sm font-medium text-[#1D3557]/70">
                {credentialFile ? credentialFile.name : 'Tải giấy xác minh (không bắt buộc)'}
              </p>
              <p className="mt-1 text-[10px] italic text-[#1D3557]/40">
                Giúp tài khoản được duyệt nhanh hơn
              </p>
            </div>
          </button>
        </div>

        {/* Approval Notice */}
        <div className="approval-banner rounded-xl border border-[#E63946]/25 bg-[#E63946]/[0.08] p-3">
          <div className="flex items-start gap-2">
            <Clock className="mt-0.5 h-4 w-4 flex-shrink-0 text-[#E63946]" />
            <p className="text-[11px] leading-relaxed text-[#1D3557]/80">
              Tài khoản giáo viên được xét duyệt trong 1–2 ngày làm việc. Bạn sẽ nhận email khi tài khoản sẵn sàng.
            </p>
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
          {isSubmitting ? 'Đang gửi...' : 'Gửi yêu cầu đăng ký'}
        </Button>
      </form>
    </div>
  );
}

export default SignUpStep2Teacher;
