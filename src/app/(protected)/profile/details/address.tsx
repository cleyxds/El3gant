"use client"

import { useEffect, useState } from "react"

import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { alpha, CircularProgress, styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Snackbar from "@mui/material/Snackbar"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import Modal from "@mui/material/Modal"
import Button from "@mui/material/Button"
import Box from "@mui/material/Box"

import DefaultFormInput from "@/components/form-input"

import { zipCodeMask } from "@/lib/masks"
import { createAddress, updateAddress } from "@/app/actions/address"

import theme from "@/theme"

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import EditIcon from "@mui/icons-material/Edit"

export default function Address({ user }: { user: User }) {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  const addresses = user.addresses ?? ([] as Address[])

  function handleEditAddress(address: Address) {
    setEditingAddress(address)

    handleOpen()
  }

  return (
    <Stack gap="1.5rem">
      <Stack direction="row" alignItems="center" gap="0.5rem">
        <Typography
          color="common.white"
          fontSize="1.25rem"
          lineHeight="2rem"
          fontWeight="600"
          fontFamily="var(--font-inter)"
        >
          Endereços
        </Typography>

        <Tooltip title="Adicionar endereço" arrow>
          <IconButton onClick={handleOpen} color="inherit">
            <AddCircleOutlineIcon />
          </IconButton>
        </Tooltip>
      </Stack>

      {addresses.length ? (
        <Stack
          gap="1.5rem"
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)" }}
        >
          {addresses.map((address) => (
            <AddressCard
              key={address.docID}
              address={address}
              handleEditAddress={handleEditAddress}
            />
          ))}
        </Stack>
      ) : (
        <Stack gap="1rem">
          <Typography
            color="common.white"
            fontSize="1rem"
            lineHeight="1.625rem"
            fontWeight="400"
            fontFamily="var(--font-inter)"
          >
            Nenhum endereço cadastrado
          </Typography>

          <Button
            onClick={handleOpen}
            sx={{
              bgcolor: "common.white",
              color: "common.black",
              alignSelf: "flex-start",

              "&:hover": {
                bgcolor: alpha(theme.palette.common.white, 0.9),
              },
            }}
          >
            Adicionar endereço
          </Button>
        </Stack>
      )}

      <CreateAddressModal
        editing={!!editingAddress}
        editingAddress={editingAddress!}
        clearEditingAddress={() => setEditingAddress(null)}
        user={user}
        open={open}
        handleClose={handleClose}
      />
    </Stack>
  )
}

function AddressCard({
  address,
  handleEditAddress,
}: {
  address?: Address
  handleEditAddress: (address: Address) => void
}) {
  if (!address) return null

  const addressType =
    address.type === "billing" ? "Endereço de cobrança" : "Endereço de entrega"

  return (
    <Stack
      borderRadius=".5rem"
      border={`1px solid ${alpha(theme.palette.common.white, 0.7)}`}
      px="1.5938rem"
      py="1rem"
      gap="0.5rem"
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography
          fontSize="1rem"
          lineHeight="1.625rem"
          fontWeight="600"
          fontFamily="var(--font-inter)"
          color="common.white"
        >
          {addressType}
        </Typography>

        <Button
          onClick={() => handleEditAddress(address)}
          startIcon={
            <EditIcon sx={{ width: "1.125rem", height: "1.125rem" }} />
          }
          sx={{
            height: "1.625rem",
            color: alpha(theme.palette.common.white, 0.7),
          }}
        >
          Editar
        </Button>
      </Stack>

      <Stack>
        <Typography
          fontSize=".875rem"
          lineHeight="1.375rem"
          fontWeight="400"
          fontFamily="var(--font-inter)"
          color="common.white"
        >
          {address.owner_name}
        </Typography>

        <Typography
          fontSize=".875rem"
          lineHeight="1.375rem"
          fontWeight="400"
          fontFamily="var(--font-inter)"
          color="common.white"
        >
          {address.owner_phone}
        </Typography>

        <Typography
          fontSize=".875rem"
          lineHeight="1.375rem"
          fontWeight="400"
          fontFamily="var(--font-inter)"
          color="common.white"
        >
          {address.street}
          {address.number && ", " + address.number}
        </Typography>

        <Typography
          fontSize=".875rem"
          lineHeight="1.375rem"
          fontWeight="400"
          fontFamily="var(--font-inter)"
          color="common.white"
        >
          {address.state}
          {address.city && ", " + address.city}
        </Typography>
      </Stack>
    </Stack>
  )
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  minWidth: "40.1875rem",
  bgcolor: "common.white",
  px: "1.5rem",
  py: "2.5rem",
}

const CreateAddressSchema = z.object({
  street: z.string().min(1, { message: "Rua é obrigatória" }),
  country: z.string().min(1, { message: "País é obrigatório" }),
  city: z.string().min(1, { message: "Cidade é obrigatória" }),
  number: z.string().nullish(),
  state: z.string().min(1, { message: "Estado é obrigatório" }),
  zip_code: z.string().nullish(),
  editing: z.boolean().nullish(),
})

