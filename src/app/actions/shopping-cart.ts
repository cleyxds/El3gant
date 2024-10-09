"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import { db } from "@/services/firebase"
import {
  addDoc,
  collection,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from "firebase/firestore"

import { getUserDetails } from "@/app/actions/user"
import { getProductsBySlugs } from "./product"

const SHOPPING_CART_COLLECTION = "shopping_cart"

export async function addToShoppingCart(slug: string) {
  const userID = await getUserDetails().then((user) => user?.userID)

  if (!userID) redirect("/login")

  const collectionRef = collection(db, SHOPPING_CART_COLLECTION)

  const q = query(
    collectionRef,
    where("userID", "==", userID),
    where("product_slug", "==", slug)
  )

  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
    const document = querySnapshot.docs[0]
    const docRef = document.ref

    await updateDoc(docRef, {
      quantity: increment(1),
    })

    return docRef.id
  }

  const shopping_cart = {
    userID,
    product_slug: slug,
    quantity: 1,
  }

  const docRef = await addDoc(collectionRef, shopping_cart)

  return docRef.id
}

export async function onAddFromCard(data: Jewelry) {
  await addToShoppingCart(data.slug)

  revalidatePath("/cart")
}

export async function removeQuantityromShoppingCart(
  docID: string,
  quantity: number
) {
  const docRef = doc(db, SHOPPING_CART_COLLECTION, docID)

  await updateDoc(docRef, {
    quantity: increment(quantity),
  })

  revalidatePath("/cart")
}

export async function getShoppingCart(userID: string | undefined) {
  const collectionRef = collection(db, SHOPPING_CART_COLLECTION)
  if (!userID) return []

  const q = query(collectionRef, where("userID", "==", userID))
  const snapshot = await getDocs(q)

  const shoppingCart = snapshot.docs.map((doc) => ({
    docID: doc.id,
    ...doc.data(),
  })) as ShoppingCart[]

  const productSlugs = shoppingCart.map((item) => item.product_slug)
  const products = await getProductsBySlugs(productSlugs)

  const data = shoppingCart
    .map((item) => {
      const product = products.find(
        (product) => product.slug === item.product_slug
      )

      return { ...item, product }
    })
    .filter((item) => item.product?.published)

  return data as ShoppingCart[]
}
