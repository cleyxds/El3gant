import LeftRightViewMoreCard from "./left-right-view-more-card"
import RightLeftViewMoreCard from "./right-left-view-more-card"
import RightLeftCard from "./right-left-card"
import MultipleOptionCard from "./multiple-option-card"
import OurStory from "./our-story"

type CardComponent = (data: Jewelry) => JSX.Element

const types: Record<LayoutCard, CardComponent> = {
  "RIGHT-LEFT": RightLeftCard,
  "LEFT-RIGHT-VIEW-MORE": LeftRightViewMoreCard,
  "RIGHT-LEFT-VIEW-MORE": RightLeftViewMoreCard,
  "MULTIPLE-OPTION": MultipleOptionCard,
  "OUR-STORY": OurStory,
}

export default function JewelryCard({ data: jewelries }: { data: Jewelry[] }) {
  return jewelries.map((jewelry) => {
    const Component = types[jewelry.layout]

    return <Component key={jewelry.docID} {...jewelry} />
  })
}
