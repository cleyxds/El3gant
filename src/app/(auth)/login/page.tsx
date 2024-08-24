import Container from "@mui/material/Container"

import LoginForm from "@/components/login-form"
import SignInForm from "@/components/signin-form"

import Header from "@/components/header"

export default function LoginPage() {
  return (
    <Container>
      <Header nav={false} />

      <LoginForm />
      <SignInForm />
    </Container>
  )
}
