import { redirect } from "next/navigation"

import { isAuthenticated } from "../actions/auth"

// @ts-ignore
export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const authenticated = await isAuthenticated()

  if (!authenticated) redirect("/login")

  return children
}
