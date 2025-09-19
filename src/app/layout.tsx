import './globals.css'
import '../styles/translate.css'
import { AuthProvider } from '@/contexts/AuthContext'
import '../components/UserProfile.css'
// Keep all your existing imports and code

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
