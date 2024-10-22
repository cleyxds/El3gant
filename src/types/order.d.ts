type Order = {
  docID?: string
  userID: string
  orderID: string
  price: number
  status: string
  placed_at: FirebaseTimestamp
  created_at?: FirebaseTimestamp
  updated_at?: FirebaseTimestamp
}
