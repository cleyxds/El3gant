"use client"

import { useReducer } from "react"

import Link from "next/link"

import { useForm, SubmitHandler } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import MUICheckbox from "@mui/material/Checkbox"
import InputAdornment from "@mui/material/InputAdornment"
import IconButton from "@mui/material/IconButton"
import CircularProgress from "@mui/material/CircularProgress"

import theme from "@/theme"

import { createAccount } from "@/app/actions/auth"

import VisibilityIcon from "@/assets/icons/visibility"
import UnvisibilityIcon from "@/assets/icons/unvisibility"

const SignInSchema = z.object({
  email: z.string().email("O email deve ser válido"),
  password: z
    .string()
    .min(8, "A senha deve ter pelo menos 8 caracteres")
    .refine(
      (value) => {
        const hasUppercase = /[A-Z]/.test(value)
        const hasNumber = /[0-9]/.test(value)
        const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(value)

        return hasUppercase && hasNumber && hasSymbol
      },
      {
        message:
          "A senha deve conter pelo menos 8 caracteres, 1 letra maiúscula, 1 número e 1 símbolo",
      }
    ),
  terms: z.boolean().refine((value) => value === true, {
    message: "Você deve ler e aceitar os termos",
  }),
})

type SignIn = z.infer<typeof SignInSchema>

export default function SignInForm({
  handleChangeTab,
}: {
  handleChangeTab: (_event: any, value: number) => void
}) {
  const [pwdvis, togglePwdVis] = useReducer((state) => !state, false)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignIn>({
    resolver: zodResolver(SignInSchema),
  })

  const onSubmit: SubmitHandler<SignIn> = (data) => createAccount(data)

  return (
    <Stack gap=".5rem" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        color="#000000"
        variant="h6"
        fontSize="1.25rem"
        fontWeight="500"
        fontFamily="var(--font-poppins)"
      >
        Crie sua conta
      </Typography>

      <FormInput
        {...register("email", { required: true })}
        label="Email"
        type="email"
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

      <Stack direction="row" alignItems="center" gap=".25rem">
        <Checkbox
          {...register("terms", {
            required: true,
            validate: (v) => v === true,
          })}
          inputProps={{ "aria-label": "terms-checkbox" }}
          sx={{
            color: Boolean(errors.terms) ? theme.palette.error.main : "#000000",
            padding: 0,

            "&.Mui-checked": {
              color: "#000000",
            },
          }}
        />

        <Typography
          color={Boolean(errors.terms) ? theme.palette.error.main : "#000000"}
          fontSize=".75rem"
          lineHeight="1.33"
          fontWeight="500"
          fontFamily="var(--font-poppins)"
        >
          Li e concordo com os{" "}
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
          .
        </Typography>
      </Stack>

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
          "Criar conta"
        )}
      </Button>

      <Stack padding="1rem 0" alignItems="center">
        <Typography
          fontSize=".75rem"
          lineHeight="1.33"
          fontWeight="500"
          fontFamily="var(--font-poppins)"
        >
          Já tem uma conta?{" "}
          <Typography
            onClick={() => handleChangeTab({}, 0)}
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
            Faça login
          </Typography>
        </Typography>
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

const Checkbox = styled(MUICheckbox)``
