"use client"

import { ComponentPropsWithoutRef, ElementType } from "react"

import { useForm, SubmitHandler } from "react-hook-form"

import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { styled } from "@mui/system"
import { alpha, FormHelperText } from "@mui/material"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"
import Box from "@mui/material/Box"

import { onAddFromCard } from "@/app/actions/shopping-cart"

import theme from "@/theme"
import MultipleImagesScroller from "./multiple-images-scroller"

const SizeComponentMap: Record<
  ProductSizeTypes,
  ElementType<any, keyof JSX.IntrinsicElements>
> = {
  button: Button,
  icon: IconButton,
}

const MultipleOptionCardSchema = z.object({
  selectedSize: z.string({
    required_error: "Selecione um tamanho",
  }),
})

type MultipleOptionCardTypes = z.infer<typeof MultipleOptionCardSchema>

export default function MultipleOptionCard(data: Jewelry) {
  const sizes = data.sizes ?? []

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<MultipleOptionCardTypes>({
    resolver: zodResolver(MultipleOptionCardSchema),
    defaultValues: {
      selectedSize: sizes[0]?.name ?? "",
    },
  })

  const selectedSize = watch("selectedSize")

  const onSubmit: SubmitHandler<MultipleOptionCardTypes> = (values) => {
    data.size = values.selectedSize

    onAddFromCard(data)
  }

  return (
    <Stack
      id="jewerly"
      direction="row"
      alignItems="center"
      justifyContent="space-around"
      gap="4rem"
      padding="7% 4rem"
    >
      <Stack gap="2rem" width="50%">
        <Typography
          fontFamily="var(--font-noto_serif_jp)"
          fontSize="3.1875rem"
          color="common.white"
        >
          {data.name}
        </Typography>

        <Typography
          fontFamily="var(--font-poppins)"
          fontSize=".875rem"
          lineHeight="2.25"
          color="rgba(255, 255, 255, 0.81)"
          width="80%"
        >
          {data.description}
        </Typography>

        <Stack>
          <Typography fontSize="1.625rem" color="common.white">
            Tamanhos
          </Typography>

          <Stack>
            <Stack direction="row" gap="0.5rem" alignItems="center">
              {sizes.map((size) => {
                const SizeComponent = SizeComponentMap[size.type]
                return (
                  <Size
                    component={SizeComponent}
                    onClick={() => setValue("selectedSize", size.name)}
                    key={size.name}
                    name={size.name}
                    selected={selectedSize === size.name}
                  />
                )
              })}
            </Stack>

            {Boolean(errors.selectedSize) && (
              <FormHelperText error>
                {errors.selectedSize?.message}
              </FormHelperText>
            )}
          </Stack>
        </Stack>

        <Stack direction="row" alignItems="center" gap="2rem">
          <Button
            onClick={handleSubmit(onSubmit)}
            variant="rect"
            sx={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 600,
              fontSize: "1.25rem",
              textTransform: "uppercase",
              padding: ".75rem 3%",
            }}
          >
            Adicionar ao carrinho
          </Button>

          <Typography
            color="common.white"
            fontSize="2.25rem"
            fontWeight="900"
            fontFamily="var(--font-noto_serif_jp)"
          >
            R$ {data.price}
          </Typography>
        </Stack>
      </Stack>

      <MultipleImagesScroller data={data} />
    </Stack>
  )
}

type Size = { name: string }
function Size({
  name,
  selected,
  ...props
}: Size & ComponentPropsWithoutRef<typeof SizeIcon>) {
  return (
    <SizeIcon {...props} selected={selected}>
      <Typography color="common.black">{name}</Typography>
    </SizeIcon>
  )
}

type SizeIconProps = {
  selected: boolean
}
const SizeIcon = styled(Box)<SizeIconProps>(({ selected }) => ({
  width: "2.25rem",
  height: "2.25rem",
  backgroundColor: selected ? theme.palette.common.white : "transparent",

  "> p": {
    color: selected ? theme.palette.common.black : theme.palette.common.white,
  },

  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.8),

    "> p": {
      color: theme.palette.common.black,
    },
  },
}))
