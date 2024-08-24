"use client"

import { createTheme } from "@mui/material/styles"

import { css } from "@mui/material/styles"

import { Poppins, Noto_Serif_JP } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
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
`

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#006039",
    },
    secondary: {
      main: "#a37e2c",
    },
  },
  typography: {
    fontFamily: `${poppins.style.fontFamily}, ${noto_serif_jp.style.fontFamily}`,
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
      ],
    },
  },
})

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true
  }
}

export default theme
