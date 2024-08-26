"use server"

import { collection, addDoc, getDocs, where, query } from "firebase/firestore"

import { db } from "@/services/firebase"

const PRODUCTS_COLLECTION = "products"

export async function createProduct() {
  const product: Product = {
    name: "Pikup: Anel de designer em prata esterlina",
    price: 549.29,
    slug: "pikup-anel-de-designer-em-prata-esterlina",
    image_url: "/_next/static/media/ring2.e4355fec.png",
    title: "Anel de designer em prata esterlina",
    description:
      "Lorem ipsum dolor sit amet. Qui consequatur sint 33 voluptatem officia et sint laboriosam sed ipsa sint ut voluptatum labore et possimus voluptas. Vel vitae temporibus sit nulla consequatur in illo galisum eo",
    categories: ["prata", "anel"],
    created_by: "OOKdVPBgS6fHtX6hdvgwJOnGioq2",
  }

  const collectionRef = collection(db, PRODUCTS_COLLECTION)
  const docRef = await addDoc(collectionRef, product)

  return docRef.id
}

export async function getProducts(createdBy: string | undefined) {
  const collectionRef = collection(db, PRODUCTS_COLLECTION)

  const q = query(collectionRef, where("created_by", "==", createdBy))

  const snapshot = await getDocs(q)

  const products = snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))

  return products as unknown as Product[]
}
