import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';

// Configure GSAP defaults
gsap.config({ force3D: true, nullTargetWarn: false });
gsap.defaults({ ease: 'power2.out', duration: 0.6 });

export const useGSAP = (callback: (ctx: gsap.Context) => void, deps: unknown[] = []) => {
  const ctxRef = useRef<gsap.Context | null>(null);

  useLayoutEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      // Skip animations for users who prefer reduced motion
      return;
    }

    ctxRef.current = gsap.context(() => {
      callback(ctxRef.current!);
    });

    return () => {
      ctxRef.current?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ctxRef;
};

// Animation utilities
export const authAnimations = {
  // Card mount animation
  cardMount: (selector: string) => {
    return gsap.fromTo(
      selector,
      { opacity: 0, scale: 0.95, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 0.6, ease: 'power3.out' }
    );
  },

  // Logo bounce in
  logoBounce: (selector: string) => {
    return gsap.fromTo(
      selector,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, ease: 'back.out(1.7)' }
    );
  },

  // Stagger elements
  staggerIn: (selector: string, delay = 0) => {
    return gsap.fromTo(
      selector,
      { opacity: 0, y: 16 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.5,
        ease: 'power2.out',
        delay,
      }
    );
  },

  // Fields stagger (faster)
  fieldsStagger: (selector: string, delay = 0.2) => {
    return gsap.fromTo(
      selector,
      { opacity: 0, y: 12 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.08,
        duration: 0.4,
        ease: 'power2.out',
        delay,
      }
    );
  },

  // Checkmark scale in
  checkmarkIn: (selector: string) => {
    return gsap.fromTo(
      selector,
      { scale: 0, rotation: -45 },
      { scale: 1, rotation: 0, duration: 0.3, ease: 'back.out(2)' }
    );
  },

  // Slide step transition
  slideOut: (selector: string, direction: 'left' | 'right' = 'left') => {
    const x = direction === 'left' ? -40 : 40;
    return gsap.to(selector, {
      opacity: 0,
      x,
      duration: 0.35,
      ease: 'power2.in',
    });
  },

  slideIn: (selector: string, direction: 'left' | 'right' = 'right') => {
    const x = direction === 'right' ? 40 : -40;
    return gsap.fromTo(
      selector,
      { opacity: 0, x },
      { opacity: 1, x: 0, duration: 0.35, ease: 'power2.out' }
    );
  },

  // Role chip bounce
  chipBounce: (selector: string, delay = 0.1) => {
    return gsap.fromTo(
      selector,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)', delay }
    );
  },

  // Banner slide down
  bannerSlide: (selector: string, delay = 0.6) => {
    return gsap.fromTo(
      selector,
      { opacity: 0, y: -12 },
      { opacity: 1, y: 0, duration: 0.4, delay, ease: 'power2.out' }
    );
  },

  // Error shake
  shakeError: (selector: string) => {
    return gsap.to(selector, {
      keyframes: {
        x: [-8, 8, -6, 6, -4, 4, 0],
      },
      duration: 0.5,
      ease: 'power1.inOut',
    });
  },

  // Input focus glow
  inputFocus: (element: HTMLElement) => {
    return gsap.to(element, {
      boxShadow: '0 0 0 3px rgba(168,218,220,0.35)',
      borderColor: '#457B9D',
      duration: 0.2,
    });
  },

  inputBlur: (element: HTMLElement) => {
    return gsap.to(element, {
      boxShadow: 'none',
      borderColor: 'rgba(168,218,220,0.5)',
      duration: 0.2,
    });
  },

  // Button hover
  buttonHoverIn: (element: HTMLElement) => {
    return gsap.to(element, { scale: 1.02, duration: 0.2 });
  },

  buttonHoverOut: (element: HTMLElement) => {
    return gsap.to(element, { scale: 1, duration: 0.2 });
  },
};

export default useGSAP;