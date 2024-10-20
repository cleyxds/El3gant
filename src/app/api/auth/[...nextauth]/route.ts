import NextAuth, { User } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google"

import { login } from "@/app/actions/auth"
import { createUserDetails } from "@/app/actions/user"

import { CredentialsProfile, SocialProfile } from "@/types/auth"

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
    signIn: async ({ profile, account, user }) => {
      if (!account) return false

      const provider = account.provider

      let UserDetailsProfile: SocialProfile | null = null

      if (provider === "google") {
        UserDetailsProfile = profile as Extract<SocialProfile, GoogleProfile>
      }

      if (provider === "credentials") {
        const email = user.email!

        const CredentialsProfile = {
          login: email,
          name: email,
          email,
        } as Extract<SocialProfile, CredentialsProfile>

        UserDetailsProfile = CredentialsProfile
      }

      if (UserDetailsProfile) {
        // prettier-ignore
        return await createUserDetails(provider, UserDetailsProfile).then( () => true)
      }

      return false
    },
  },
})

export { handler as GET, handler as POST }
