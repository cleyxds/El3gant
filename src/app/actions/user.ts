"use server"

import { cookies } from "next/headers"

import { collection, query, where, getDocs } from "firebase/firestore"

import { db } from "@/services/firebase"

const USER_DETAILS_COLLECTION = "user_details"

export async function getUserDetails() {
  const userID = cookies().get("user_id")?.value
  if (!userID) return null

  const collectionRef = collection(db, USER_DETAILS_COLLECTION)

  const q = query(collectionRef, where("userID", "==", userID))

  const querySnapshot = await getDocs(q)

  const userDetailsRef = querySnapshot.docs[0]

  const userDetails = {
    docID: userDetailsRef.id,
    ...userDetailsRef.data(),
  } as User

  return userDetails
}
