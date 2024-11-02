import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"
import PublishProduct from "./publish-product"

import { getUserDetails } from "@/app/actions/user"
import { getProducts } from "@/app/actions/product"

export default async function AdminProductsPage() {
  const user = await getUserDetails()
  const products = await getProducts(user?.userID)

  const productsText =
    products?.length === 1 ? "produto cadastrado" : "produtos cadastrados"

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

        <Typography>Produtos</Typography>
      </Breadcrumbs>

      <Stack alignItems="flex-start" gap="2rem">
        <Stack gap="2rem">
          <Typography
            fontSize="2.125rem"
            lineHeight="1.235"
            fontWeight="400"
            color="common.white"
          >
            Gerencie os produtos
          </Typography>

          <Button
            variant="rect"
            LinkComponent={Link}
            href="products/create"
            sx={{
              alignSelf: "flex-start",
              fontFamily: "var(--font-poppins)",
              fontWeight: 300,
            }}
          >
            Crie um novo produto
          </Button>

          <Stack gap="1rem">
            <Stack gap="1rem" direction="row" alignItems="center">
              <Typography variant="h6" color="common.white">
                <Typography
                  component="span"
                  variant="h6"
                  color="common.white"
                  fontFamily="var(--font-poppins)"
                  fontWeight="700"
                >
                  {products?.length}{" "}
                </Typography>
                {productsText} por você.
              </Typography>

              <Button
                variant="rect"
                LinkComponent={Link}
                href="inventory"
                sx={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 300,
                }}
              >
                Ver inventário
              </Button>
            </Stack>

            <Stack>
              {products?.map((product) => (
                <PublishProduct key={product.docID} {...product} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
