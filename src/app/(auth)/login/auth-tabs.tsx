"use client"

import { useState } from "react"

import { styled } from "@mui/material"
import Tabs from "@mui/material/Tabs"
import MUITab from "@mui/material/Tab"
import Box from "@mui/material/Box"

import LogInForm from "@/components/login-form"
import SignInForm from "@/components/signin-form"

interface TabPanelProps {
  children?: React.ReactNode
  index: number
  value: number
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`auth-tabpanel-${index}`}
      aria-labelledby={`auth-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ paddingTop: 3, paddingBottom: 3 }}>{children}</Box>
      )}
    </div>
  )
}

function a11yProps(index: number) {
  return {
    id: `auth-tab-${index}`,
    "aria-controls": `auth-tabpanel-${index}`,
  }
}

export default function AuthTabs() {
  const [value, setValue] = useState(0)

  const handleChangeTab = (_event: React.SyntheticEvent, value: number) => {
    setValue(value)
  }

  return (
    <Box padding="1rem" bgcolor="#FFFFFF" borderRadius="0.2813rem">
      <Box sx={{ borderBottom: 0.8, borderColor: "#E0E0E0" }}>
        <Tabs
          textColor="secondary"
          indicatorColor="secondary"
          value={value}
          onChange={handleChangeTab}
          aria-label="auth-tabs"
        >
          <Tab label="Login" {...a11yProps(0)} />
          <Tab label="Cadastro" {...a11yProps(1)} />
        </Tabs>
      </Box>

      <CustomTabPanel value={value} index={0}>
        <Box padding="0 1rem">
          <LogInForm handleChangeTab={handleChangeTab} />
        </Box>
      </CustomTabPanel>

      <CustomTabPanel value={value} index={1}>
        <Box padding="0 1rem">
          <SignInForm handleChangeTab={handleChangeTab} />
        </Box>
      </CustomTabPanel>
    </Box>
  )
}

const Tab = styled(MUITab)`
  flex: 1;
  text-transform: none;
  font-family: var(--font-poppins);
  font-weight: 600;
  font-size: 0.875rem;
`
