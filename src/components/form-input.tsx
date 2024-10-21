"use client"

import { styled } from "@mui/material"
import TextField from "@mui/material/TextField"

import theme from "@/theme"

export default styled(TextField)(({ error }) => ({
  ".MuiInputLabel-root": {
    color: error ? theme.palette.error.main : "#FFFFFF",
  },

  "& label": {
    color: "#FFFFFF",
  },
  "& label.Mui-focused": {
    color: "#FFFFFF",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "#FFFFFF",
  },
  ".MuiTypography-root": {
    color: error ? theme.palette.error.main : "#FFFFFF",
  },
  "& .MuiOutlinedInput-root": {
    color: "#FFFFFF",

    "& fieldset": {
      borderColor: "#E5E7EA",
    },
    ".MuiTypography-root": {
      color: error ? theme.palette.error.main : "#FFFFFF",
    },
    "&:hover fieldset": {
      borderColor: "#B2BAC2",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#FFFFFF",
    },
  },
}))
