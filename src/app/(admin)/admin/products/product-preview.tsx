"use client"

import { useContext } from "react"

import { ProductPreviewContext } from "@/contexts/product-preview"

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Skeleton from "@mui/material/Skeleton"
import Button from "@mui/material/Button"

import Image from "@/components/image"

export default function ProductPreview() {
  const { product_preview } = useContext(ProductPreviewContext)

  return (
    <Stack
      p="1rem"
      position="sticky"
      top={136}
      borderRadius=".3125rem"
      bgcolor="grey.900"
      color="common.white"
    >
      <Stack direction="row" gap="4rem">
        <Stack justifyContent="center">
          {product_preview?.image_url ? (
            <Image
              src={product_preview?.image_url}
              width={250}
              height={250}
              alt="Product Image"
            />
          ) : (
            <Skeleton
              variant="rounded"
              width={250}
              height={250}
              sx={{ bgcolor: "common.white" }}
            />
          )}
        </Stack>

        <Stack gap="2rem" flex={1}>
          {product_preview?.name ? (
            <Typography
              fontFamily="var(--font-noto_serif_jp)"
              fontSize="1.5938rem"
              color="#FFFFFF"
            >
              {product_preview?.name}
            </Typography>
          ) : (
            <Skeleton
              variant="rounded"
              width="100%"
              height={38.25}
              sx={{ bgcolor: "common.white" }}
            />
          )}

          {product_preview?.description ? (
            <Typography
              fontFamily="var(--font-poppins)"
              fontSize=".625rem"
              color="rgba(255, 255, 255, 0.81)"
            >
              {product_preview?.description}
            </Typography>
          ) : (
            <Skeleton
              variant="rounded"
              width="100%"
              height={15}
              sx={{ bgcolor: "common.white" }}
            />
          )}

          {product_preview?.price ? (
            <Stack direction="row" alignItems="center" gap="2rem">
              <Button
                variant="rect"
                sx={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 600,
                  fontSize: ".625rem",
                  textTransform: "uppercase",
                }}
              >
                Adicionar ao carrinho
              </Button>

              <Typography
                color="#FFFFFF"
                fontSize="1.125rem"
                fontWeight="900"
                fontFamily="var(--font-noto_serif_jp)"
              >
                R$ {product_preview?.price}
              </Typography>
            </Stack>
          ) : (
            <Skeleton
              variant="rounded"
              width="50%"
              height={29.5}
              sx={{ bgcolor: "common.white" }}
            />
          )}
        </Stack>
      </Stack>
    </Stack>
  )
}
