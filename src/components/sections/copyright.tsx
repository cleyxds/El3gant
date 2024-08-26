import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function Copyright() {
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
