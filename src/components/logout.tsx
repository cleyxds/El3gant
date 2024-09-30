"use client"

import { signOut } from "next-auth/react"

import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"

import { logout } from "@/app/actions/auth"

export default function Logout() {
  return (
    <Button
      onClick={() => logout().then(() => signOut())}
      startIcon={<Avatar />}
      type="submit"
      variant="rect"
      sx={{
        alignSelf: "flex-start",
        fontFamily: "var(--font-poppins)",
        fontWeight: 300,
      }}
    >
      Logout
    </Button>
  )
}
