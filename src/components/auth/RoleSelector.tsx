'use client';

import { useRef, useEffect } from 'react';
import { GraduationCap, Users, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import gsap from 'gsap';
import { useGSAP, authAnimations } from '@/hooks/useGSAP';

export type Role = 'student' | 'teacher' | null;

interface RoleSelectorProps {
  selectedRole: Role;
  onRoleSelect: (role: 'student' | 'teacher') => void;
}

export function RoleSelector({ selectedRole, onRoleSelect }: RoleSelectorProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    authAnimations.staggerIn('.role-card', 0.3);
  }, []);

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    onRoleSelect(role);
    // Animate checkmark in
    requestAnimationFrame(() => {
      gsap.fromTo(
        `.checkmark-${role}`,
        { scale: 0, rotation: -45 },
        { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }
      );
    });
  };

  return (
    <div ref={containerRef} className="space-y-3">
      <label className="block text-center text-[11px] font-medium uppercase tracking-wider text-[#1D3557]/50">
        Bạn là?
      </label>
      <div className="grid grid-cols-2 gap-3">
        {/* Student Card */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => handleRoleSelect('student')}
          className={cn(
            'role-card relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200',
            selectedRole === 'student'
              ? 'border-[#457B9D] bg-white shadow-md'
              : 'border-[#A8DADC]/40 bg-[#F1FAEE] hover:border-[#A8DADC] hover:bg-[#F1FAEE]/80'
          )}
        >
          {selectedRole === 'student' && (
            <div className="checkmark-student absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D]">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            selectedRole === 'student' ? 'bg-[#457B9D]/10' : 'bg-[#A8DADC]/20'
          )}>
            <GraduationCap className={cn(
              'h-6 w-6',
              selectedRole === 'student' ? 'text-[#457B9D]' : 'text-[#1D3557]/60'
            )} />
          </div>
          <div className="text-center">
            <p className={cn(
              'text-sm font-bold',
              selectedRole === 'student' ? 'text-[#1D3557]' : 'text-[#1D3557]/80'
            )}>
              Học sinh
            </p>
            <p className="text-[11px] text-[#1D3557]/50">
              Học và luyện tập
            </p>
          </div>
        </button>

        {/* Teacher Card */}
        <button
          type="button"
          suppressHydrationWarning
          onClick={() => handleRoleSelect('teacher')}
          className={cn(
            'role-card relative flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200',
            selectedRole === 'teacher'
              ? 'border-[#457B9D] bg-white shadow-md'
              : 'border-[#A8DADC]/40 bg-[#F1FAEE] hover:border-[#A8DADC] hover:bg-[#F1FAEE]/80'
          )}
        >
          {selectedRole === 'teacher' && (
            <div className="checkmark-teacher absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#457B9D]">
              <Check className="h-3 w-3 text-white" />
            </div>
          )}
          <div className={cn(
            'flex h-12 w-12 items-center justify-center rounded-xl',
            selectedRole === 'teacher' ? 'bg-[#457B9D]/10' : 'bg-[#A8DADC]/20'
          )}>
            <Users className={cn(
              'h-6 w-6',
              selectedRole === 'teacher' ? 'text-[#457B9D]' : 'text-[#1D3557]/60'
            )} />
          </div>
          <div className="text-center">
            <p className={cn(
              'text-sm font-bold',
              selectedRole === 'teacher' ? 'text-[#1D3557]' : 'text-[#1D3557]/80'
            )}>
              Giáo viên
            </p>
            <p className="text-[11px] text-[#1D3557]/50">
              Quản lý lớp học
            </p>
          </div>
        </button>
      </div>
    </div>
  );
}

export default RoleSelector;
