"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { cookies } from "next/headers"

import { getServerSession } from "next-auth"

import { auth } from "@/services/firebase"
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth"

const TOKEN_COOKIE_NAME = "token"
const USER_ID_COOKIE_NAME = "user_id"
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
  cookies().set(USER_ID_COOKIE_NAME, user.user.uid)

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
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password)

    revalidatePath(DEFAULT_REDIRECT)

    return user
  } catch (error) {
    throw error
  }
}

export async function logout() {
  try {
    await signOut(auth)

    revalidatePath(DEFAULT_REDIRECT)
  } catch (error) {
    throw error
  }
}

export async function isAuthenticated() {
  const session = await getServerSession()
  return !!session
}

export async function validateAdminRole(user: User | null) {
  if (!user) return false

  return user?.admin
}
