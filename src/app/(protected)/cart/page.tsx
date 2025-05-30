import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"
import RemoveShoppingCartItem from "./remove-item"

import { getUserDetails } from "@/app/actions/user"
import { getShoppingCart } from "@/app/actions/shopping-cart"

export default async function ShoppingCartPage() {
  const userID = await getUserDetails().then((user) => user?.userID)
  const cart = await getShoppingCart(userID)

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

        <Typography>Carrinho</Typography>
      </Breadcrumbs>

      <Typography variant="h4" color="#FFFFFF">
        Carrinho
      </Typography>

      <Stack alignItems="flex-start" padding={2} gap="1rem">
        <Stack>
          {cart.map((item) => (
            <Stack
              key={item.docID}
              gap="1rem"
              border="1px solid #FFFFFFE5"
              padding={2}
            >
              <Typography variant="h6" color="#FFFFFF">
                {item.product_slug}
              </Typography>

              <Typography variant="body1" color="#FFFFFF">
                Quantidade: {item.quantity}
              </Typography>

              <Button
                variant="rect"
                LinkComponent={Link}
                href={`/buy/${item.product_slug}`}
                sx={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 300,
                }}
              >
                Comprar
              </Button>

              <RemoveShoppingCartItem item={item} />
            </Stack>
          ))}
        </Stack>

        {cart.length ? (
          <Button
            variant="rect"
            LinkComponent={Link}
            href={`/buy/${cart
              .map((item) => item.product_slug)
              .filter((slug) => slug)
              .join("/")}`}
            sx={{
              alignSelf: "flex-start",
              fontFamily: "var(--font-poppins)",
              fontWeight: 300,
            }}
          >
            Ir para checkout
          </Button>
        ) : (
          <Typography variant="body1" color="#FFFFFF">
            Seu carrinho está vazio
          </Typography>
        )}
      </Stack>
    </Container>
  )
}
