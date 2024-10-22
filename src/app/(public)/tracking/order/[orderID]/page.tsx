import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"

import Header from "@/components/header"

export default function OrderTrackingPage({
  params: { orderID },
}: Readonly<{ params: { orderID: string[] } }>) {
  return (
    <Container>
      <Header nav={false} />

      <Typography color="#FFFFFF">Order {orderID}</Typography>
    </Container>
  )
}
