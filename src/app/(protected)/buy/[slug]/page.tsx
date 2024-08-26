import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"

export default async function BuyPage({
  params: { slug },
}: Readonly<{ params: { slug: string } }>) {
  console.log(slug)

  return (
    <Container>
      <Header nav={false} />

      <Typography variant="h3" color="white">
        Comprar {slug}
      </Typography>
    </Container>
  )
}
