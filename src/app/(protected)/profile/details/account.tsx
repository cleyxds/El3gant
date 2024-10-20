"use client"

import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { alpha, styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import TextField from "@mui/material/TextField"
import FormHelperText from "@mui/material/FormHelperText"
import Button from "@mui/material/Button"
import CircularProgress from "@mui/material/CircularProgress"

import theme from "@/theme"

const AccountSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  displayName: z.string({
    required_error: "Nome de exibição é obrigatório",
  }),
})

type AccountSchema = z.infer<typeof AccountSchema>

export default function Account() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AccountSchema>({
    resolver: zodResolver(AccountSchema),
  })

  const onSubmit = async (data: AccountSchema) => {}

  return (
    <Stack gap="0.5rem" component="form" onSubmit={handleSubmit(onSubmit)}>
      <Typography
        color="common.white"
        fontSize="1.25rem"
        lineHeight="2rem"
        fontWeight="600"
        fontFamily="var(--font-inter)"
      >
        Detalhes da conta
      </Typography>

      <Stack gap="2rem">
        <Stack gap="1.5rem">
          <FormInput
            {...register("name", { required: true })}
            label="Nome"
            variant="outlined"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <Stack>
            <FormInput
              {...register("displayName", { required: true })}
              label="Nome de exibição"
              variant="outlined"
              type="text"
              error={Boolean(errors.displayName)}
              helperText={errors.displayName?.message}
            />

            <FormHelperText
              sx={{
                color: alpha(theme.palette.common.white, 0.7),
              }}
            >
              É assim que seu nome será exibido na seção de conta e nas
              avaliações
            </FormHelperText>
          </Stack>
        </Stack>

        <Button
          type="submit"
          disabled={isSubmitting}
          sx={{
            alignSelf: "flex-start",
            width: "11.4375rem",
            height: "3.25rem",
            bgcolor: "common.white",
            color: "#141718",
            fontFamily: "var(--font-inter)",
            fontSize: "1rem",
            lineHeight: "1.75rem",
            letterSpacing: "-0.4px",
            gap: "0.5rem",

            "&:hover": {
              bgcolor: alpha(theme.palette.common.white, 0.8),
            },
          }}
        >
          {isSubmitting && <CircularProgress color="inherit" size={16} />}

          {isSubmitting ? "Salvando..." : "Salvar alterações"}
        </Button>
      </Stack>
    </Stack>
  )
}

const FormInput = styled(TextField)(({ error }) => ({
  ".MuiInputLabel-root": {
    color: error ? theme.palette.error.main : "#FFFFFF",
  },

  "& label": {
    color: "#FFFFFF",
  },
  "& label.Mui-focused": {
    color: "#FFFFFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFFFFF",
  },
  ".MuiTypography-root": {
    color: error ? theme.palette.error.main : "#FFFFFF",
  },
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",

    "& fieldset": {
      borderColor: "#E5E7EA",
    },
    ".MuiTypography-root": {
      color: error ? theme.palette.error.main : "#FFFFFF",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFFFFF",
    },
  },
}))
