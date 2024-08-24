import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"

import { logout } from "@/app/actions/auth"

export default function Logout() {
  return (
    <Stack component="form" action={logout}>
      <Button type="submit" variant="contained">
        <Typography variant="body1" color="white">
          Logout
        </Typography>
      </Button>
    </Stack>
  )
}
