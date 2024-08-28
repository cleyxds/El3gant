"use client"

import Stack from "@mui/material/Stack"
import Button from "@mui/material/Button"

import PixIcon from "@mui/icons-material/Pix"
import CreditCardIcon from "@mui/icons-material/CreditCard"
import AppleIcon from "@mui/icons-material/Apple"

type PaymentMethodsProps = {
  total: number
}

const handlers = {
  APPLE: async () => {},
  CREDIT_CARD: async () => {},
  PIX: async () => {},
}

const availableMethods = [
  {
    name: "Pix",
    icon: <PixIcon />,
    handler: handlers.PIX,
  },
  {
    name: "Cartão de crédito",
    icon: <CreditCardIcon />,
    handler: handlers.CREDIT_CARD,
  },
  {
    name: "Apple Pay",
    icon: <AppleIcon />,
    handler: handlers.APPLE,
  },
]

export default function PaymentMethods({ total }: PaymentMethodsProps) {
  const onPay = async () => {}

  return (
    <Stack gap="1rem">
      {availableMethods.map(({ name, icon, handler }) => (
        <Button
          key={name}
          startIcon={icon}
          variant="contained"
          color="primary"
          fullWidth
          size="large"
          onClick={handler}
        >
          Pague com {name}
        </Button>
      ))}
    </Stack>
  )
}
