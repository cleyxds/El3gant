"use client"

import { alpha, styled } from "@mui/material"
import Typography from "@mui/material/Typography"
import Stack from "@mui/material/Stack"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import IconButton from "@mui/material/IconButton"

import { Option as OptionType } from "./my-account"

import CameraAlt from "@mui/icons-material/CameraAlt"

import theme from "@/theme"
import Logout from "@/components/logout"

export default function Account({
  actions,
  options,
  user,
}: {
  actions: [string, React.Dispatch<string>]
  options: OptionType[]
  user: User
}) {
  const [selectedOption, selectOption] = actions

  return (
    <Stack bgcolor="#F3F5F7" width="16.375rem" px="1rem" py="1.5rem">
      <Stack gap="0.5rem" justifyContent="center" alignItems="center">
        <Stack position="relative">
          <Avatar
            src={user.avatar_url}
            sx={{ width: "5rem", height: "5rem" }}
          />

          <IconButton
            sx={{
              width: "1.875rem",
              height: "1.875rem",
              position: "absolute",
              bottom: "0%",
              right: "0%",
              color: "common.white",
              bgcolor: "common.black",

              "&:hover": {
                bgcolor: alpha(theme.palette.common.black, 0.7),
              },
            }}
          >
            <CameraAlt fontSize="small" color="inherit" />
          </IconButton>
        </Stack>

        <Typography
          fontSize="1.25rem"
          lineHeight="2rem"
          fontFamily="var(--font-poppins)"
          fontWeight="600"
          color="common.black"
        >
          {user.name}
        </Typography>
      </Stack>

      <Stack color="common.black" gap="0.5rem" pt="2rem">
        {options.map((option) => {
          if (option.key === "sign-out") return <Logout user={user} />

          return (
            <Option
              key={option.key}
              selected={selectedOption === option.key}
              onClick={() => selectOption(option.key)}
            >
              {option.name}
            </Option>
          )
        })}
      </Stack>
    </Stack>
  )
}

type OptionProps = {
  selected?: boolean
}
export const Option = styled(Button)<OptionProps>(({ selected }) => ({
  justifyContent: "flex-start",
  minHeight: "2.5rem",
  fontFamily: "var(--font-inter)",
  fontWeight: 600,
  fontSize: "1rem",

  color: selected ? "#141718" : "#6C7275",
  borderBottom: selected ? "2px solid #141718" : "2px solid transparent",
  borderRadius: 0,
}))
