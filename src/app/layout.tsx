import { Noto_Sans_JP } from 'next/font/google'
import Navbar from './components/Navbar'
import './globals.css'

const notoSansJP = Noto_Sans_JP({ 
  subsets: ['latin'],
  weight: ['400', '700'], // You can add more weights if needed
})

export const metadata = {
  title: "Feuter's Analysis",
  description: 'Stock analysis and picking tools',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${notoSansJP.className} text-gray-800 bg-gray-50`}>
        <Navbar />
        <main className="pt-16">
          {children}
        </main>
      </body>
    </html>
  )
}
