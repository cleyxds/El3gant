import Image from "next/image"
import Link from "next/link"

import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Box from "@mui/material/Box"

import FooterBackgroundImage from "../assets/footer-background.png"

type Link = {
  name: string
  url: string | null
  disabled?: boolean
} & Record<string, any>

type FooterSectionProps = {
  title: string
  links: Link[]
}

const FOOTER_SECTIONS: FooterSectionProps[] = [
  {
    title: "Empresa",
    links: [
      { name: "Rastreio", url: "/tracking" },
      { name: "Política de envio", url: "/shipping-policy" },
      { name: "Termos de uso", url: "/terms-of-use" },
      { name: "Privacidade", url: "/privacy-terms" },
      { name: "Parcerias", url: "/partnerships" },
    ],
  },
  {
    title: "Entre em contato",
    links: [
      { name: "WhatsApp", url: "https://wa.me", target: "_blank" },
      {
        disabled: true,
        name: "Você encontrará o próximo valor de marketing de sua preferência.",
        url: "/",
      },
    ],
  },
]

export default function Footer() {
  const renderFooterSection = (section: FooterSectionProps) => {
    return (
      <Stack key={section.title} gap="2rem" position="relative" zIndex="1">
        <Typography
          fontFamily="var(--font-poppins)"
          color="#FFFFFF"
          fontSize="1.25rem"
          fontWeight="600"
        >
          {section.title}
        </Typography>

        <Stack gap="1rem">
          {section?.links?.map((link) => {
            const { disabled, name, ...rest } = link

            const customprops = disabled
              ? {
                  width: "43%",
                }
              : { component: Link, href: link.url }

            return (
              <Typography
                key={name}
                color={disabled ? "rgba(255, 255, 255, 0.5)" : "#FFFFFF"}
                fontSize=".875rem"
                fontFamily="var(--font-poppins)"
                fontWeight="300"
                width="100%"
                {...customprops}
                {...rest}
              >
                {name}
              </Typography>
            )
          })}
        </Stack>
      </Stack>
    )
  }

  return (
    <Stack
      component="footer"
      direction="row"
      position="relative"
      alignItems="flex-start"
      justifyContent="center"
      minHeight="4rem"
      margin="10% 0rem 2rem 0rem"
      gap="10%"
    >
      <Box position="absolute" bottom="-2rem" zIndex="1">
        <Image src={FooterBackgroundImage} alt="Footer: Background" />
      </Box>

      {FOOTER_SECTIONS?.map(renderFooterSection)}
    </Stack>
  )
}
