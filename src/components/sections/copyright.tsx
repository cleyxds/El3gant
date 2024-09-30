"use client"

import { usePathname } from "next/navigation"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

const copyright_pages = ["/"]

export default function Copyright() {
  const page = usePathname()

  const copyright_page = copyright_pages.includes(page)

  // Guard no copyright on the specified page
  if (!copyright_page) return null

  return (
    <Stack
      height="4rem"
      bgcolor="#FFFFFF"
      justifyContent="center"
      alignItems="center"
    >
      <Typography
        fontSize="1rem"
        fontFamily="var(--font-poppins)"
        fontWeight="400"
        color="#000000"
      >
        Copyright 2024 El3gant.com, All rights reserved.
      </Typography>
    </Stack>
  )
}
