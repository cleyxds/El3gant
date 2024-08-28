import Image from "next/image"

import Stack from "@mui/material/Stack"
import Skeleton from "@mui/material/Skeleton"

import { CreateProductTypes } from "./create/create-product-form"

export default async function ProductPreview({
  product,
}: {
  product?: CreateProductTypes
}) {
  if (!product)
    return (
      <Skeleton
        variant="rectangular"
        width="100%"
        height="100%"
        sx={{ bgcolor: "grey.900" }}
      />
    )

  return (
    <Stack>
      <Image src={product.image_url} alt={product.name} />
    </Stack>
  )
}
