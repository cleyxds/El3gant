import { Header } from "./components/header"
import { GetStartedSection } from "./components/sections/GetStarted"
import { SellCard } from "./components/SellCard"

export default function Home() {
  return (
    <main>
      <Header />

      <GetStartedSection />

      <SellCard />
      <SellCard type="RIGHT-LEFT" />
      <SellCard type="RIGHT-LEFT" />
    </main>
  )
}
