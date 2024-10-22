"use server"

import { cache } from "react"

import { revalidatePath } from "next/cache"

import { getServerSession } from "next-auth"

import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  FieldPath,
  Timestamp,
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

  const data = userDetailsRef.data() as User

  const userDetails = {
    ...data,
    docID: userDetailsRef.id,
    created_at: data.created_at?.seconds,
    updated_at: data.updated_at?.seconds,
    deleted_at: data.deleted_at?.seconds,
    published_at: data.published_at?.seconds,
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

export async function updateUserDetails(
  docID: string,
  data: Partial<User>,
  revalidate?: string
) {
  const userDocRef = doc(db, USER_DETAILS_COLLECTION, docID)

  const user = data as Partial<User> & FieldPath

  const now = Timestamp.now()
  user.updated_at = now

  await updateDoc(userDocRef, user, { merge: true })

  if (revalidate) {
    revalidatePath(revalidate)
  }
}
