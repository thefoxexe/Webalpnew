import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Merci',
  robots: { index: false, follow: false },
  alternates: { canonical: 'https://webalp.ch/merci' },
}

export default function MerciLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
