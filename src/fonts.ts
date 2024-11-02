import { Poppins, Noto_Serif_JP, Inter } from "next/font/google"

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["400", "500", "600"],
})

const noto_serif_jp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto_serif_jp",
  weight: ["700", "900"],
})

// prettier-ignore
const fonts = [poppins.variable, inter.variable, noto_serif_jp.variable].join(" ")

export default fonts
