"use server"

import { revalidatePath } from "next/cache"

import { db } from "@/services/firebase"

import {
  addDoc,
  collection,
  doc,
  FieldPath,
  getDocs,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore"

const ADDRESS_COLLECTION = "addresses"

export async function getAddresses(userID: string | undefined) {
  const collectionRef = collection(db, ADDRESS_COLLECTION)
  if (!userID) return []

  const q = query(collectionRef, where("userID", "==", userID))
  const snapshot = await getDocs(q)

  const addresses = snapshot.docs.map((doc) => {
    const data = doc.data()
    return {
      ...data,
      docID: doc.id,
      created_at: data?.created_at?.seconds,
      updated_at: data?.updated_at?.seconds,
    }
  }) as Address[]

  if (!addresses.length) return []

  return addresses
}

export async function createAddress(address: Address, revalidate?: string) {
  const collectionRef = collection(db, ADDRESS_COLLECTION)

  const now = Timestamp.now()
  address.created_at = now

  const docRef = await addDoc(collectionRef, address)

  if (revalidate) {
    revalidatePath(revalidate)
  }

  return docRef.id
}

export async function updateAddress(
  docID: string,
  data: Partial<Address>,
  revalidate?: string
) {
  const userDocRef = doc(db, ADDRESS_COLLECTION, docID)

  const address = data as Partial<Address> & FieldPath

  const now = Timestamp.now()
  address.updated_at = now

  await updateDoc(userDocRef, address, { merge: true })

  if (revalidate) {
    revalidatePath(revalidate)
  }
}
