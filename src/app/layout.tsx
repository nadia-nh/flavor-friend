import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'FlavorFriend - Expand Your Palate',
  description: 'A gentle guide to trying new foods at your own pace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}