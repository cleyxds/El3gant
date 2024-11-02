import Link from "next/link"
import Image from "next/image"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Badge from "@mui/material/Badge"

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"

import { isAuthenticated } from "@/app/actions/auth"
import { getUserDetails } from "@/app/actions/user"

import { APP_NAME } from "@/config"

type HeaderProps = {
  nav?: boolean
  type?: "cart" | "profile"
}
export default async function Header({ nav = true, type }: HeaderProps) {
  const authenticated = await isAuthenticated()
  const currentUser = await getUserDetails()
  const shoppingCartCount = 0

  return (
    <Stack
      component="header"
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
        <Image src="/logo.png" width={40} height={40} alt="Logo: Jewerly App" />

        <Typography
          color="rgb(240, 240, 240)"
          fontFamily="var(--font-poppins)"
          fontSize="1.5rem"
          fontWeight="500"
        >
          {APP_NAME}
        </Typography>
      </Stack>

      {nav && (
        <Stack component="nav" gap="6rem" direction="row" alignItems="center">
          {type !== "cart" && (
            <Stack gap="2rem" direction="row" alignItems="center">
              <Typography
                fontWeight="300"
                fontSize="1rem"
                fontFamily="var(--font-poppins)"
                color="rgb(240, 240, 240)"
                component={Link}
                href="/"
              >
                Início
              </Typography>

              <Typography
                fontWeight="300"
                fontSize="1rem"
                fontFamily="var(--font-poppins)"
                color="rgb(240, 240, 240)"
                component={Link}
                href="#about"
              >
                Sobre
              </Typography>

              <Typography
                fontWeight="300"
                fontSize="1rem"
                fontFamily="var(--font-poppins)"
                color="rgb(240, 240, 240)"
                component={Link}
                href="#jewerly"
              >
                Jóias
              </Typography>

              <Typography
                fontWeight="300"
                fontSize="1rem"
                fontFamily="var(--font-poppins)"
                color="rgb(240, 240, 240)"
                component={Link}
                href="explore"
              >
                Catálogo
              </Typography>
            </Stack>
          )}

          <Stack
            component="section"
            direction="row"
            alignItems="center"
            gap="1rem"
          >
            {authenticated ? (
              <Stack direction="row" alignItems="center" gap="1rem">
                <IconButton
                  LinkComponent={Link}
                  href="cart"
                  aria-label="shopping-cart"
                  sx={{ color: "common.white" }}
                >
                  <Badge
                    badgeContent={shoppingCartCount}
                    color="secondary"
                    sx={{
                      "& .MuiBadge-badge": {
                        right: -3,
                        top: 13,
                        padding: "0 4px",
                      },
                    }}
                  >
                    <ShoppingCartIcon />
                  </Badge>
                </IconButton>

                {type !== "cart" && (
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
                )}
              </Stack>
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
                  backgroundColor: "transparent",
                  borderRadius: 0,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: "1.045rem",

                  "&:hover": {
                    filter: "brightness(0.9)",
                    backgroundColor: "#00000080",
                  },
                }}
              >
                Log In
              </Button>
            )}

            {type !== "cart" && (
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
            )}
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}
