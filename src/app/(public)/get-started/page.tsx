import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"

export default function GetStartedPage() {
  return (
    <Container>
      <Header nav={false} />

      <Typography color="white">Get Started Animation</Typography>
    </Container>
  )
}
