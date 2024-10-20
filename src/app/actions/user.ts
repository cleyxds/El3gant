"use server"

import { cache } from "react"

import { getServerSession } from "next-auth"

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
} from "firebase/firestore"

import { db } from "@/services/firebase"

import { SocialProfile, UserDetailsGoogleProfile } from "@/types/auth"

const USER_DETAILS_COLLECTION = "user_details"

export const getUserDetails = cache(async (): Promise<User | null> => {
  const session = await getServerSession()
  const email = session?.user?.email

  if (!email) return null

  const collectionRef = collection(db, USER_DETAILS_COLLECTION)

  const q = query(collectionRef, where("email", "==", email))

  const querySnapshot = await getDocs(q)

  const userDetailsRef = querySnapshot.docs[0]

  const userDetails = {
    docID: userDetailsRef.id,
    ...userDetailsRef.data(),
  } as User

  if (!userDetails.avatar_url) {
    userDetails.avatar_url = session.user?.image!
  }

  return userDetails
})

export async function createUserDetails(
  provider: string,
  profile: SocialProfile
) {
  const email = profile.email as string
  const emailId = email.toLowerCase()

  const userDocRef = doc(db, USER_DETAILS_COLLECTION, emailId)

  const docSnapshot = await getDoc(userDocRef)

  // Guard of the user already exists
  if (docSnapshot.exists()) return userDocRef.id

  let PROFILE_DATA

  const GOOGLE_PROFILE_DATA: UserDetailsGoogleProfile = {
    provider,
    userID: profile.email!,
    login: profile.email!,
    avatar_url: profile.picture!,
    name: profile.name!,
    email,
  }

  const EMAIL_PROFILE_DATA = {
    provider,
    userID: profile.login,
    login: profile.login,
    name: profile.name!,
    email,
  }

  // prettier-ignore
  PROFILE_DATA = provider === "credentials" ? EMAIL_PROFILE_DATA : GOOGLE_PROFILE_DATA

  const now = new Date()
  const DEFAULT_ACCOUNT_DATA = {
    admin: false,
    created_at: now,
    updated_at: now,
    deleted_at: null,
    published_at: now,
    published: true,
  }

  const data = {
    ...DEFAULT_ACCOUNT_DATA,
    ...PROFILE_DATA,
  }

  await setDoc(userDocRef, data, { merge: true })

  return userDocRef.id
}
