import { ElementType } from "react"

import Stack from "@mui/material/Stack"

import Account from "./account"
import Address from "./address"
import Orders from "./orders"
import Admin from "./admin"

const ComponentsMap: Record<
  string,
  ElementType<any, keyof JSX.IntrinsicElements>
> = {
  account: Account,
  address: Address,
  orders: Orders,
  admin: Admin,
  none: () => null,
}

export default function Details({
  user,
  selectedOption,
}: {
  user: User
  selectedOption: string
}) {
  const Component = ComponentsMap[selectedOption] ?? ComponentsMap["none"]

  return (
    <Stack flex={1}>
      <Component user={user} />
    </Stack>
  )
}
