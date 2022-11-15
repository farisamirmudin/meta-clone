import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../redis";
import { Message } from "../../types";

type Data = {
  messages: Message[]
}
type errorData = {
  error: string
}
export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse<Data | errorData>
  ) {
    const messagesRes = await client.hvals('messages')
    const messages: Message[] = messagesRes.map(message => JSON.parse(message)).sort((a, b) => b.createdAt - a.createdAt)

    res.status(200).json({messages})
}