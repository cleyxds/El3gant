import Link from "next/link"
import Image from "next/image"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { getToken } from "@/app/actions/auth"

import { APP_NAME } from "../config"

import Logo from "../assets/Logo.png"

type HeaderProps = {
  nav?: boolean
}
export default async function Header({ nav = true }: HeaderProps) {
  const token = await getToken()

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

        <Typography color="rgb(240, 240, 240)" variant="h6">
          {APP_NAME}
        </Typography>
      </Stack>

      {nav && (
        <Stack gap="6rem" direction="row" alignItems="center">
          <Stack gap="2rem" direction="row" alignItems="center">
            <Typography
              variant="body1"
              color="rgb(240, 240, 240)"
              component={Link}
              href="/"
            >
              Início
            </Typography>

            <Typography
              variant="body1"
              color="rgb(240, 240, 240)"
              component={Link}
              href="#about"
            >
              Sobre
            </Typography>

            <Typography
              variant="body1"
              color="rgb(240, 240, 240)"
              component={Link}
              href="#jewerly"
            >
              Jóias
            </Typography>

            <Typography
              variant="body1"
              color="rgb(240, 240, 240)"
              component={Link}
              href="catalog"
            >
              Catálogo
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="center" gap="1rem">
            {token ? (
              <Button LinkComponent={Link} href="profile">
                <Typography variant="body2">Cleyson Barbosa</Typography>
              </Button>
            ) : (
              <Button variant="contained" LinkComponent={Link} href="login">
                <Typography variant="body2">Login</Typography>
              </Button>
            )}

            <Button variant="contained" href="get-started">
              <Typography variant="body2">Começar</Typography>
            </Button>
          </Stack>
        </Stack>
      )}
    </Stack>
  )
}

// const HeaderContainer = styled(Stack)`
//   padding: 16px 64px;
//   justify-content: space-between;
//   position: sticky;
//   top: 0;
//   z-index: 2;
//   backdrop-filter: blur(8px);
// `

// const GetStartedButton = styled(Button)`
//   font-weight: 500;
//   background-color: #ffffff;
//   color: #000000;
//   border: 0;

//   &:hover {
//     background-color: #f0f0f0;
//   }
// `
