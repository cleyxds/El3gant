type Product = {
  docID?: string
  name: string
  price: number
  title: string
  description?: string
  sub_description?: string
  image_url: string
  image_file?: File
  slug: string
  categories?: string[]
  published?: boolean
  published_at?: FirebaseTimestamp
  published_by?: string
  created_at?: FirebaseTimestamp
  created_by?: string
  layout: Layout
  sizes?: Sizes[]
  size?: string
  stamp?: boolean
}

type Jewelry = Product

type PublishProductProps = {
  productID: string
  published: boolean
}

type ProductSizeTypes = "button" | "icon"
type Sizes = {
  name: string
  type: ProductSizeTypes
}

type Layout =
  | "RIGHT-LEFT"
  | "LEFT-RIGHT-VIEW-MORE"
  | "RIGHT-LEFT-VIEW-MORE"
  | "MULTIPLE-OPTION"
  | "OUR-STORY"
