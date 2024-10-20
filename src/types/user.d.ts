type User = {
  docID?: string
  userID: string
  login: string
  name: string
  email: string
  display_name?: string
  avatar_url?: string
  admin?: boolean
  created_at?: FirebaseTimestamp
  updated_at?: FirebaseTimestamp
  deleted_at?: FirebaseTimestamp
  published_at?: FirebaseTimestamp
  published?: boolean
}
