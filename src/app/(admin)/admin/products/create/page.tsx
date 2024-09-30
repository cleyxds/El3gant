import Link from "next/link"

import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"
import ProductPreview from "../product-preview"
import CreateProductForm from "./create-product-form"

export default function AdminCreateProductPage() {
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

        <Stack
          component={Link}
          href="/profile"
          sx={{
            textDecoration: "underline",
            transition: "color 0.5s ease",

            "&:hover": {
              transition: "color 0.5s ease",
              color: "#FFFFFF80",
            },
          }}
        >
          Perfil
        </Stack>

        <Typography>Admin</Typography>

        <Stack
          component={Link}
          href="/admin/products"
          sx={{
            textDecoration: "underline",
            transition: "color 0.5s ease",

            "&:hover": {
              transition: "color 0.5s ease",
              color: "#FFFFFF80",
            },
          }}
        >
          Produtos
        </Stack>

        <Typography>Criar</Typography>
      </Breadcrumbs>

      <Stack padding={4} direction="row" gap="2rem" flex={1}>
        <Stack flex={1}>
          <CreateProductForm />
        </Stack>

        <Stack flex={1}>
          <ProductPreview />
        </Stack>
      </Stack>
    </Container>
  )
}
