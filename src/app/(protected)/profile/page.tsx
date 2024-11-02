import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"

import MyAccount from "./my-account"

import { getUserDetails } from "@/app/actions/user"
import { validateAdminRole } from "@/app/actions/auth"
import { getAddresses } from "@/app/actions/address"

export default async function ProfilePage() {
  const user = await getUserDetails()
  const admin = await validateAdminRole(user)
  const addresses = await getAddresses(user?.userID)

  if (user) {
    user.addresses = addresses
  }

  return (
    <Container>
      <Header type="cart" />

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

        <Stack px="10rem">
          <Stack alignItems="center">
            <Typography
              lineHeight="6.8125rem"
              fontSize="3.375rem"
              fontFamily="var(--font-poppins)"
              color="common.white"
            >
              Minha conta
            </Typography>
          </Stack>

          <MyAccount user={user!} admin={admin!} />
        </Stack>
      </Stack>
    </Container>
  )
}
