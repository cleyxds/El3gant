"use client"

import { useReducer } from "react"

import { signIn } from "next-auth/react"

import Link from "next/link"
import { useRouter } from "next/navigation"

import { useForm, SubmitHandler } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import FormHelperText from "@mui/material/FormHelperText"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"

import VisibilityIcon from "@/assets/icons/visibility"
import UnvisibilityIcon from "@/assets/icons/unvisibility"
import GoogleIcon from "@mui/icons-material/Google"

const LoginSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  password: z.string().min(1, "A senha é obrigatória"),
})

type Login = z.infer<typeof LoginSchema>

function getErrorMessage(error_message: string) {
  let error = "Ocorreu um erro inesperado. Por favor, tente novamente."

  if (error_message.includes("auth/invalid-credential")) {
    error = "Email ou senha incorretos. Por favor, tente novamente."
  }

  return error
}

export default function LogInForm({
  handleChangeTab,
}: {
  handleChangeTab: (_event: any, value: number) => void
}) {
  const { replace } = useRouter()
  const [pwdvis, togglePwdVis] = useReducer((state) => !state, false)

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Login>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit: SubmitHandler<Login> = async (data) => {
    const result = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    })

    if (result?.error) {
      const message = getErrorMessage(result.error)

      setError("root", {
        type: "manual",
        message,
      })
    }

    if (result?.ok) {
      replace("/")
    }
  }

  return (
    <Stack gap=".5rem" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        color="#000000"
        variant="h6"
        fontSize="1.25rem"
        fontWeight="500"
        fontFamily="var(--font-poppins)"
      >
        Log In
      </Typography>

      {Boolean(errors.root) && (
        <FormHelperText error sx={{ mx: "14px" }}>
          {errors.root?.message}
        </FormHelperText>
      )}

      <FormInput
        {...register("email", { required: true })}
        label="Email"
        type="email"
        autoComplete="email"
        autoFocus
        aria-describedby="email-field"
        error={Boolean(errors.email)}
        helperText={errors.email?.message}
      />

      <FormInput
        {...register("password", { required: true })}
        label="Senha"
        aria-describedby="password-field"
        error={Boolean(errors.password)}
        helperText={errors.password?.message}
        type={pwdvis ? "text" : "password"}
        autoComplete="current-password"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={togglePwdVis}>
                {pwdvis ? (
                  <UnvisibilityIcon width={18} fill="#000000" />
                ) : (
                  <VisibilityIcon width={18} fill="#000000" />
                )}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography
        fontSize=".75rem"
        lineHeight="1.33"
        fontWeight="500"
        fontFamily="var(--font-poppins)"
      >
        Ao efetuar login, você concorda com os{" "}
        <Typography
          component={Link}
          href="terms-of-use"
          target="_blank"
          fontSize=".75rem"
          lineHeight="1.33"
          fontWeight="500"
          fontFamily="var(--font-poppins)"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Termos e Condições
        </Typography>{" "}
        e a{" "}
        <Typography
          component={Link}
          href="privacy-policy"
          target="_blank"
          fontSize=".75rem"
          lineHeight="1.33"
          fontWeight="500"
          fontFamily="var(--font-poppins)"
          sx={{ cursor: "pointer", textDecoration: "underline" }}
        >
          Política de Privacidade
        </Typography>
      </Typography>

      <Button
        type="submit"
        variant="contained"
        sx={{
          color: "#FFFFFF",
          backgroundColor: "#000000",
          borderRadius: 0,
          fontFamily: "var(--font-poppins)",
          fontWeight: 600,
          fontSize: ".875rem",

          "&:hover": {
            filter: "brightness(0.9)",
            backgroundColor: "#000000",
          },
        }}
      >
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Login"
        )}
      </Button>

      <Stack padding="1rem 0" gap="1rem" alignItems="center">
        <Typography
          fontSize=".75rem"
          lineHeight="1.33"
          fontWeight="500"
          fontFamily="var(--font-poppins)"
        >
          Precisa de uma conta?{" "}
          <Typography
            onClick={() => handleChangeTab({}, 1)}
            component="span"
            fontSize=".75rem"
            lineHeight="1.33"
            fontWeight="500"
            fontFamily="var(--font-poppins)"
            sx={{
              color: "#000000",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Cadastre-se
          </Typography>
        </Typography>

        <Button
          type="button"
          onClick={() => signIn("google", { callbackUrl: "/" })}
          endIcon={<GoogleIcon />}
          sx={{
            width: "100%",
            backgroundColor: "#000000",

            "&:hover": {
              backgroundColor: "#000000",
              filter: "brightness(0.9)",
            },
          }}
        >
          Entrar com Google
        </Button>
      </Stack>
    </Stack>
  )
}

const FormInput = styled(TextField)({
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000000",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E5E7EA",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
})
