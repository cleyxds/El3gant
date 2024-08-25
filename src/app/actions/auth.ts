"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { auth } from "@/services/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"

const TOKEN_COOKIE_NAME = "token"
const DEFAULT_REDIRECT = "/"

export async function createAccount({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await createUserWithEmailAndPassword(auth, email, password)

  const token = await user.user?.getIdToken()

  cookies().set(TOKEN_COOKIE_NAME, token)

  revalidatePath("/get-started")
  redirect("/get-started")
}

export async function login({
  email,
  password,
}: {
  email: string
  password: string
}) {
  const user = await signInWithEmailAndPassword(auth, email, password)

  const token = await user.user?.getIdToken()

  cookies().set(TOKEN_COOKIE_NAME, token)

  revalidatePath(DEFAULT_REDIRECT)
  redirect(DEFAULT_REDIRECT)
}

export async function logout() {
  await signOut(auth)

  cookies().delete(TOKEN_COOKIE_NAME)

  revalidatePath(DEFAULT_REDIRECT)
  redirect(DEFAULT_REDIRECT)
}

export async function getToken() {
  const token = cookies().get(TOKEN_COOKIE_NAME)

  return token?.value
}
