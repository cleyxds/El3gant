"use server"

import { cache } from "react"

import { getServerSession } from "next-auth"

import { collection, query, where, getDocs } from "firebase/firestore"

import { db } from "@/services/firebase"

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

  userDetails.avatar_url = session.user?.image!

  return userDetails
})
