import type { Metadata } from "next"

import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter"
import { ThemeProvider } from "@mui/material/styles"
import CssBaseline from "@mui/material/CssBaseline"

import DataRoot from "@/components/data-root"

import ReactQueryProvider from "@/app/react-query-provider"
import Copyright from "@/components/sections/copyright"
import Promotion from "@/components/promotion"

import { APP_NAME } from "@/config"
import theme, { fontVariants } from "../theme"

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
    <html lang="en" className={fontVariants}>
      <body>
        <AppRouterCacheProvider>
          <ReactQueryProvider>
            <DataRoot>
              <ThemeProvider theme={theme}>
                <CssBaseline />

                <Promotion />

                {children}

                <Copyright />
              </ThemeProvider>
            </DataRoot>
          </ReactQueryProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
