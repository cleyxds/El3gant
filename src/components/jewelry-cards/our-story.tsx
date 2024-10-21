"use client"

import theme from "@/theme"
import { alpha } from "@mui/material"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Image from "@/components/image"

const enableImage = true

export default function OurStory() {
  return (
    <Stack direction="row" gap="1rem" px="4rem" justifyContent="flex-end">
      {enableImage && (
        <Image
          src="/our-history.webp"
          alt="História"
          width={158}
          height={158}
        />
      )}

      <Stack width="30%">
        <Typography
          fontFamily="var(--font-noto_serif_jp)"
          fontSize="2.125rem"
          fontWeight="500"
          color="common.white"
        >
          História
        </Typography>

        <Typography
          fontFamily="var(--font-poppins)"
          fontSize=".75rem"
          fontWeight="500"
          lineHeight="1.5"
          color={alpha(theme.palette.common.white, 0.81)}
        >
          joias modernas são feitas de ouro, prata ou platina, geralmente com
          pedras preciosas ou semipreciosas, evoluíram de conchas, dentes de
          animais e outros itens usados ​​como decoração corporal em tempos
          pré-históricos.
        </Typography>
      </Stack>
    </Stack>
  )
}
