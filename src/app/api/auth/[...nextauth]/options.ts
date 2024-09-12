import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const userCredential = {
          password: credentials?.password,
          email: credentials?.email,
        }

        const resp = await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(userCredential),
          cache: 'no-store',
        })

        const user = await resp.json()

        if (resp.ok && user) {
          return user
        }
      },
    }),
  ],
  session: {
    maxAge: 60 * 60, // 1 hora
    strategy: 'jwt',
  },
  pages: {
    signIn: '/',
    signOut: '/',
    error: '/',
  },
  callbacks: {
    async jwt({ token, user }) {
      const jwtReturn = {
        ...token,
        ...user,
      }

      return jwtReturn
    },

    async session({ session, token }) {
      /* eslint-disable-next-line @typescript-eslint/no-explicit-any */
      session.user = token as any

      return session
    },
  },
}
