import Container from "@mui/material/Container"
import Stack from "@mui/material/Stack"

import LoginForm from "@/components/login-form"
import SignInForm from "@/components/signin-form"

import Header from "@/components/header"

export default function LoginPage() {
  return (
    <Container>
      <Header nav={false} />

      <Stack gap="2rem" alignItems="center">
        <LoginForm />
        <SignInForm />
      </Stack>
    </Container>
  )
}
