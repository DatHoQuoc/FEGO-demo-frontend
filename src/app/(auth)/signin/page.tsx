'use client';

import { useRouter } from 'next/navigation';
import { AuthCard } from '@/components/auth/AuthCard';
import { SignInForm } from '@/components/auth/SignInForm';

export default function SignInPage() {
  const router = useRouter();

  const handleSignIn = async (data: { email: string; password: string }) => {
    console.log('[v0] Sign in data:', data);
    // TODO: Implement actual sign in logic
    // The system should auto-route based on user role from DB:
    // - Student → /dashboard (learning view)
    // - Teacher → /dashboard (class management view)
    // - Moderator → /queue (review queue)
    // - Staff → /operations (business dashboard)
    // - Admin → /system (system health)
    
    // For demo, simulate successful login and redirect to dashboard
    await new Promise((resolve) => setTimeout(resolve, 1000));
    router.push('/navigation');
  };

  const handleGoogleSignIn = () => {
    console.log('[v0] Google sign in initiated');
    // TODO: Implement Google OAuth
  };

  return (
    <AuthCard>
      <SignInForm
        onSubmit={handleSignIn}
        onGoogleSignIn={handleGoogleSignIn}
      />
    </AuthCard>
  );
}
