"use client"

import { useReducer } from "react"

import Stack from "@mui/material/Stack"

import Account from "./account"
import Details from "./details"

export type Option = {
  name: string
  key: string
}

const filterAdmin = (admin: boolean, option: Option) => {
  if (option.key === "admin" && !admin) {
    return false
  }

  return true
}

export default function MyAccount({
  user,
  admin,
}: {
  user: User
  admin: boolean
}) {
  const options: Option[] = [
    {
      name: "Conta",
      key: "account",
    },
    {
      name: "Endereços",
      key: "address",
    },
    {
      name: "Pedidos",
      key: "orders",
    },
    {
      name: "Admin",
      key: "admin",
    },
    {
      name: "Sair",
      key: "sign-out",
    },
  ].filter((option) => filterAdmin(admin, option))

  const actions = useReducer(
    (_: string, action: string) => action,
    options[0].key
  )

  return (
    <Stack direction="row" gap="4rem" color="common.white" flex={1}>
      <Account user={user} actions={actions} options={options} />

      <Details selectedOption={actions[0]} />
    </Stack>
  )
}
