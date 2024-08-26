import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Header from "@/components/header"

import { getUserDetails } from "@/app/actions/user"
import { getShoppingCart } from "@/app/actions/shopping-cart"
import RemoveShoppingCartItem from "./remove-item"

export default async function ShoppingCartPage() {
  const userID = await getUserDetails().then((user) => user?.userID)
  const cart = await getShoppingCart(userID)

  return (
    <Container>
      <Header nav={false} />

      <Typography variant="h4" color="#FFFFFF">
        Carrinho
      </Typography>

      <Stack alignItems="flex-start" padding={2}>
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

            <RemoveShoppingCartItem item={item} />
          </Stack>
        ))}
      </Stack>
    </Container>
  )
}
