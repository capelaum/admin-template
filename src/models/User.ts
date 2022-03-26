export interface User {
  uid: string
  email: string | null
  name: string | null
  token: string
  provider: string | null
  photoURL: string | null
}
