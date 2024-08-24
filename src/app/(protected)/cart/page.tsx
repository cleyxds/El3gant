"use client"

import Image from "next/image"

import { useContext, useState } from "react"

import { Text } from "../../../ui/text"

import { CartContext } from "../../../contexts/CartContext"
import { styled } from "@mui/material"

function Counter() {
  const [quantity, setQuantity] = useState(0)

  const minus = () =>
    setQuantity((prev) => {
      if (prev <= 1) {
        alert("Remove item from list?")

        return prev
      }

      return prev - 1
    })
  const plus = () => setQuantity((prev) => prev + 1)

  return (
    <CounterContainer>
      <CounterButton onClick={minus} color="crimson">
        &#x2212;
      </CounterButton>
      <CounterButton onClick={plus} color="green">
        &#x2b;
      </CounterButton>
    </CounterContainer>
  )
}

const CounterContainer = styled("div")`
  display: flex;
  align-items: center;
  gap: 4px;
  border: 0.8px solid #ffffff;
`

const CounterButton = styled("button")`
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-weight: 700;
  font-size: 24px;

  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};

  transition: opacity 0.3s;
  opacity: 1;

  &:hover {
    transition: opacity 0.3s;
    opacity: 0.7;
  }
`

export default function CartPage() {
  const { cartItems } = useContext(CartContext)

  const renderCartItem = (cartItem: any) => {
    const IMAGE = cartItem?.image
    const IMAGE_ALT = "Cart: Image"
    const JEWELRY_NAME = cartItem?.name
    const JEWELRY_PRICE = cartItem?.price

    return (
      <CartCardContainer>
        <CartItemImage src={IMAGE} alt={IMAGE_ALT} />

        <div>
          <JewelryText>{JEWELRY_NAME}</JewelryText>

          <PriceAndCounter>
            <PriceText>R$ {JEWELRY_PRICE}</PriceText>
            <Counter />
          </PriceAndCounter>
        </div>
      </CartCardContainer>
    )
  }

  return (
    <Container>
      <Text>Seu carrinho</Text>

      {cartItems?.map(renderCartItem)}
    </Container>
  )
}

const Container = styled("main")`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: 16px 64px;
`

const CartCardContainer = styled("div")`
  padding: 8px 12px;
  border: 0.8px solid #ffffff;
  display: flex;
  align-items: center;
  gap: 16px;
  align-self: flex-start;
`

const CartItemImage = styled(Image)`
  height: 64px;
  width: 64px;
`

const PriceAndCounter = styled("div")`
  display: flex;
  align-items: center;
  gap: 32px;
`

const JewelryText = styled(Text)`
  font-size: 24px;
  font-weight: 500;
`

const PriceText = styled(Text)`
  font-size: 16px;
  font-weight: 400;
`
