import Image from "next/image"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Header from "@/components/header"

import { getProductBySlug } from "@/app/actions/product"

export default async function BuyPage({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  const product = await getProductBySlug(slug)

  return (
    <Container>
      <Header nav={false} />

      <Stack direction="row" gap="2rem" alignItems="flex-start">
        <Stack gap="2rem" flex={1}>
          <Typography variant="h5" color="grey.700">
            Você está comprando{" "}
            <Typography variant="h6" color="common.white">
              {product?.name}
            </Typography>
          </Typography>

          <Typography variant="h4" color="common.white" alignSelf="center">
            R$ {product?.price}
          </Typography>

          <Stack alignItems="center">
            <Image
              width={412}
              height={412}
              src={product?.image_url!}
              alt={product?.name!}
              objectFit="cover"
            />
          </Stack>
        </Stack>

        <Stack gap="2rem" flex={1}>
          <Typography variant="h6" color="grey.700">
            Descrição
          </Typography>

          <Typography variant="body1" color="common.white">
            {product?.description}
          </Typography>
        </Stack>
      </Stack>
    </Container>
  )
}
