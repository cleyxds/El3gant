import Container from "@mui/material/Container"

import Header from "../components/header"
import Footer from "../components/footer"
import GetStartedSection from "../components/sections/get-started"
import JewelryCard from "../components/jewelry-card"

import { getHomepageJewelries } from "./actions/jewelry"

export default async function Home() {
  const jewelries = await getHomepageJewelries()

  return (
    <Container>
      <Header />

      <GetStartedSection />

      {jewelries.map((jewelry) => (
        <JewelryCard key={jewelry.docID} data={jewelry} />
      ))}

      <Footer />
    </Container>
  )
}
