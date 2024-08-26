"use client"

import { createTheme } from "@mui/material/styles"

import { css } from "@mui/material/styles"

import { Poppins, Noto_Serif_JP, Inter } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
})

const noto_serif_jp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto_serif_jp",
  weight: ["900"],
})

const screen = css`
  display: flex;
  flex-direction: column;
  padding: 0;
  padding-left: 1rem !important;
  padding-right: 1rem !important;
  margin: 0;
  min-height: 100vh;
  max-width: 100% !important;
  background-color: #000000;
`

const rect_button = css`
  border-radius: 0;
  color: #000000;
  background-color: #ffffff;
  border-radius: 0;
  font-family: var(--font-inter);
  font-weight: 500;
  font-size: 1.045rem;

  &:hover {
    background-color: rgba(255, 255, 255, 0.9);
  }
`

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
  typography: {
    fontFamily: [
      poppins.style.fontFamily,
      inter.style.fontFamily,
      noto_serif_jp.style.fontFamily,
    ].join(","),
  },
  components: {
    MuiContainer: {
      styleOverrides: {
        root: screen,
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
        },
      },
      variants: [
        {
          props: { variant: "gradient" },
          style: css`
            color: #ffffff;
            background: linear-gradient(45deg, #fe6b8b 30%, #ff8e53 90%);
          `,
        },
        {
          props: { variant: "rect" },
          style: rect_button,
        },
      ],
    },
  },
})

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true
    rect: true
  }
}

export const fontVariants = [
  poppins.variable,
  inter.variable,
  noto_serif_jp.variable,
].join(" ")

export default theme
