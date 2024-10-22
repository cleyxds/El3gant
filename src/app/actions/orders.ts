"use server"

import { db } from "@/services/firebase"

import { collection, getDocs, query, where } from "firebase/firestore"

const ORDERS_COLLECTION = "orders"

export async function getOrders(userID: string | undefined) {
  const collectionRef = collection(db, ORDERS_COLLECTION)
  if (!userID) return []

  const q = query(collectionRef, where("userID", "==", userID))
  const snapshot = await getDocs(q)

  const orders = snapshot.docs.map((doc) => {
    const data = doc.data()

    return {
      ...data,
      docID: doc.id,
      placed_at: data.placed_at.seconds,
      created_at: data?.created_at?.seconds,
      updated_at: data?.updated_at?.seconds,
    }
  }) as Order[]

  if (!orders.length) return []

  return orders
}

export async function checkOrderOwnershipByUserID(
  orderID: string,
  userID: string
) {
  const collectionRef = collection(db, ORDERS_COLLECTION)
  const q = query(collectionRef, where("orderID", "==", orderID))
  const snapshot = await getDocs(q)

  const order = snapshot.docs.map((doc) => doc.data())[0] as Order

  return order.userID === userID
}
