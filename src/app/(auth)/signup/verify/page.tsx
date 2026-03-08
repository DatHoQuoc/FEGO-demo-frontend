'use client';

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { Button } from '@/components/ui/button';
import { Mail, RefreshCw } from 'lucide-react';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import Link from 'next/link';

function VerifyEmailContent() {
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const [isResending, setIsResending] = useState(false);
  const [resent, setResent] = useState(false);

  useGSAP(() => {
    authAnimations.fieldsStagger('.verify-item', 0.2);
  }, []);

  const handleResend = async () => {
    setIsResending(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsResending(false);
    setResent(true);
    setTimeout(() => setResent(false), 3000);
  };

  return (
    <>
      <AuthLogo title="Xác minh email" />

      <div className="space-y-6 text-center">
        {/* Email Icon */}
        <div className="verify-item mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#A8DADC]/20">
          <Mail className="h-10 w-10 text-[#457B9D]" />
        </div>

        {/* Message */}
        <div className="verify-item space-y-2">
          <h3 className="text-lg font-semibold text-[#1D3557]">
            Kiểm tra hòm thư của bạn
          </h3>
          <p className="text-sm text-[#1D3557]/60">
            Chúng tôi đã gửi email xác minh đến
          </p>
          <p className="font-medium text-[#457B9D]">{email}</p>
        </div>

        {/* Instructions */}
        <p className="verify-item text-xs text-[#1D3557]/50">
          Nhấp vào liên kết trong email để hoàn tất đăng ký. Nếu không thấy email, kiểm tra thư mục spam.
        </p>

        {/* Resend Button */}
        <div className="verify-item space-y-3">
          <Button
            variant="outline"
            onClick={handleResend}
            disabled={isResending}
            className="w-full border-[#A8DADC] text-[#457B9D] hover:bg-[#F1FAEE] hover:text-[#1D3557]"
          >
            {isResending ? (
              <span className="flex items-center gap-2">
                <RefreshCw className="h-4 w-4 animate-spin" />
                Đang gửi lại...
              </span>
            ) : resent ? (
              'Đã gửi lại!'
            ) : (
              'Gửi lại email'
            )}
          </Button>

          <Link
            href="/signin"
            className="block text-sm text-[#1D3557]/60 hover:text-[#457B9D]"
          >
            Quay lại đăng nhập
          </Link>
        </div>
      </div>
    </>
  );
}

export default function VerifyEmailPage() {
  return (
    <AuthCard>
      <Suspense fallback={<div className="text-center text-sm text-[#1D3557]/50">Đang tải...</div>}>
        <VerifyEmailContent />
      </Suspense>
    </AuthCard>
  );
}
