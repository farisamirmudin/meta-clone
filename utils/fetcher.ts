import { Message } from "../types"

async function fetcher(url: string): Promise<Message[]> {
  const res = await fetch(url)
  const data = await res.json()
  return data.messages
}

export default fetcher