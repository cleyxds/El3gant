import Link from "next/link"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import JewelryShowcase from "../jewelry-showcase"
import PlayVideo from "../play-video"

import RingOne from "../../assets/ring1.png"

export default function GetStartedSection() {
  return (
    <Stack position="relative" padding="4rem 4rem 0 4rem" gap="2rem">
      <JewelryShowcase showcaseUrl={RingOne} />

      <Typography
        fontFamily="var(--font-noto_serif_jp)"
        fontSize="4.0625rem"
        fontWeight="900"
        color="#FFFFFF"
        width="53%"
      >
        Descubra As Joias Excepcionais Conosco
      </Typography>

      <Typography
        fontFamily="var(--font-poppins)"
        fontSize=".875rem"
        lineHeight="2.25"
        color="rgba(255, 255, 255, 0.81)"
        width="43%"
      >
        As melhores joias para você. Aproveite a oportunidade de ter joias de
        qualidade e com um preço acessível 💎
      </Typography>

      <Stack direction="row" alignItems="center" gap="1rem">
        <Button
          LinkComponent={Link}
          href="/get-started"
          sx={{
            backgroundColor: "#FFFFFF",
            color: "#000000",
            border: 0,
            fontWeight: 600,
            fontSize: 20,
            textTransform: "uppercase",
            padding: ".75rem 3%",
          }}
        >
          Começar
        </Button>

        <PlayVideo />
      </Stack>
    </Stack>
  )
}
