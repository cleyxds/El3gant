"use client"

import Link from "next/link"
import Image, { StaticImageData } from "next/image"

import styled from "styled-components"

import { Text } from "../ui/text"

import Logo from "../assets/Logo.png"

type Socials = { name: string; url: string }
function Socials() {
  const renderSocial = (social: Socials) => {
    const SOCIAL_NAME = social.name
    const SOCIAL_URL = social.url

    const ALT = `Social: ${SOCIAL_NAME}`

    return (
      <a key={SOCIAL_NAME} target="_blank" href={SOCIAL_URL}>
        <Image src={Logo} alt={ALT} width={24} height={24} />
      </a>
    )
  }

  const socials: Socials[] = [
    {
      name: "X",
      url: "https://x.com",
    },
    {
      name: "Instagram",
      url: "https://instagram.com",
    },
    {
      name: "Facebook",
      url: "https://facebook.com",
    },
    {
      name: "LinkedIn",
      url: "https://linkedin.com",
    },
  ]

  return <SocialsContainer>{socials?.map(renderSocial)}</SocialsContainer>
}

function Explore() {
  return (
    <CircleContainer>
      <Circle>
        <ExploreText href="/explore">Explorar</ExploreText>
      </Circle>
    </CircleContainer>
  )
}

type JewelryShowcaseProps = {
  showcaseUrl: string | StaticImageData
}
export function JewelryShowcase({ showcaseUrl }: JewelryShowcaseProps) {
  if (!showcaseUrl) return null

  return (
    <Container>
      <Socials />

      <Image src={showcaseUrl} alt="Jewelry: Showcase" />

      <Explore />
    </Container>
  )
}

const SocialsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  position: absolute;
  right: 0px;
  bottom: 30%;
`

const Container = styled.div`
  position: absolute;
  right: calc(64px * 2);
  top: 12%;
  z-index: 1;
`

const CircleContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`

const Circle = styled.div`
  width: 100px;
  height: 100px;
  border: 0.8px dashed #ffffff;
  border-radius: 9999px;

  display: flex;
  justify-content: center;
  align-items: center;
`

const ExploreText = styled(Text).attrs({ as: Link })`
  font-size: 16px;
  text-decoration: underline;
`
