import type { Metadata } from "next"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"

import { APP_NAME } from "@/config"
import theme from "../theme"

import "./page.css"

export const metadata: Metadata = {
  title: APP_NAME,
  description: `${APP_NAME} é um aplicativo de comércio eletrônico de venda de joias online`,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>{children}</ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
