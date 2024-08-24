"use client"

import Image from "next/image"

import { useContext } from "react"

import styled from "styled-components"

import { CartContext } from "../../contexts/CartContext"

import { Text } from "../../ui/text"
import { Button } from "../../ui/button"

import { generateId } from "../../lib/generateId"

import RingTwo from "../../assets/ring2.png"

type CardType = "LEFT-RIGHT" | "RIGHT-LEFT"
type JewelryCard = {
  type?: CardType
}

export function JewelryCard({ type = "LEFT-RIGHT" }: JewelryCard) {
  if (type !== "LEFT-RIGHT") return null

  const { addToCart } = useContext(CartContext)

  const JEWELRY_ID = generateId()
  const JEWELRY_NAME = "Pikup: Anel de designer em prata esterlina"
  const JEWELRY_PRICE = "549.29"
  const NUMBER_JEWELRY_PRICE = Number(JEWELRY_PRICE)

  return (
    <Container id="joias">
      <Image src={RingTwo} alt="Jewelry: Ring 2" />

      <InformationContainer>
        <CardTitle>{JEWELRY_NAME}</CardTitle>

        <CounterTitle>
          Lorem ipsum dolor sit amet. Qui consequatur sint 33 voluptatem officia
          et sint laboriosam sed ipsa sint ut voluptatum labore et possimus
          voluptas. Vel vitae temporibus sit nulla consequatur in illo galisum
          eo
        </CounterTitle>

        <Actions>
          <GetStartedButton
            onClick={() =>
              addToCart({
                id: JEWELRY_ID,
                name: JEWELRY_NAME,
                price: NUMBER_JEWELRY_PRICE,
                image: RingTwo,
              })
            }
          >
            Adicionar ao carrinho
          </GetStartedButton>

          <PlayVideoText>R$ {JEWELRY_PRICE}</PlayVideoText>
        </Actions>
      </InformationContainer>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 7% 64px;
  gap: 64px;
`

const InformationContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  width: 50%;
`

const CardTitle = styled(Text)`
  font-family: var(--font-noto_serif_jp);
  font-size: 51px;
`

const CounterTitle = styled(Text)`
  font-size: 14px;
  width: 80%;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

const GetStartedButton = styled(Button)`
  background-color: #ffffff;
  color: #000000;
  border: 0;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  padding: 12px 3%;
`

const PlayVideoText = styled(Text)`
  font-family: var(--font-noto_serif_jp);
  font-size: 36px;
`
