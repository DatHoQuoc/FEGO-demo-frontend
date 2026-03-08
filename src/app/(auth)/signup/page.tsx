'use client';

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignUpStep1 } from '@/components/auth/SignUpStep1';
import { SignUpStep2Student } from '@/components/auth/SignUpStep2Student';
import { SignUpStep2Teacher } from '@/components/auth/SignUpStep2Teacher';
import type { Role } from '@/components/auth/RoleSelector';
import gsap from 'gsap';

type Step = 1 | 2;

export default function SignUpPage() {
  const router = useRouter();
  const [step, setStep] = useState<Step>(1);
  const [selectedRole, setSelectedRole] = useState<Role>(null);
  const [email, setEmail] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleRoleSelect = (role: 'student' | 'teacher') => {
    setSelectedRole(role);
  };

  const handleContinue = (userEmail: string) => {
    setEmail(userEmail);
    // Animate step transition
    gsap.to('.step-1', {
      opacity: 0,
      x: -40,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setStep(2);
      },
    });
  };

  const handleBack = () => {
    // Animate back to step 1
    gsap.to(selectedRole === 'student' ? '.step-2-student' : '.step-2-teacher', {
      opacity: 0,
      x: 40,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setStep(1);
        // Reset step 1 visibility
        gsap.set('.step-1', { opacity: 1, x: 0 });
      },
    });
  };

  const handleStudentSubmit = async (data: {
    fullName: string;
    password: string;
    grade: string;
    className: string;
    email: string;
  }) => {
    console.log('[v0] Student signup data:', data);
    // TODO: Implement actual signup logic
    // After successful signup, redirect to email verification
    router.push('/signup/verify?email=' + encodeURIComponent(data.email));
  };

  const handleTeacherSubmit = async (data: {
    fullName: string;
    password: string;
    school: string;
    level: string;
    subject: string;
    email: string;
    credential?: File;
  }) => {
    console.log('[v0] Teacher signup data:', data);
    // TODO: Implement actual signup logic
    // After successful signup, redirect to pending page
    router.push('/signup/pending');
  };

  const handleGoogleSignUp = () => {
    console.log('[v0] Google signup initiated');
    // TODO: Implement Google OAuth
  };

  return (
    <AuthCard>
      <div ref={containerRef}>
        {step === 1 && (
          <SignUpStep1
            selectedRole={selectedRole}
            onRoleSelect={handleRoleSelect}
            onContinue={handleContinue}
            onGoogleSignUp={handleGoogleSignUp}
          />
        )}

        {step === 2 && selectedRole === 'student' && (
          <SignUpStep2Student
            email={email}
            onBack={handleBack}
            onSubmit={handleStudentSubmit}
          />
        )}

        {step === 2 && selectedRole === 'teacher' && (
          <SignUpStep2Teacher
            email={email}
            onBack={handleBack}
            onSubmit={handleTeacherSubmit}
          />
        )}
      </div>
    </AuthCard>
  );
}
