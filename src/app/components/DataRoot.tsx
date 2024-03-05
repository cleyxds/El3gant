import { ReactNode } from "react"

import { UserContextProvider } from "../contexts/UserContext"
import { CartContextProvider } from "../contexts/CartContext"

import StyledComponentsRegistry from "../lib/registry"

export function DataRoot({ children }: { children: ReactNode }) {
  return (
    <StyledComponentsRegistry>
      <UserContextProvider>
        <CartContextProvider>{children}</CartContextProvider>
      </UserContextProvider>
    </StyledComponentsRegistry>
  )
}
