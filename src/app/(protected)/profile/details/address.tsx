import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

export default function Address() {
  return (
    <Stack gap="0.5rem">
      <Typography
        color="common.white"
        fontSize="1.25rem"
        lineHeight="2rem"
        fontWeight="600"
        fontFamily="var(--font-inter)"
      >
        Endereços
      </Typography>
    </Stack>
  )
}
