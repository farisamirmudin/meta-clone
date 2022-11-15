import type { NextApiRequest, NextApiResponse } from "next";
import { serverPusher } from "../../pusher";
import client from "../../redis";
import { Message } from "../../types";

type Data = {
  message: Message
}
type errorData = {
  error: string
}
export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse<Data | errorData>
  ) {
    const { message } = req.body
    const newMessage = {
      ...message,
      createdAt: Date.now()
    }

    await client.hset("messages", newMessage.id, JSON.stringify(newMessage))
    serverPusher.trigger("messages", "new-message", {
      message: newMessage
    });
    res.status(200).json({message: newMessage})
}