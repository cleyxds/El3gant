import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"
import Logout from "@/components/logout"
import AdminRouteButtons from "@/components/admin-route-buttons"

import { getToken, validateAdminRole } from "@/app/actions/auth"
import { getUserDetails } from "@/app/actions/user"

export default async function ProfilePage() {
  const authenticated = await getToken()
  const user = await getUserDetails()
  const admin = await validateAdminRole(user)

  return (
    <Container>
      <Header nav={false} />

      <Stack gap="1rem">
        <Breadcrumbs
          aria-label="breadcrumb"
          sx={{
            color: "common.white",
            p: "0.25rem",
            alignSelf: "flex-start",
          }}
        >
          <Stack
            component={Link}
            href="/"
            sx={{
              textDecoration: "underline",
              transition: "color 0.5s ease",

              "&:hover": {
                transition: "color 0.5s ease",
                color: "#FFFFFF80",
              },
            }}
          >
            Início
          </Stack>

          <Typography>Perfil</Typography>
        </Breadcrumbs>

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
        {authenticated && <Logout />}
      </Stack>
    </Container>
  )
}
