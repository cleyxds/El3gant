"use server"

import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/services/firebase"

const JEWELRY_COLLECTION = "products"

export async function getHomepageJewelries() {
  const collectionRef = collection(db, JEWELRY_COLLECTION)

  const q = query(collectionRef, where("published", "==", true))

  const snapshot = await getDocs(q)

  const products = snapshot.docs.map((doc) => {
    const data = doc.data() as Product

    return {
      ...data,
      docID: doc.id,
      published_at: data?.published_at?.seconds,
      created_at: data?.created_at?.seconds,
    }
  })

  return products as unknown as Product[]
}
