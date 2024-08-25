"use client"

import { useForm, SubmitHandler } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import FormControl from "@mui/material/FormControl"

import { login } from "@/app/actions/auth"

type Login = {
  email: string
  password: string
}

const LoginSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
})

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<Login> = (data) => login(data)

  return (
    <Stack gap=".5rem" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography color="#ffffff" variant="h6">
        Faça login
      </Typography>

      <FormControl variant="standard">
        <FormInput
          {...register("email", { required: true })}
          label="Email"
          type="email"
          aria-describedby="email-field"
        />

        {errors.email && (
          <FormHelperText id="email-field">
            {errors.email.message}
          </FormHelperText>
        )}
      </FormControl>

      <FormControl variant="standard">
        <FormInput
          {...register("password", { required: true })}
          label="Senha"
          type="password"
          aria-describedby="password-field"
        />

        {errors.password && (
          <FormHelperText id="password-field">
            {errors.password.message}
          </FormHelperText>
        )}
      </FormControl>

      <Button type="submit" variant="contained" color="primary">
        Login
      </Button>
    </Stack>
  )
}

const FormInput = styled(TextField)`
  background-color: #ffffff;
`
