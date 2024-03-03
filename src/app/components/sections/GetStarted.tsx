"use client"

import styled from "styled-components"

import Link from "next/link"

import { Text } from "@/app/ui/text"
import { Button } from "@/app/ui/button"

import { JewelryShowcase } from "../JewelryShowcase"

import RingOne from "../../assets/ring1.png"

export function GetStartedSection() {
  return (
    <Container id="início">
      <JewelryShowcase showcaseUrl={RingOne} />

      <SectionTitle>Descubra As Joias Excepcionais Conosco</SectionTitle>

      <CounterTitle>
        Lorem ipsum dolor sit amet. Qui consequatur sint 33 voluptatem officia
        et sint laboriosam sed ipsa sin
      </CounterTitle>

      <Actions>
        <GetStartedButton href="/getstarted">Começar</GetStartedButton>

        <PlayVideoText>Ver vídeo</PlayVideoText>
      </Actions>
    </Container>
  )
}

const Container = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 64px 64px 0 64px;
  gap: 32px;
`

const SectionTitle = styled(Text)`
  font-family: var(--font-noto_serif_jp);
  font-size: 65px;
  width: 53%;
`

const CounterTitle = styled(Text)`
  font-size: 14px;
  width: 43%;
`

const Actions = styled.div`
  display: flex;
  align-items: center;
  gap: 32px;
`

const GetStartedButton = styled(Button).attrs({ as: Link })`
  background-color: #ffffff;
  color: #000000;
  border: 0;
  font-weight: 600;
  font-size: 20px;
  text-transform: uppercase;
  padding: 12px 3%;
`

const PlayVideoText = styled(Text).attrs({ as: "button" })`
  font-weight: 500;
  font-size: 18px;
`
