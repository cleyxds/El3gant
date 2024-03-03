"use client"

import Link from "next/link"
import Image from "next/image"

import styled from "styled-components"

import { Text } from "../ui/text"
import { Button } from "../ui/button"

import Logo from "../assets/Logo.png"

export function Header() {
  return (
    <HeaderContainer>
      <LogoContainer>
        <Image src={Logo} alt="Jewerly App Logo" />
        <Text as="h1">Jewell</Text>
      </LogoContainer>

      <Wrapper>
        <OptionsContainer>
          <OptionLink href="#início">Início</OptionLink>

          <OptionLink href="#sobre">Sobre</OptionLink>

          <OptionLink href="#joias">Jóias</OptionLink>

          <OptionLink href="/catalogo">Catálogo</OptionLink>

          <Text as="button">
            <Image src={Logo} alt="Jewerly App Logo" width={16} height={16} />
          </Text>
        </OptionsContainer>

        <LogoContainer>
          <LogInButton>Log in</LogInButton>

          <GetStartedButton href="/getstarted">Começar</GetStartedButton>
        </LogoContainer>
      </Wrapper>
    </HeaderContainer>
  )
}

const FRow = styled.div`
  display: flex;
  align-items: center;
`

const HeaderContainer = styled(FRow).attrs({ as: "header" })`
  padding: 16px 64px;
  justify-content: space-between;
  position: sticky;
  top: 0;
  z-index: 2;
  backdrop-filter: blur(8px);
`

const LogoContainer = styled(FRow)`
  gap: 16px;
`

const OptionsContainer = styled(FRow)`
  gap: 32px;
`

const Wrapper = styled(FRow)`
  gap: 96px;
`

const OptionLink = styled(Text).attrs({ as: Link })`
  font-weight: 300;
  font-size: 16px;
`

const LogInButton = styled(Button)`
  font-weight: 600;
  border-color: rgba(255, 255, 255, 0.5);
`

const GetStartedButton = styled(Button).attrs({ as: Link })`
  font-weight: 500;
  background-color: #ffffff;
  color: #000000;
  border: 0;
`
