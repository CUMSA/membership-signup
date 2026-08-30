import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const neueMontreal = localFont({
  src: [
    { path: './fonts/NeueMontreal-Regular.otf', weight: '200', style: 'normal' },
    { path: './fonts/NeueMontreal-Medium.otf', weight: '400', style: 'normal' },
    { path: './fonts/NeueMontreal-Bold.otf', weight: '700', style: 'normal' },
    { path: './fonts/NeueMontreal-RegularItalic.otf', weight: '200', style: 'italic' },
    { path: './fonts/NeueMontreal-MediumItalic.otf', weight: '400', style: 'italic' },
    { path: './fonts/NeueMontreal-BoldItalic.otf', weight: '700', style: 'italic' },
  ],
  variable: '--font-neue-montreal',
  display: 'swap',
  preload: true,
})

export const metadata: Metadata = {
  title: 'CUMSA Membership Registration',
  description: 'Register as a CUMSA member to enjoy our benefits!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${neueMontreal.className} ${neueMontreal.variable}`}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
