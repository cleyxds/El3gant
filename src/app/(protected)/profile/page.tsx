import { redirect } from "next/navigation"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"
import Logout from "@/components/logout"

import { getToken } from "@/app/actions/auth"

export default async function ProfilePage() {
  const token = await getToken()

  if (!token) redirect("/login")

  return (
    <Container>
      <Header nav={false} />

      <Typography variant="h3" color="white">
        Profile
      </Typography>

      {token && <Logout />}
    </Container>
  )
}
