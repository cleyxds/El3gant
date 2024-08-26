"use server"

import { collection, getDocs, query, where } from "firebase/firestore"

import { db } from "@/services/firebase"

const JEWELRY_COLLECTION = "products"

export async function getHomepageJewelries() {
  const collectionRef = collection(db, JEWELRY_COLLECTION)

  const q = query(collectionRef, where("published", "==", true))

  const snapshot = await getDocs(q)

  const products = snapshot.docs.map((doc) => ({
    docID: doc.id,
    ...doc.data(),
  }))

  return products as unknown as Product[]
}
