import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Breadcrumbs from "@mui/material/Breadcrumbs"

import Header from "@/components/header"
import InventoryTable from "./inventory-table"

import { getInventory } from "@/app/actions/inventory"

export default async function AdminInventoryPage() {
  const inventory = await getInventory()

  const inventoryTotalQuantity = inventory?.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  const inventoryText = inventoryTotalQuantity === 1 ? "item" : "itens"

  return (
    <Container>
      <Header nav={false} />

      <Breadcrumbs
        aria-label="breadcrumb"
        sx={{
          color: "common.white",
          p: "0.25rem",
          alignSelf: "flex-start",
        }}
      >
        <Stack
          component={Link}
          href="/"
          sx={{
            textDecoration: "underline",
            transition: "color 0.5s ease",

            "&:hover": {
              transition: "color 0.5s ease",
              color: "#FFFFFF80",
            },
          }}
        >
          Início
        </Stack>

        <Stack
          component={Link}
          href="/profile"
          sx={{
            textDecoration: "underline",
            transition: "color 0.5s ease",

            "&:hover": {
              transition: "color 0.5s ease",
              color: "#FFFFFF80",
            },
          }}
        >
          Perfil
        </Stack>

        <Typography>Inventário</Typography>
      </Breadcrumbs>

      <Stack alignItems="flex-start" gap="2rem">
        <Stack>
          <Typography variant="h4" color="#FFFFFF">
            Visualize o inventário
          </Typography>

          <Typography variant="h6" color="#FFFFFF">
            Total de{" "}
            <Typography
              component="span"
              variant="h6"
              color="#FFFFFF"
              fontFamily="var(--font-poppins)"
              fontWeight="700"
            >
              {inventoryTotalQuantity} {inventoryText}
            </Typography>{" "}
            no inventário
          </Typography>
        </Stack>

        <InventoryTable data={inventory} />
      </Stack>
    </Container>
  )
}
