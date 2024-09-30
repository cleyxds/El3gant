import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

import { login } from "@/app/actions/auth"

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string
        const password = credentials?.password as string

        const firebase_auth_user = await login({
          email,
          password,
        })

        const authentication_user: User = {
          id: firebase_auth_user.uid,
          email: firebase_auth_user.email,
        }

        return authentication_user
      },
    }),
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    redirect: () => "/",
  },
})

export { handler as GET, handler as POST }
