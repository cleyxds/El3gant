import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"

import Header from "@/components/header"
import ProductPreview from "../product-preview"
import CreateProductForm from "./create-product-form"

export default function AdminCreateProductPage() {
  return (
    <Container>
      <Header nav={false} />

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
