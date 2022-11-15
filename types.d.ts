export type Message = {
  id: string,
  message: string,
  createdAt: number,
  username: string,
  profilePic?: string,
  email?: string
}
export type User = {
  id: string,
  createdAt: number,
  username: string,
  password: string,
}