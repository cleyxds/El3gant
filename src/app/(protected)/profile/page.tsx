import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import Header from "@/components/header"
import Logout from "@/components/logout"
import AdminRouteButtons from "@/components/admin-route-buttons"

import { getToken, validateAdminRole } from "@/app/actions/auth"
import { getUserDetails } from "@/app/actions/user"

export default async function ProfilePage() {
  const token = await getToken()
  const user = await getUserDetails()
  const admin = await validateAdminRole(user)

  return (
    <Container>
      <Header nav={false} />

      <Stack gap="1rem">
        <Typography variant="h3" color="white">
          Olá {user?.name} 😎👍🏾
        </Typography>

        <Button
          variant="rect"
          LinkComponent={Link}
          href="cart"
          sx={{
            alignSelf: "flex-start",
            fontFamily: "var(--font-poppins)",
            fontWeight: 300,
          }}
        >
          Seu carrinho de compras
        </Button>

        {admin && <AdminRouteButtons />}

        {token && <Logout />}
      </Stack>
    </Container>
  )
}
