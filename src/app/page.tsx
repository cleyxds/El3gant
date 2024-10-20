import Container from "@mui/material/Container"

import Header from "@/components/header"
import Footer from "@/components/footer"
import GetStartedSection from "@/components/sections/get-started"
import JewelryCards from "@/components/jewelry-cards"

import { getHomepageJewelries } from "@/app/actions/jewelry"

export default async function Home() {
  const jewelries = await getHomepageJewelries()

  return (
    <Container>
      <Header />

      <GetStartedSection />

      <JewelryCards data={jewelries} />

      <Footer />
    </Container>
  )
}
