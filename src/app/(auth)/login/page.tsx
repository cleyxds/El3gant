"use client"

import Link from "next/link"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Box from "@mui/material/Box"

import Image from "@/components/image"
import AuthTabs from "./auth-tabs"

import { APP_NAME } from "@/config"

import LogoImage from "@/assets/Logo.png"

export default function LoginPage() {
  return (
    <Container>
      <Stack gap="2rem">
        <Stack
          component={Link}
          href="/"
          justifyContent="center"
          alignItems="center"
          alignSelf="center"
          gap="1rem"
          paddingTop="2rem"
          paddingBottom="2rem"
        >
          <Image src={LogoImage} alt="Logo" width={48} height={48} />

          <Typography
            color="rgb(240, 240, 240)"
            fontFamily="var(--font-poppins)"
            variant="h5"
            fontWeight="500"
          >
            {APP_NAME}
          </Typography>
        </Stack>

        <Box width="25rem" margin="auto">
          <AuthTabs />
        </Box>
      </Stack>
    </Container>
  )
}
