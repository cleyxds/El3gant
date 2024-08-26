import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"

import { logout } from "@/app/actions/auth"

export default function Logout() {
  return (
    <Stack component="form" action={logout}>
      <Button
        startIcon={<Avatar />}
        type="submit"
        variant="rect"
        sx={{
          alignSelf: "flex-start",
          fontFamily: "var(--font-poppins)",
          fontWeight: 300,
        }}
      >
        Logout
      </Button>
    </Stack>
  )
}
