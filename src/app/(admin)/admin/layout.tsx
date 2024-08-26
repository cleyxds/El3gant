import { notFound } from "next/navigation"

import { validateAdminRole } from "../../actions/auth"
import { getUserDetails } from "@/app/actions/user"

// @ts-ignore
export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const admin = await getUserDetails().then(validateAdminRole)

  if (!admin) notFound()

  return children
}
