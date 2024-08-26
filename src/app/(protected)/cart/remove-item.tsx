"use client"

import IconButton from "@mui/material/IconButton"

import DeleteIcon from "@mui/icons-material/Delete"

import { removeQuantityromShoppingCart } from "@/app/actions/shopping-cart"

export default function RemoveShoppingCartItem({
  item,
  quantity = -1,
}: {
  item: ShoppingCart
  quantity?: number
}) {
  return (
    <IconButton
      onClick={() => removeQuantityromShoppingCart(item.docID, quantity)}
      type="submit"
      color="inherit"
      sx={{
        alignSelf: "flex-start",
        backgroundColor: "#FFFFFF",

        "&:hover": {
          backgroundColor: "#FFFFFFE5",
        },
      }}
    >
      <DeleteIcon
        sx={{
          color: "#000000",
        }}
      />
    </IconButton>
  )
}
