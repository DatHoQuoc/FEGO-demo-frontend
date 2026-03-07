import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export { gsap, ScrollTrigger }

/** Animate screen enter: opacity 0→1, translateY 8→0, 250ms */
export function animateScreenEnter(el: HTMLElement | null) {
  if (!el) return
  gsap.fromTo(
    el,
    { opacity: 0, y: 8 },
    { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' }
  )
}

/** Stagger animate `.si` elements with 60ms delay */
export function animateStagger(container: HTMLElement | null) {
  if (!container) return
  const items = container.querySelectorAll('.si')
  if (!items.length) return
  gsap.from(items, {
    opacity: 0,
    y: 12,
    duration: 0.4,
    stagger: 0.06,
    ease: 'cubic-bezier(0.4, 0, 0.2, 1)',
  })
}

/** Animate progress bar scaleX 0→1 */
export function animateProgressBar(el: HTMLElement | null, delay = 0) {
  if (!el) return
  gsap.from(el, {
    scaleX: 0,
    duration: 0.8,
    delay,
    ease: 'power2.out',
    transformOrigin: 'left',
    willChange: 'transform',
  })
}

/** Counter animation for KPI values */
export function animateCounter(
  el: HTMLElement | null,
  target: number,
  prefix = '',
  suffix = '',
  decimals = 0
) {
  if (!el) return
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration: 1.2,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = prefix + obj.val.toFixed(decimals) + suffix
    },
  })
}

/** KPI card cascade stagger with 80ms delay */
export function animateKpiCards(els: NodeListOf<Element> | null) {
  if (!els || !els.length) return
  gsap.from(els, {
    opacity: 0,
    y: 16,
    duration: 0.45,
    stagger: 0.08,
    ease: 'power2.out',
  })
}
