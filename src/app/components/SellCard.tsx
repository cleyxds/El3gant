"use client"

import Image from "next/image"

import styled from "styled-components"

import { Text } from "../ui/text"

import RingTwo from "../assets/ring2.png"
import { Button } from "../ui/button"

type CardType = "LEFT-RIGHT" | "RIGHT-LEFT"
type SellCard = {
  type?: CardType
}
export function SellCard({ type = "LEFT-RIGHT" }: SellCard) {
  if (type !== "LEFT-RIGHT") return null

  return (
    <Container id="joias">
      <Image src={RingTwo} alt="Jewelry: Ring 2" />

      <InformationContainer>
        <CardTitle>Pikup: Anel de designer em prata esterlina</CardTitle>

        <CounterTitle>
          Lorem ipsum dolor sit amet. Qui consequatur sint 33 voluptatem officia
          et sint laboriosam sed ipsa sint ut voluptatum labore et possimus
          voluptas. Vel vitae temporibus sit nulla consequatur in illo galisum
          eo
        </CounterTitle>

        <Actions>
          <GetStartedButton>Adicionar ao carrinho</GetStartedButton>

          <PlayVideoText>R$ 549,29</PlayVideoText>
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
