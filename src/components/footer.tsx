"use client"

import Image from "next/image"

import styled from "styled-components"

import { Text } from "../ui/text"

import FooterBackgroundImage from "../assets/footer-background.png"
import Link from "next/link"

type Link = {
  name: string
  url: string | null
  disabled?: boolean
}

type FooterSectionProps = {
  title: string
  links: Link[]
}

const FOOTER_SECTIONS: FooterSectionProps[] = [
  {
    title: "Empresa",
    links: [
      { name: "Termos de uso", url: "/terms-of-use" },
      { name: "Termos de privacidade", url: "/privacy-terms" },
    ],
  },
  {
    title: "Entre em contato",
    links: [
      {
        disabled: true,
        name: "Você encontrará o próximo valor de marketing de sua preferência.",
        url: null,
      },
    ],
  },
]

export default function Footer() {
  const renderFooterSection = (section: FooterSectionProps) => {
    return (
      <FooterSectionContainer>
        <FooterSectionTitle>{section.title}</FooterSectionTitle>

        <FooterSectionOptionsContainer>
          {section?.links?.map((link) => {
            const DISABLED = link?.disabled
            const props = DISABLED ? {} : { as: Link, href: link.url }

            return (
              <FooterSectionText {...props}>{link?.name}</FooterSectionText>
            )
          })}
        </FooterSectionOptionsContainer>
      </FooterSectionContainer>
    )
  }

  return (
    <FooterContainer>
      <FooterBackground>
        <Image src={FooterBackgroundImage} alt="Footer: Background" />
      </FooterBackground>

      {FOOTER_SECTIONS?.map(renderFooterSection)}
    </FooterContainer>
  )
}

const FooterContainer = styled.footer`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: flex-start;

  min-height: 64px;
  margin: 10% 0px 16px 0px;
  gap: 10%;
`

const FooterSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`

const FooterSectionOptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

const FooterBackground = styled.div`
  position: absolute;
  bottom: -16px;
  z-index: -1;
`

const FooterSectionTitle = styled(Text)`
  font-size: 18px;
  font-weight: 600;
`

const FooterSectionText = styled(Text)`
  font-size: 14px;
  font-weight: 400;
  width: 100%;
`
