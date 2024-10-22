type Address = {
  docID?: string
  userID: string
  street: string
  country: string
  city: string
  number: string
  state: string
  zip_code: string
  type: "billing" | "shipping"
  owner_name: string
  owner_phone: string
  created_at?: FirebaseTimestamp
  updated_at?: FirebaseTimestamp
}
