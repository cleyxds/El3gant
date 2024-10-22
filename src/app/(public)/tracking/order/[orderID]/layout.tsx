import { redirect } from "next/navigation"

import { isAuthenticated } from "@/app/actions/auth"
import { getUserDetails } from "@/app/actions/user"
import { checkOrderOwnershipByUserID } from "@/app/actions/orders"

// @ts-ignore
export default async function OrderProtectedLayout({
  children,
  params: { orderID },
}: Readonly<{
  children: React.ReactNode
  params: { orderID: string }
}>) {
  const authenticated = await isAuthenticated()
  const userID = await getUserDetails().then((user) => user?.userID)
  const isUserOrderOwner = await checkOrderOwnershipByUserID(orderID, userID!)

  if (!authenticated) {
    redirect("/login")
  }

  if (!isUserOrderOwner) {
    redirect("/profile")
  }

  return children
}
