import Container from "@mui/material/Container"

import Header from "@/components/header"

import AdminRouteButtons from "@/components/admin-route-buttons"

export default async function AdminPage() {
  return (
    <Container>
      <Header nav={false} />

      <AdminRouteButtons />
    </Container>
  )
}
