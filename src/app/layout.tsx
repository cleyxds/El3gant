import type { Metadata } from "next"

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

import { DataRoot } from "./components/DataRoot"

import "./index.css"
import "./globals.css"

export const metadata: Metadata = {
  title: "3legant3",
  description:
    "3legant3 é um aplicativo de comércio eletrônico que vende joias online",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${poppins.variable} ${noto_serif_jp.variable}`}>
        <DataRoot>{children}</DataRoot>
      </body>
    </html>
  )
}
