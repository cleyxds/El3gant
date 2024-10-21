import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import AdminRouteButtons from "@/components/admin-route-buttons"

export default function Admin() {
  return (
    <Stack gap="0.5rem">
      <Typography
        color="common.white"
        fontSize="1.25rem"
        lineHeight="2rem"
        fontWeight="600"
        fontFamily="var(--font-inter)"
      >
        Administrador
      </Typography>

      <AdminRouteButtons />
    </Stack>
  )
}
