'use client';

import { AuthCard } from '@/components/auth/AuthCard';
import { AuthLogo } from '@/components/auth/AuthLogo';
import { Button } from '@/components/ui/button';
import { Clock, CheckCircle2 } from 'lucide-react';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';
import Link from 'next/link';

export default function PendingPage() {
  useGSAP(() => {
    authAnimations.fieldsStagger('.pending-item', 0.15);
    authAnimations.bannerSlide('.status-banner', 0.5);
  }, []);

  return (
    <AuthCard>
      <AuthLogo title="Yêu cầu đã được gửi" />

      <div className="space-y-6 text-center">
        {/* Clock Icon */}
        <div className="pending-item mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#E63946]/10">
          <Clock className="h-10 w-10 text-[#E63946]" />
        </div>

        {/* Message */}
        <div className="pending-item space-y-2">
          <h3 className="text-lg font-semibold text-[#1D3557]">
            Tài khoản đang chờ xét duyệt
          </h3>
          <p className="text-sm text-[#1D3557]/60">
            Cảm ơn bạn đã đăng ký làm giáo viên trên VisualEdu
          </p>
        </div>

        {/* Status Banner */}
        <div className="status-banner rounded-xl border border-[#A8DADC]/50 bg-[#F1FAEE] p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-[#457B9D]" />
              <span className="text-sm font-medium text-[#1D3557]">
                Thông tin đã được nhận
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-[#A8DADC]/30">
              <div
                className="h-full w-1/3 rounded-full bg-gradient-to-r from-[#457B9D] to-[#A8DADC]"
                style={{
                  animation: 'pulse 2s ease-in-out infinite',
                }}
              />
            </div>
            <p className="text-xs text-[#1D3557]/50">
              Đang xử lý yêu cầu của bạn...
            </p>
          </div>
        </div>

        {/* Timeline */}
        <div className="pending-item space-y-2 text-left">
          <p className="text-center text-xs font-medium uppercase tracking-wider text-[#1D3557]/40">
            Quy trình xét duyệt
          </p>
          <div className="space-y-3 rounded-xl border border-[#A8DADC]/30 bg-white p-4">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D] text-[10px] font-bold text-white">
                1
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D3557]">Xác minh thông tin</p>
                <p className="text-xs text-[#1D3557]/50">Kiểm tra thông tin đăng ký</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#A8DADC]/50 text-[10px] font-bold text-[#1D3557]/60">
                2
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D3557]/60">Duyệt tài khoản</p>
                <p className="text-xs text-[#1D3557]/40">1-2 ngày làm việc</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#A8DADC]/50 text-[10px] font-bold text-[#1D3557]/60">
                3
              </div>
              <div>
                <p className="text-sm font-medium text-[#1D3557]/60">Kích hoạt</p>
                <p className="text-xs text-[#1D3557]/40">Nhận email xác nhận</p>
              </div>
            </div>
          </div>
        </div>

        {/* Notice */}
        <p className="pending-item text-xs text-[#1D3557]/50">
          Bạn sẽ nhận email thông báo khi tài khoản được duyệt. Trong thời gian chờ, bạn có thể đóng trang này.
        </p>

        {/* Back Link */}
        <div className="pending-item">
          <Link href="/">
            <Button
              variant="outline"
              className="w-full border-[#A8DADC] text-[#457B9D] hover:bg-[#F1FAEE] hover:text-[#1D3557]"
            >
              Quay lại trang chủ
            </Button>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.6; }
        }
      `}</style>
    </AuthCard>
  );
}
