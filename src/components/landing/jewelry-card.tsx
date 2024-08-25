import Image from "next/image"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import { generateId } from "../../lib/generateId"

import RingTwo from "../../assets/ring2.png"

type CardType = "LEFT-RIGHT" | "RIGHT-LEFT"
type JewelryCard = {
  type?: CardType
}

export default function JewelryCard({ type = "LEFT-RIGHT" }: JewelryCard) {
  if (type !== "LEFT-RIGHT") return null

  const JEWELRY_ID = generateId()
  const JEWELRY_NAME = "Pikup: Anel de designer em prata esterlina"
  const JEWELRY_PRICE = "549.29"
  const NUMBER_JEWELRY_PRICE = Number(JEWELRY_PRICE)

  return (
    <Stack
      id="joias"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      gap="4rem"
      padding="7% 4rem"
    >
      <Image src={RingTwo} alt="Jewelry: Ring 2" />

      <Stack gap="2rem" width="50%">
        <Typography
          fontFamily="var(--font-noto_serif_jp)"
          fontSize="3.1875rem"
          color="#FFFFFF"
        >
          {JEWELRY_NAME}
        </Typography>

        <Typography
          fontFamily="var(--font-poppins)"
          fontSize=".875rem"
          lineHeight="2.25"
          color="rgba(255, 255, 255, 0.81)"
          width="80%"
        >
          Lorem ipsum dolor sit amet. Qui consequatur sint 33 voluptatem officia
          et sint laboriosam sed ipsa sint ut voluptatum labore et possimus
          voluptas. Vel vitae temporibus sit nulla consequatur in illo galisum
          eo
        </Typography>

        <Stack direction="row" alignItems="center" gap="2rem">
          <Button
            sx={{
              backgroundColor: "#FFFFFF",
              color: "#000000",
              border: 0,
              borderRadius: 0,
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
            R$ {JEWELRY_PRICE}
          </Typography>
        </Stack>
      </Stack>
    </Stack>
  )
}
