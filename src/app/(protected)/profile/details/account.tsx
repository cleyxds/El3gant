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
import Snackbar from "@mui/material/Snackbar"

import { updateUserDetails } from "@/app/actions/user"
import { phoneMask } from "@/lib/masks"

import theme from "@/theme"

const AccountSchema = z.object({
  name: z
    .string({
      required_error: "Nome é obrigatório",
    })
    .min(3, "Nome deve ter no mínimo 3 caracteres"),
  display_name: z.string({
    required_error: "Nome de exibição é obrigatório",
  }),
  phone: z.string({
    required_error: "Número de telefone é obrigatório",
  }),
})

type AccountSchema = z.infer<typeof AccountSchema>

export default function Account({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<AccountSchema>({
    resolver: zodResolver(AccountSchema),
    defaultValues: {
      name: user.name,
      display_name: user?.display_name,
      phone: user?.phone,
    },
  })

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target
    const length = input.value.length

    if (length > 15) {
      input.value = input.value.slice(0, 15)
    }

    const phoneNumber = phoneMask(input.value)

    input.value = phoneNumber

    setValue("phone", phoneNumber)
  }

  const onSubmit = async (data: AccountSchema) => {
    if (!user.docID) return

    await updateUserDetails(user.docID, data, "/profile")
  }

  return (
    <Stack gap="1.5rem" component="form" onSubmit={handleSubmit(onSubmit)}>
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
            {...register("name")}
            label="Nome"
            variant="outlined"
            type="text"
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />

          <Stack>
            <FormInput
              {...register("display_name")}
              label="Nome de exibição"
              variant="outlined"
              type="text"
              error={Boolean(errors.display_name)}
              helperText={errors.display_name?.message}
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

          <FormInput
            {...register("phone")}
            onChange={handlePhoneChange}
            placeholder="(00) 00000-0000"
            label="Contato"
            variant="outlined"
            type="tel"
            error={Boolean(errors.phone)}
            helperText={errors.phone?.message}
          />

          <FormInput
            label="Email"
            variant="outlined"
            type="text"
            value={user.email}
            aria-readonly
            InputProps={{
              readOnly: true,
            }}
          />
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

      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSubmitSuccessful}
        autoHideDuration={3000}
        message="Alterações salvas com sucesso"
      />
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
