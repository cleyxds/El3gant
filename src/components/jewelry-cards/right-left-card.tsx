"use client"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import Image from "@/components/image"

import { onAddFromCard } from "@/app/actions/shopping-cart"

export default function RightLeftCard(data: Jewelry) {
  return (
    <Stack
      id="jewerly"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      gap="4rem"
      padding="7% 4rem"
    >
      <Image
        width={412}
        height={412}
        src={data.image_url}
        alt={data.title}
        sx={{ objectFit: "scale-down" }}
      />

      <Stack gap="2rem" width="50%">
        <Typography
          fontFamily="var(--font-noto_serif_jp)"
          fontSize="3.1875rem"
          color="#FFFFFF"
        >
          {data.name}
        </Typography>

        <Typography
          fontFamily="var(--font-poppins)"
          fontSize=".875rem"
          lineHeight="2.25"
          color="rgba(255, 255, 255, 0.81)"
          width="80%"
        >
          {data.description}
        </Typography>

        <Stack direction="row" alignItems="center" gap="2rem">
          <Button
            onClick={() => onAddFromCard(data)}
            variant="rect"
            sx={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              fontSize: "1.25rem",
              textTransform: "uppercase",
              padding: ".75rem 3%",
            }}
          >
            Adicionar ao carrinho
          </Button>

          <Typography
            color="#FFFFFF"
            fontSize="2.25rem"
            fontWeight="900"
            fontFamily="var(--font-noto_serif_jp)"
          >
            R$ {data.price}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
