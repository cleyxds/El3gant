import { GoogleProfile } from "next-auth/providers/google"

type SocialProfile = GoogleProfile & CredentialsProfile

type CredentialsProfile = {
  login: string
  name: string
  email: string
}

type Profile = {
  provider: string
}

type UserDetailsGoogleProfile = {
  userID: string
  login: string
  avatar_url: string
  name: string
  email: string
} & Profile
