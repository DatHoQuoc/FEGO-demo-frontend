import type { Metadata } from 'next'
import { DM_Serif_Display, Syne, DM_Mono } from 'next/font/google'
import './moderator.global.css'

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

export const metadata: Metadata = {
  title: 'VisualEdu - Moderator',
  description: 'Moderator panel for VisualEdu',
}

export default function ModeratorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div
      className={`${syne.variable} ${dmSerifDisplay.variable} ${dmMono.variable} moderatorRoot  font-sans antialiased`}
    >
      {children}
    </div>
  )
}