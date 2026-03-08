'use client';

import Link from 'next/link';

interface AuthFooterProps {
  mode: 'signin' | 'signup';
  showAutoRouteNotice?: boolean;
}

export function AuthFooter({ mode, showAutoRouteNotice }: AuthFooterProps) {
  return (
    <div className="mt-6 space-y-3 text-center">
      {mode === 'signup' ? (
        <p className="text-sm text-[#1D3557]/70">
          Đã có tài khoản?{' '}
          <Link href="/signin" className="font-medium text-[#457B9D] hover:text-[#1D3557] hover:underline">
            Đăng nhập
          </Link>
        </p>
      ) : (
        <>
          <p className="text-sm text-[#1D3557]/70">
            Chưa có tài khoản?{' '}
            <Link href="/signup" className="font-medium text-[#457B9D] hover:text-[#1D3557] hover:underline">
              Đăng ký
            </Link>
          </p>
          {showAutoRouteNotice && (
            <p className="text-[10px] text-[#1D3557]/40">
              Hệ thống tự nhận diện vai trò của bạn
            </p>
          )}
        </>
      )}

      {/* Terms & Privacy */}
      <p className="text-[10px] text-[#1D3557]/40">
        <Link href="/terms" className="hover:text-[#457B9D] hover:underline">
          Điều khoản
        </Link>
        {' · '}
        <Link href="/privacy" className="hover:text-[#457B9D] hover:underline">
          Chính sách bảo mật
        </Link>
      </p>
    </div>
  );
}

export default AuthFooter;
