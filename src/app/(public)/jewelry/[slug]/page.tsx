import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"

import { getProductsBySlugs } from "@/app/actions/product"

export default async function JewelryPage({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  const jewelry = await getProductsBySlugs([slug])

  return (
    <Container>
      <Header />

      <Typography color="common.white">{JSON.stringify(jewelry)}</Typography>
    </Container>
  )
}
