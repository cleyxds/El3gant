type Product = {
  docID?: string
  name: string
  price: number
  title: string
  description?: string
  sub_description?: string
  image_url: string
  slug: string
  categories?: string[]
  published?: boolean
  created_at?: Date
  published_at?: Date
  created_by?: string
}

type Jewelry = Product
