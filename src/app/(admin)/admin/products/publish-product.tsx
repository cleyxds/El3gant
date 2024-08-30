"use client"

import { useMutation } from "@tanstack/react-query"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import Typography from "@mui/material/Typography"
import Divider from "@mui/material/Divider"
import CircularProgress from "@mui/material/CircularProgress"
import { red, blue } from "@mui/material/colors"

import PublishIcon from "@mui/icons-material/Publish"
import UnpublishedIcon from "@mui/icons-material/Unpublished"

import { onTogglePublish } from "@/app/actions/product"

export default function PublishProduct(product: Product) {
  const publish = useMutation({
    mutationFn: (data: PublishProductProps) =>
      onTogglePublish(data.productID, data.published),
  })

  const isPublished = product.published

  if (!product.docID) return null

  return (
    <Stack
      key={product.docID}
      gap="1rem"
      direction="row"
      alignItems="center"
      padding="0.5rem"
      border="2px solid #FFFFFF"
    >
      <Stack minWidth="20%">
        {!isPublished ? (
          <Button
            variant="rect"
            startIcon={
              publish.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <PublishIcon />
              )
            }
            onClick={() =>
              publish.mutate({
                productID: product.docID!,
                published: true,
              })
            }
            sx={{
              color: "#FFFFFF",
              fontFamily: "var(--font-poppins)",
              backgroundColor: blue[700],

              "&:hover": {
                backgroundColor: blue[900],
              },
            }}
          >
            Publicar
          </Button>
        ) : (
          <Button
            variant="rect"
            startIcon={
              publish.isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <UnpublishedIcon />
              )
            }
            onClick={() =>
              publish.mutate({
                productID: product.docID!,
                published: false,
              })
            }
            sx={{
              color: "#FFFFFF",
              fontFamily: "var(--font-poppins)",
              backgroundColor: red[700],

              "&:hover": {
                backgroundColor: red[900],
              },
            }}
          >
            Despublicar
          </Button>
        )}
      </Stack>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ backgroundColor: "#FFFFFF" }}
      />

      <Typography variant="subtitle1" color="#FFFFFF">
        {product.name}
      </Typography>
    </Stack>
  )
}
