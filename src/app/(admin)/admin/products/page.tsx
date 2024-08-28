import Link from "next/link"

import Container from "@mui/material/Container"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import IconButton from "@mui/material/IconButton"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"

import ChevronLeft from "@mui/icons-material/ChevronLeft"
import PublishIcon from "@mui/icons-material/Publish"
import UnpublishedIcon from "@mui/icons-material/Unpublished"
import { red, blue } from "@mui/material/colors"

import Header from "@/components/header"

import { getUserDetails } from "@/app/actions/user"
import { getProducts, onTogglePublish } from "@/app/actions/product"

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

        <Stack gap="2rem">
          <Typography variant="h4" color="#FFFFFF">
            Gerencie os produtos
          </Typography>

          <Button
            variant="rect"
            LinkComponent={Link}
            href="products/create"
            sx={{
              alignSelf: "flex-start",
              fontFamily: "var(--font-poppins)",
              fontWeight: 300,
            }}
          >
            Crie um novo produto
          </Button>

          <Stack gap="1rem">
            <Stack gap="1rem" direction="row" alignItems="center">
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

              <Button
                variant="rect"
                LinkComponent={Link}
                href="inventory"
                sx={{
                  alignSelf: "flex-start",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 300,
                }}
              >
                Ver inventário
              </Button>
            </Stack>

            <Stack>
              {products?.map((product) => {
                const isPublished = product.published

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
                        <Stack component="form" action={onTogglePublish}>
                          <Button
                            startIcon={<PublishIcon />}
                            type="submit"
                            variant="rect"
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
                        </Stack>
                      ) : (
                        <Button
                          variant="rect"
                          startIcon={<UnpublishedIcon />}
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
              })}
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  )
}