type CreateAddress = z.infer<typeof CreateAddressSchema>

function CreateAddressModal({
  user,
  open,
  handleClose,
  editing,
  editingAddress,
  clearEditingAddress,
}: {
  user: User
  open: boolean
  handleClose: () => void
  editing?: boolean
  editingAddress?: Address
  clearEditingAddress: () => void
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CreateAddress>({
    resolver: zodResolver(CreateAddressSchema),
    defaultValues: {
      country: "Brasil",
    },
  })

  useEffect(() => {
    if (editing && editingAddress) {
      setValue("street", editingAddress?.street)
      setValue("country", editingAddress?.country)
      setValue("city", editingAddress?.city)
      setValue("number", editingAddress?.number)
      setValue("state", editingAddress?.state)
      setValue("zip_code", editingAddress?.zip_code)
      setValue("editing", editing)
    }
  }, [editing])

  const handleZipCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let input = event.target
    const length = input.value.length

    if (length > 9) {
      input.value = input.value.slice(0, 9)
    }

    const zipCode = zipCodeMask(input.value)

    input.value = zipCode

    setValue("zip_code", zipCode)
  }

  const onSubmit = async ({ editing, ...data }: CreateAddress) => {
    try {
      const address: Address = {
        ...data,
        type: "shipping",
        userID: user.userID,
        owner_name: user.name,
        owner_phone: user.phone!,
        number: data.number!,
        zip_code: data.zip_code!,
      }

      if (editing) {
        await updateAddress(editingAddress?.docID!, address, "/profile")

        clearEditingAddress()
        handleClose()
        reset()

        return
      }

      await createAddress(address, "/profile")

      handleClose()
      reset()
    } catch (error: any) {
      const error_message = error.message
    }
  }

  const is_editing = watch("editing")

  const button_text = is_editing ? "Editar endereço" : "Criar endereço"
  const snack_message = is_editing
    ? "Endereço editado com sucesso"
    : "Endereço criado com sucesso"

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        open={isSubmitSuccessful}
        autoHideDuration={3000}
        message={snack_message}
      />

      <Modal
        open={open}
        onClose={() => {
          reset()
          handleClose()
          clearEditingAddress()
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            gap="1.5rem"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Typography
              color="#141718"
              fontSize="1.25rem"
              lineHeight="1.75rem"
              fontWeight="500"
              fontFamily="var(--font-poppins)"
            >
              Endereço de entrega
            </Typography>

            <FormInput
              {...register("street")}
              label="Rua"
              type="text"
              error={Boolean(errors.street)}
              helperText={errors.street?.message}
            />

            <FormInput
              {...register("country")}
              label="País"
              variant="outlined"
              type="text"
              error={Boolean(errors.country)}
              helperText={errors.country?.message}
            />

            <Stack direction="row" alignItems="center" gap="1.5rem">
              <FormInput
                {...register("city")}
                label="Cidade"
                variant="outlined"
                type="text"
                error={Boolean(errors.city)}
                helperText={errors.city?.message}
                sx={{ flex: 1 }}
              />

              <FormInput
                {...register("state")}
                label="Estado"
                variant="outlined"
                type="text"
                error={Boolean(errors.state)}
                helperText={errors.state?.message}
                sx={{ flex: 1 }}
              />
            </Stack>

            <Stack direction="row" alignItems="center" gap="1.5rem">
              <FormInput
                {...register("zip_code")}
                onChange={handleZipCodeChange}
                label="CEP"
                type="text"
                error={Boolean(errors.zip_code)}
                helperText={errors.zip_code?.message}
                sx={{ flex: 1 }}
              />

              <FormInput
                {...register("number")}
                label="Número"
                variant="outlined"
                type="text"
                error={Boolean(errors.number)}
                helperText={errors.number?.message}
                sx={{ flex: 1 }}
              />
            </Stack>

            <Button
              type="submit"
              disabled={isSubmitting}
              sx={{
                bgcolor: "common.black",
                color: "common.white",
                gap: "0.5rem",

                "&:hover": {
                  bgcolor: alpha(theme.palette.common.black, 0.9),
                },

                "&:disabled": {
                  bgcolor: theme.palette.grey[700],
                },
              }}
            >
              {isSubmitting && <CircularProgress color="inherit" size={16} />}
              {isSubmitting ? "Criando endereço..." : button_text}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  )
}

const FormInput = styled(DefaultFormInput)(({ error }) => ({
  ".MuiInputLabel-root": {
    color: error ? theme.palette.error.main : "#000000",
  },

  "& label": {
    color: "#000000",
  },
  "& label.Mui-focused": {
    color: "#000000",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#000000",
  },
  ".MuiTypography-root": {
    color: error ? theme.palette.error.main : "#000000",
  },
  "& .MuiOutlinedInput-root": {
    color: "#000000",

    "& fieldset": {
      borderColor: "#000000",
    },
    ".MuiTypography-root": {
      color: error ? theme.palette.error.main : "#000000",
    },
    "&:hover fieldset": {
      borderColor: "#000000",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#000000",
    },
  },
}))
