import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"

import Header from "@/components/header"
import Image from "@/components/image"
import PaymentMethods from "../payment-methods"

import { getProductsBySlugs } from "@/app/actions/product"

export default async function BuyPage({
  params: { slugs },
}: Readonly<{ params: { slugs: string[] } }>) {
  const products = await getProductsBySlugs(slugs)

  const productNames = products.map((product) => product.name)
  const productPrices = products
    .map((product) => product.price)
    .reduce((a, b) => a + b, 0)
  const productImages = products.map((product) => ({
    src: product.image_url,
    alt: product.name,
  }))

  return (
    <Container>
      <Header nav={false} />

      <Stack direction="row" gap="2rem" paddingBottom="4rem">
        <Stack gap="2rem" flex={1}>
          <Typography variant="h5" color="grey.700">
            Você está comprando{" "}
            <Stack padding={2}>
              {productNames.map((name) => (
                <Typography key={name} variant="h6" color="common.white">
                  {name}
                </Typography>
              ))}
            </Stack>
          </Typography>

          <Stack alignItems="center" gap="1rem">
            {productImages.map(({ src, alt }) => (
              <Image
                key={src}
                width={412}
                height={412}
                src={src}
                alt={alt}
                sx={{
                  objectFit: "scale-down",
                }}
              />
            ))}
          </Stack>
        </Stack>

        <Stack flex={1} position="relative">
          <Stack gap="2rem" alignItems="center" position="sticky" top="4.5rem">
            <Typography variant="h2" color="grey.700">
              Total
            </Typography>

            <Typography variant="h4" color="common.white" alignSelf="center">
              R$ {productPrices}
            </Typography>

            <PaymentMethods total={productPrices} />
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
