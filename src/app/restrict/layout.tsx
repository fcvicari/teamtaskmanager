import { PublicFooter } from '@/components/footer/publicFooter'
import { RestrictHeader } from '@/components/header/restrictHeader'
import AuthProvider from '../../context/authProvider'

export default async function InvestorLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
      <div className="flex flex-col w-full min-h-dvh">
        <RestrictHeader />

        <main className="flex w-full px-3 md:px-10 lg:px-20 border-[hsl(var(--sessionBorder))]">
          {children}
        </main>

        <PublicFooter />
      </div>
    </AuthProvider>
  )
}
