"use client"

import { signOut } from "next-auth/react"

import { useMutation } from "@tanstack/react-query"

import Avatar from "@mui/material/Avatar"
import CircularProgress from "@mui/material/CircularProgress"

import { Option } from "@/app/(protected)/profile/account"

import { logout } from "@/app/actions/auth"

export const LOGOUT_MUTATION_KEY = "logout"

export default function Logout({ user }: { user: User }) {
  const { mutate: mutateSignOut, isPending: isSigningOut } = useMutation({
    mutationKey: [LOGOUT_MUTATION_KEY],
    mutationFn: async () => logout().then(() => signOut()),
  })

  return (
    <Option
      disabled={isSigningOut}
      startIcon={
        <Avatar
          src={user.avatar_url}
          sx={{ width: "1.5rem", height: "1.5rem" }}
        />
      }
      onClick={() => mutateSignOut()}
      type="submit"
    >
      {isSigningOut ? "Saindo..." : "Sair"}

      {isSigningOut && (
        <CircularProgress size={20} color="inherit" sx={{ mx: ".5rem" }} />
      )}
    </Option>
  )
}
