import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"

import ChevronLeft from "@mui/icons-material/ChevronLeft"

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

      <Stack alignItems="flex-start" gap="2rem">
        <IconButton
          LinkComponent={Link}
          href="/admin"
          sx={{
            color: "#000000",
            alignSelf: "flex-start",
            bgcolor: "#FFFFFF",

            "&:hover": {
              bgcolor: "#FFFFFFE5",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Stack gap="2rem">
          <Typography variant="h4" color="#FFFFFF">
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
              <Typography variant="h6" color="#FFFFFF">
                <Typography
                  component="span"
                  variant="h6"
                  color="#FFFFFF"
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
                <PublishProduct {...product} />
              ))}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
