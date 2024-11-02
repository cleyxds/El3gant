"use client"

import { createTheme } from "@mui/material/styles"

import { css } from "@mui/material/styles"

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
    fontFamily: "var(--font-poppins)",
  },
  components: {
    MuiContainer: {
      defaultProps: {
        component: "main",
      },
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
    MuiCssBaseline: {
      styleOverrides: (theme) => ({
        html: {
          a: {
            textDecoration: "none",
            color: "inherit",
          },
          [theme.breakpoints.down("sm")]: {
            fontSize: "14px",
          },
          [theme.breakpoints.between("sm", "md")]: {
            fontSize: "15px",
          },
          [theme.breakpoints.between("md", "lg")]: {
            fontSize: "16px",
          },
          [theme.breakpoints.up("lg")]: {
            fontSize: "16px",
          },
        },
      }),
    },
  },
})

declare module "@mui/material/Button" {
  interface ButtonPropsVariantOverrides {
    gradient: true
    rect: true
  }
}

export default theme
