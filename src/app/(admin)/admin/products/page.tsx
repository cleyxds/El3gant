import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import IconButton from "@mui/material/IconButton"

import ChevronLeft from "@mui/icons-material/ChevronLeft"

import Header from "@/components/header"

import { getUserDetails } from "@/app/actions/user"
import { createProduct, getProducts } from "@/app/actions/product"

export default async function AdminProductsPage() {
  const user = await getUserDetails()
  const products = await getProducts(user?.userID)

  const productsText =
    products?.length === 1 ? "produto cadastrado" : "produtos cadastrados"

  return (
    <Container>
      <Header nav={false} />

      <Stack alignItems="flex-start" gap="2rem">
        <IconButton
          LinkComponent={Link}
          href="/admin"
          sx={{
            color: "#000000",
            alignSelf: "flex-start",
            bgcolor: "#FFFFFF",

            "&:hover": {
              bgcolor: "#FFFFFFE5",
            },
          }}
        >
          <ChevronLeft />
        </IconButton>

        <Stack>
          <Typography variant="h4" color="#FFFFFF">
            Gerencie os produtos
          </Typography>

          <Typography variant="h6" color="#FFFFFF">
            <Typography
              component="span"
              variant="h6"
              color="#FFFFFF"
              fontFamily="var(--font-poppins)"
              fontWeight="700"
            >
              {products?.length}{" "}
            </Typography>
            {productsText} por você.
          </Typography>
        </Stack>

        <Stack component="form" gap="1rem" action={createProduct}>
          <TextField
            label="Nome do produto"
            variant="outlined"
            type="text"
            required
            sx={{
              "& label.Mui-focused": {
                color: "#FFFFFF",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "red",
              },
              "& .MuiOutlinedInput-root": {
                color: "#FFFFFF",

                "& fieldset": {
                  borderColor: "#E5E7EA",
                },
                "&:hover fieldset": {
                  borderColor: "#B2BAC2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF",
                },
              },
            }}
          />

          <TextField
            label="Preço"
            variant="outlined"
            type="text"
            required
            sx={{
              "& label.Mui-focused": {
                color: "#FFFFFF",
              },
              "& .MuiInput-underline:after": {
                borderBottomColor: "red",
              },
              "& .MuiOutlinedInput-root": {
                color: "#FFFFFF",

                "& fieldset": {
                  borderColor: "#E5E7EA",
                },
                "&:hover fieldset": {
                  borderColor: "#B2BAC2",
                },
                "&.Mui-focused fieldset": {
                  borderColor: "#FFFFFF",
                },
              },
            }}
          />

          <Button variant="rect" type="submit">
            Adicionar novo produto
          </Button>
        </Stack>
      </Stack>
    </Container>
  )
}
