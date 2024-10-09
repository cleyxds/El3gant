import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"

export default function ExplorePage() {
  return (
    <Container>
      <Header nav={false} />

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

        <Typography>Explorar</Typography>
      </Breadcrumbs>

      <Typography color="white">Explore Animation</Typography>
    </Container>
  )
}
