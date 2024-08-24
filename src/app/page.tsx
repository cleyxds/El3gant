import Container from "@mui/material/Container"
import Header from "../components/header"
import Footer from "../components/footer"
import { GetStartedSection } from "../components/sections/GetStarted"
import { JewelryCard } from "../components/landing/jewelry-card"

export default function Home() {
  return (
    <Container>
      <Header />

      {/* <GetStartedSection />

      <JewelryCard />
      <JewelryCard type="RIGHT-LEFT" />
      <JewelryCard type="RIGHT-LEFT" />

      <Footer /> */}
    </Container>
  )
}
