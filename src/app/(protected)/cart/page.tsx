// import Image from "next/image"

// import { useContext, useState } from "react"

// import { Text } from "../../../ui/text"

// import { CartContext } from "../../../contexts/CartContext"
// import { styled } from "@mui/material"

import { redirect } from "next/navigation"

import { getToken } from "@/app/actions/auth"

export default async function CartPage() {
  const token = await getToken()

  if (!token) redirect("/login")

  return null
}
