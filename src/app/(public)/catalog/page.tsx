import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"

export default function CatalogPage() {
  return (
    <Container>
      <Header nav={false} />

      <Typography variant="h3" color="white">
        Catalog Animation
      </Typography>
    </Container>
  )
}
