import Link from "next/link"
import Image from "next/image"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"

import { getToken } from "@/app/actions/auth"
import { getUserDetails } from "@/app/actions/user"

import { APP_NAME } from "../config"

import Logo from "../assets/Logo.png"

type HeaderProps = {
  nav?: boolean
}
export default async function Header({ nav = true }: HeaderProps) {
  const token = await getToken()
  const currentUser = await getUserDetails()

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      position="sticky"
      top={0}
      zIndex={2}
      p="1rem 4rem"
      sx={{
        backdropFilter: "blur(8px)",
      }}
    >
      <Stack
        gap="1rem"
        direction="row"
        alignItems="center"
        component={Link}
        href="/"
      >
        <Image src={Logo} alt="Logo: Jewerly App" />

        <Typography color="rgb(240, 240, 240)" variant="h5" fontWeight="500">
          {APP_NAME}
        </Typography>
      </Stack>

      {nav && (
        <Stack gap="6rem" direction="row" alignItems="center">
          <Stack gap="2rem" direction="row" alignItems="center">
            <Typography
              variant="h6"
              fontWeight="300"
              fontSize="1rem"
              color="rgb(240, 240, 240)"
              component={Link}
              href="/"
            >
              Início
            </Typography>

            <Typography
              variant="h6"
              fontWeight="300"
              fontSize="1rem"
              color="rgb(240, 240, 240)"
              component={Link}
              href="#about"
            >
              Sobre
            </Typography>

            <Typography
              variant="h6"
              fontWeight="300"
              fontSize="1rem"
              color="rgb(240, 240, 240)"
              component={Link}
              href="#jewerly"
            >
              Jóias
            </Typography>

            <Typography
              variant="h6"
              fontWeight="300"
              fontSize="1rem"
              color="rgb(240, 240, 240)"
              component={Link}
              href="catalog"
            >
              Catálogo
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap="1rem">
            {token ? (
              <Button
                LinkComponent={Link}
                href="profile"
                sx={{
                  minWidth: "6.25rem",
                  height: "2.4375rem",
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  borderRadius: 0,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: "1.045rem",
                  gap: "0.5rem",

                  "&:hover": {
                    filter: "brightness(0.9)",
                  },
                }}
              >
                <Avatar
                  src={currentUser?.avatar_url}
                  alt={currentUser?.name}
                  sx={{
                    width: "1.5rem",
                    height: "1.5rem",
                  }}
                />
                Seu perfil
              </Button>
            ) : (
              <Button
                LinkComponent={Link}
                href="login"
                sx={{
                  maxWidth: "6.25rem",
                  width: "6.25rem",
                  height: "2.4375rem",
                  border: "1px solid #FFFFFF",
                  color: "#FFFFFF",
                  backgroundColor: "#000000",
                  borderRadius: 0,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: "1.045rem",

                  "&:hover": {
                    filter: "brightness(0.9)",
                    backgroundColor: "#000000",
                  },
                }}
              >
                Log In
              </Button>
            )}

            <Button
              LinkComponent={Link}
              href="get-started"
              sx={{
                maxWidth: "7.375rem",
                width: "7.375rem",
                height: "2.5rem",
                color: "#000000",
                backgroundColor: "rgba(255, 255, 255, 1)",
                borderRadius: 0,
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: "1.045rem",

                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.9)",
                },
              }}
            >
              Começar
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
