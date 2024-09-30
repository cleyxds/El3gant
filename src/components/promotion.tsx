"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

const promotionsByPage: Record<string, string> = {
  "/": "Frete grátis acima de R$ 249,99",
  "/cart": "Get 10% off your first purchase",
}

export default function Promotion() {
  return null
  const page = usePathname()

  const promotion = promotionsByPage[page]

  // Guard no promotion on the specified page
  if (!promotion) return null

  return (
    <Stack
      position="sticky"
      top="0rem"
      zIndex={2}
      bgcolor="common.white"
      height="1.5rem"
      justifyContent="center"
      alignItems="center"
      direction="row"
      gap="1rem"
    >
      <Typography variant="subtitle1">{promotion}</Typography>

      <Button
        LinkComponent={Link}
        href="/catalog"
        sx={{
          height: "100%",
          borderRadius: 0,
          bgcolor: "common.black",
          color: "common.white",

          "&:hover": {
            bgcolor: "common.black",
            filter: "brightness(0.9)",
          },
        }}
      >
        Aproveitar
      </Button>
    </Stack>
  )
}
