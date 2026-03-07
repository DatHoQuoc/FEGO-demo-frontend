import { DM_Serif_Display, Syne, DM_Mono } from 'next/font/google'
import styles from './admin.module.css'    // scoped
import './admin.global.css'               // global selectors

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-serif',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})

export default function VisualEduLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={` ${styles.adminRoot} font-sans antialiased`}>
      {children}
    </div>
  )
}