import { Header } from "./components/header"
import { GetStartedSection } from "./components/sections/GetStarted"
import { JewelryCard } from "./components/JewelryCard"

export default function Home() {
  return (
    <main>
      <Header />

      <GetStartedSection />

      <JewelryCard />
      <JewelryCard type="RIGHT-LEFT" />
      <JewelryCard type="RIGHT-LEFT" />
    </main>
  )
}
