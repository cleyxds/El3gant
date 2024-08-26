import { redirect } from "next/navigation"

import { getToken } from "../actions/auth"

// @ts-ignore
export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const token = await getToken()

  if (!token) redirect("/login")

  return children
}
