"use client"

import { useContext, useEffect, useRef } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import { ProductPreviewContext } from "@/contexts/product-preview"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styled } from "@mui/material"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import InputAdornment from "@mui/material/InputAdornment"
import TextAreaAutosize from "@mui/material/TextareaAutosize"
import CircularProgress from "@mui/material/CircularProgress"

import ImagePicker from "./image-picker-form"

import theme from "@/theme"
import generateSlug from "@/lib/generateSlug"
import { createProduct, onCreateProduct } from "@/app/actions/product"
import { uploadToStorage } from "@/app/actions/upload"

export const FileSchema = z
  .instanceof(Blob)
  .refine((file) => file.size <= 5 * 1024 * 1024, {
    message: "O arquivo deve ter no máximo 5MB",
  })
  .refine((file) => ["image/jpeg", "image/png"].includes(file.type), {
    message: "O arquivo deve ser do tipo JPEG ou PNG",
  })
  .nullish()

const CreateProductSchema = z.object({
  name: z.string().min(1, "O nome do produto é obrigatório"),
  price: z
    .string()
    .min(1, "O preço do produto é obrigatório")
    .refine((value) => !isNaN(Number(value)), {
      message: "O preço do produto deve ser um número",
    })
    .transform((value) => Number(value))
    .refine((value) => Number(value) > 0, {
      message: "O preço do produto deve ser maior que zero",
    }),
  image_file: FileSchema,
  image_url: z
    .string({
      required_error: "A imagem do produto é obrigatória",
    })
    .refine((value) => !!value),
  description: z.string().min(1, "A descrição do produto é obrigatória"),
  sub_description: z
    .string()
    .min(1, "A sub descrição do produto é obrigatória")
    .nullish(),
  categories: z
    .array(z.string())
    .min(1, "O produto deve ter pelo menos uma categoria")
    .nullish(),
  published: z.boolean().nullish(),
  created_by: z.string().nullish(),
  slug: z.string().nullish(),
  title: z.string().nullish(),
  docID: z.string().nullish(),
  published_at: z.date().nullish(),
  published_by: z.string().nullish(),
  created_at: z.date().nullish(),
  layout: z.string().nullish(),
})

export type CreateProductTypes = z.infer<typeof CreateProductSchema>

export default function CreateProductForm() {
  const { setProductPreview } = useContext(ProductPreviewContext)

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<CreateProductTypes>({
    resolver: zodResolver(CreateProductSchema),
  })

  const onPickImage = (preview_image_file: File) => {
    setValue("image_file", preview_image_file, {
      shouldValidate: true,
    })
  }

  const name = watch("name")
  const image_file = watch("image_file")
  const image_url = watch("image_url")
  const preview = watch()

  const previous_previewRef = useRef(preview)

  useEffect(() => {
    const hasFormChanged = (prev: any, current: any) => {
      return JSON.stringify(prev) !== JSON.stringify(current)
    }

    if (hasFormChanged(previous_previewRef.current, preview)) {
      setProductPreview(preview)

      previous_previewRef.current = preview
    }
  }, [preview])

  useEffect(() => {
    if (name) {
      setValue("title", name)
      setValue("slug", generateSlug(name))
    }
  }, [name, setValue])

  useEffect(() => {
    if (image_file) {
      setValue("image_url", URL.createObjectURL(image_file), {
        shouldValidate: true,
      })
    }
  }, [image_file, setValue])

  const onSubmit: SubmitHandler<CreateProductTypes> = async (data) => {
    data.published = false
    data.created_at = new Date()
    data.layout = "RIGHT-LEFT"
    data.categories = []

    if (data.image_file && data.slug) {
      const path = `products/${data.slug}`

      data.image_url = await uploadToStorage(data.image_file as File, path)
    }

    data.image_file = null

    const productID = await createProduct(data)

    onCreateProduct(productID)
  }

  const handlePriceFormat = (e: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = e.target

    const price = value.replace(/\D/g, "").replace(/(\d)(\d{2})$/, "$1.$2")

    // @ts-ignore
    setValue("price", price)
  }

  return (
    <Stack gap="1rem" component="form" onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        {...register("name", { required: true })}
        label="Nome do produto"
        variant="outlined"
        type="text"
        error={Boolean(errors.name)}
        helperText={errors.name?.message}
      />

      <Stack>
        <FormInput
          {...register("price", { required: true })}
          label="Preço"
          variant="outlined"
          type="text"
          inputMode="numeric"
          error={Boolean(errors.price)}
          helperText={errors.price?.message}
          onChange={handlePriceFormat}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">R$</InputAdornment>
            ),
          }}
        />

        {/* <Typography
          color="#FFFFFF"
          fontFamily="var(--font-poppins)"
          fontWeight="400"
          fontSize="0.75rem"
          lineHeight="1.66"
          margin=".1875rem .875rem 0 .875rem"
        >
          Use o ponto (.) para separar os centavos
        </Typography> */}
      </Stack>

      <ImagePicker
        {...register("image_url", { required: true })}
        imageUrl={image_url}
        onPickImage={onPickImage}
        errors={[errors.image_url, errors.image_file]}
      />

      <Stack>
        <FormTextArea
          placeholder="Descrição do produto"
          {...register("description", { required: true })}
          maxRows={4}
          minRows={4}
          errors={Boolean(errors.description)}
          aria-label="form description"
        />

        {Boolean(errors.description) && (
          <Typography
            color={Boolean(errors) ? theme.palette.error.main : "#000000"}
            fontFamily="var(--font-poppins)"
            fontWeight="400"
            fontSize="0.75rem"
            lineHeight="1.66"
            margin=".1875rem .875rem 0 .875rem"
          >
            {errors?.description?.message}
          </Typography>
        )}
      </Stack>

      <Button variant="rect" type="submit">
        {isSubmitting ? (
          <CircularProgress size={24} color="inherit" />
        ) : (
          "Criar produto"
        )}
      </Button>
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

const FormTextArea = styled(TextAreaAutosize)<{
  errors?: boolean
}>`
  resize: none;
  font-family: var(--font-poppins);
  padding: 1rem;
  color: #ffffff;
  border-radius: 0.25rem;
  border: 2px solid
    ${(props) => (props.errors ? theme.palette.error.main : "#ffffff")};
  background-color: transparent;

  &::-webkit-input-placeholder {
    color: ${(props) => (props.errors ? theme.palette.error.main : "#ffffff")};
  }
`
