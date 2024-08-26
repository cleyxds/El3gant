"use server"

import { collection, getDocs } from "firebase/firestore"

import { db } from "@/services/firebase"

const INVENTORY_COLLECTION = "inventory"

export async function getInventory() {
  const collectionRef = collection(db, INVENTORY_COLLECTION)

  const snapshot = await getDocs(collectionRef)

  const inventory = snapshot.docs.map((doc) => ({
    docID: doc.id,
    ...doc.data(),
  }))

  return inventory as unknown as InventoryItem[]
}
