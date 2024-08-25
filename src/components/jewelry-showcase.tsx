import { SVGProps } from "react"

import Link from "next/link"
import Image, { StaticImageData } from "next/image"

import Box from "@mui/material/Box"
import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import IconButton from "@mui/material/IconButton"

import TikTokLogo from "../assets/icons/tiktok"
import InstagramLogo from "../assets/icons/instagram"

type Socials = {
  name: string
  url: string
  icon: (props: SVGProps<SVGSVGElement>) => JSX.Element
}
function Socials() {
  const renderSocial = (social: Socials) => {
    const SOCIAL_NAME = social.name
    const SOCIAL_URL = social.url

    const Icon = social.icon

    return (
      <IconButton
        key={SOCIAL_NAME}
        target="_blank"
        aria-label={SOCIAL_NAME}
        href={SOCIAL_URL}
        LinkComponent={Link}
      >
        <Icon width={24} height={24} fill="#FFFFFF" />
      </IconButton>
    )
  }

  const socials: Socials[] = [
    {
      name: "Instagram",
      url: "https://instagram.com/el3gant.jewelry",
      icon: InstagramLogo,
    },
    {
      name: "TikTok",
      url: "https://tiktok.com/@el3gant.jewelry",
      icon: TikTokLogo,
    },
  ]

  return (
    <Stack gap="0.5rem" position="absolute" right="0" bottom="30%">
      {socials?.map(renderSocial)}
    </Stack>
  )
}

function Explore() {
  return (
    <Box position="absolute" top={0} left={0}>
      <Stack
        width="6.25rem"
        height="6.25rem"
        border="1px dashed #ffffff"
        borderRadius="9999px"
        justifyContent="center"
        alignItems="center"
      >
        <Typography
          variant="h6"
          component={Link}
          href="/explore"
          color="#ffffff"
          sx={{
            textDecoration: "underline",
          }}
        >
          Explorar
        </Typography>
      </Stack>
    </Box>
  )
}

type JewelryShowcaseProps = {
  showcaseUrl: string | StaticImageData
}
export default function JewelryShowcase({ showcaseUrl }: JewelryShowcaseProps) {
  if (!showcaseUrl) return null

  return (
    <Box position="absolute" right="calc(4rem * 2)" top="12%" zIndex={1}>
      <Socials />

      <Image src={showcaseUrl} alt="Jewelry: Showcase" />

      <Explore />
    </Box>
  )
}
