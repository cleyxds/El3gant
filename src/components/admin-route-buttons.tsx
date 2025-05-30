import Link from "next/link"

import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

export default function AdminRouteButtons() {
  return (
    <Stack direction="row" alignItems="center" gap="1rem">
      <Button
        LinkComponent={Link}
        href="/admin/products"
        variant="rect"
        sx={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
        }}
      >
        Gerenciar produtos
      </Button>

      <Button
        LinkComponent={Link}
        href="/admin/inventory"
        variant="rect"
        sx={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
        }}
      >
        Gerenciar inventário
      </Button>
    </Stack>
  )
}
