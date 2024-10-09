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
  layout: string
}

type Jewelry = Product

type PublishProductProps = {
  productID: string
  published: boolean
}
