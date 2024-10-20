"use client"

import { signOut } from "next-auth/react"

import { useMutation } from "@tanstack/react-query"

import Button from "@mui/material/Button"
import Avatar from "@mui/material/Avatar"
import CircularProgress from "@mui/material/CircularProgress"

import { logout } from "@/app/actions/auth"

export const LOGOUT_MUTATION_KEY = "logout"

export default function Logout() {
  const { mutate: mutateSignOut, isPending: isSigningOut } = useMutation({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: async () => logout().then(() => signOut()),
  })

  return (
    <Button
      onClick={() => mutateSignOut()}
      startIcon={<Avatar />}
      type="submit"
      variant="rect"
      sx={{
        alignSelf: "flex-start",
        fontFamily: "var(--font-poppins)",
        fontWeight: 300,
      }}
    >
      {isSigningOut ? "Saindo..." : "Sair"}

      {isSigningOut && (
        <CircularProgress size={20} color="inherit" sx={{ mx: ".5rem" }} />
      )}
    </Button>
  )
}
