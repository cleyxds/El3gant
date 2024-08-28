import Image from "next/image"

import { FieldError } from "react-hook-form"

import { styled } from "@mui/material/styles"
import Button from "@mui/material/Button"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import CloudUploadIcon from "@mui/icons-material/CloudUpload"

import theme from "@/theme"

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

export default function ImagePicker({
  errors,
  onPickImage,
  imageUrl,
  ...props
}: {
  errors: FieldError | undefined
  imageUrl: string
  onPickImage: (preview_image_url: File) => void
}) {
  const handleUploadedFile = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (!file) return

    onPickImage(file)
  }

  return (
    <Stack>
      <Stack gap="1rem">
        <Stack
          width="50%"
          alignSelf="center"
          alignItems="center"
          borderRadius="0.25rem"
          padding="0.5rem"
          border="2px solid #FFFFFF"
        >
          {imageUrl ? (
            <Image
              src={imageUrl}
              title="Preview da image"
              alt="Preview da image"
              width={250}
              height={250}
              objectFit="cover"
            />
          ) : (
            <Stack
              width={250}
              height={250}
              alignItems="center"
              justifyContent="center"
            >
              <Typography
                variant="h6"
                color="#FFFFFF"
                fontFamily="var(--font-poppins)"
                fontWeight="400"
                textAlign="center"
              >
                Nenhuma imagem selecionada
              </Typography>
            </Stack>
          )}
        </Stack>

        <Button
          color={Boolean(errors) ? "error" : undefined}
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Carrege uma imagem
          <VisuallyHiddenInput
            {...props}
            onChange={handleUploadedFile}
            type="file"
          />
        </Button>
      </Stack>

      {Boolean(errors) && (
        <Typography
          color={Boolean(errors) ? theme.palette.error.main : "#000000"}
          fontFamily="var(--font-poppins)"
          fontWeight="400"
          fontSize="0.75rem"
          lineHeight="1.66"
          margin=".1875rem .875rem 0 .875rem"
        >
          {errors?.message}
        </Typography>
      )}
    </Stack>
  )
}
