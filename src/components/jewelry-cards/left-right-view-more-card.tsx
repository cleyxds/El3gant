"use client"

import Link from "next/link"

import { styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"

import Image from "@/components/image"

import DefaultJewelryStamp from "@/assets/jewelry-stamp"

export default function LeftRightViewMoreCard(data: Jewelry) {
  const { stamp } = data

  return (
    <Stack
      id="jewerly"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      gap="4rem"
      padding="7% 4rem"
    >
      <Stack position="relative">
        <Image width={412} height={412} src={data.image_url} alt={data.title} />

        {stamp && (
          <JewelryStamp
            sx={{
              position: "absolute",
              top: "-15%",
              right: "-15%",
            }}
          />
        )}
      </Stack>

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
            LinkComponent={Link}
            href={`/jewelry/${data.slug}`}
            variant="rect"
            sx={{
              minWidth: "12.5rem",
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              fontSize: "1.25rem",
              textTransform: "uppercase",
              padding: ".75rem 3%",
            }}
          >
            Ver mais
          </Button>

          {!stamp && (
            <Typography
              color="#FFFFFF"
              fontSize="2.25rem"
              fontWeight="900"
              fontFamily="var(--font-noto_serif_jp)"
            >
              R$ {data.price}
            </Typography>
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}

const JewelryStamp = styled(DefaultJewelryStamp)``
