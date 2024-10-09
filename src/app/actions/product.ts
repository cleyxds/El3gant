"use server"

import { redirect } from "next/navigation"
import { revalidatePath } from "next/cache"

import {
  collection,
  addDoc,
  getDocs,
  where,
  query,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore"

import { db } from "@/services/firebase"

import { getUserDetails } from "./user"

import { CreateProductTypes } from "../(admin)/admin/products/create/create-product-form"

const PRODUCTS_COLLECTION = "products"

export async function createProduct(product: CreateProductTypes) {
  product.created_by = await getUserDetails().then((user) => user?.userID)

  const collectionRef = collection(db, PRODUCTS_COLLECTION)

  const docRef = await addDoc(collectionRef, product)

  return docRef.id
}

export async function onCreateProduct(productID: string) {
  if (!productID) return

  revalidatePath("/admin/products")

  redirect("/admin/products")
}

export async function togglePublishProduct(
  productID: string,
  published: boolean
) {
  const docRef = doc(db, PRODUCTS_COLLECTION, productID)

  await updateDoc(docRef, {
    published,
    published_at: serverTimestamp(),
    published_by: await getUserDetails().then((user) => user?.userID),
  })

  return docRef.id
}

export async function onTogglePublish(productID: string, published: boolean) {
  await togglePublishProduct(productID, published)

  revalidatePath("/admin/products")
  revalidatePath("/")
}

export async function getProducts(createdBy: string | undefined) {
  const collectionRef = collection(db, PRODUCTS_COLLECTION)

  const q = query(collectionRef, where("created_by", "==", createdBy))

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

export async function getProductsBySlugs(slugs: string[]) {
  const collectionRef = collection(db, PRODUCTS_COLLECTION)

  const q = query(collectionRef, where("slug", "in", slugs))

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
