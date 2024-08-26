import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"

import ChevronLeft from "@mui/icons-material/ChevronLeft"

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

      <Stack alignItems="flex-start" gap="2rem">
        <IconButton
          LinkComponent={Link}
          href="/admin"
          sx={{
            color: "#000000",
            alignSelf: "flex-start",
            bgcolor: "#FFFFFF",

            "&:hover": {
              bgcolor: "#FFFFFFE5",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

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
