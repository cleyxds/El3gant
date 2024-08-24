"use client"

import { ReactNode, createContext, useState } from "react"

type User = {
  name?: string | undefined | null
}

type UserContextProvider = {
  authenticateUser: (userName: string) => void
  user: User | null
  isAuthenticated: boolean
}

export const UserContext = createContext<UserContextProvider>(
  {} as UserContextProvider
)

export function UserContextProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  function authenticateUser(userName: string) {
    setUser((prev) => ({ ...prev, name: userName }))
    setIsAuthenticated(true)
  }

  return (
    <UserContext.Provider
      value={{
        authenticateUser,
        user,
        isAuthenticated,
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
