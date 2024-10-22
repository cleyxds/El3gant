"use client"

import { useForm } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { FileSchema } from "@/app/(admin)/admin/products/create/create-product-form"

import { alpha, styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import IconButton from "@mui/material/IconButton"
import Typography from "@mui/material/Typography"
import CircularProgress from "@mui/material/CircularProgress"

import { updateUserDetails } from "@/app/actions/user"
import { uploadToStorage } from "@/app/actions/upload"

import theme from "@/theme"

import CameraAlt from "@mui/icons-material/CameraAlt"

const AccountImageSchema = z.object({
  image_file: FileSchema,
  image_url: z
    .string({
      required_error: "A imagem do produto é obrigatória",
    })
    .refine((value) => !!value),
})

type AccountImageTypes = z.infer<typeof AccountImageSchema>

export default function AccountImageForm({ user }: { user: User }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<AccountImageTypes>({
    resolver: zodResolver(AccountImageSchema),
  })

  const handleUploadedFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    FileSchema.safeParse(file)

    if (!file) return

    setValue("image_file", file, {
      shouldValidate: true,
    })

    setValue("image_url", URL.createObjectURL(file), {
      shouldValidate: true,
    })

    await handleSubmit(onSubmit)()
  }

  const onSubmit = async (data: AccountImageTypes) => {
    user.avatar_url = data.image_url

    if (data.image_file && user.docID) {
      const path = `avatars/${user.docID}`

      data.image_url = await uploadToStorage(data.image_file as File, path)
    }

    data.image_file = null

    if (!user.docID) return

    const updatedUser = {
      avatar_url: data.image_url,
    }

    await updateUserDetails(user.docID, updatedUser, "/profile")
  }

  return (
    <Stack alignItems="center" textAlign="center">
      <Stack position="relative">
        <Avatar src={user.avatar_url} sx={{ width: "5rem", height: "5rem" }}>
          {isSubmitting && <CircularProgress color="inherit" />}
        </Avatar>

        <IconButton
          tabIndex={-1}
          component="label"
          role={undefined}
          sx={{
            width: "1.875rem",
            height: "1.875rem",
            position: "absolute",
            bottom: "0%",
            right: "0%",
            color: "common.white",
            bgcolor: "common.black",

            "&:hover": {
              bgcolor: alpha(theme.palette.common.black, 0.7),
            },
          }}
        >
          <VisuallyHiddenInput
            {...register("image_file", { required: true })}
            onChange={handleUploadedFile}
            type="file"
          />

          <CameraAlt fontSize="small" color="inherit" />
        </IconButton>
      </Stack>

      {Boolean(errors.image_file) && (
        <Typography
          color={
            Boolean(errors.image_file) ? theme.palette.error.main : "#000000"
          }
          fontFamily="var(--font-poppins)"
          fontWeight="400"
          fontSize="0.75rem"
          lineHeight="1.66"
          margin=".1875rem .875rem 0 .875rem"
        >
          {errors.image_file?.message}
        </Typography>
      )}
    </Stack>
  )
}

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
})
