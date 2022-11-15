import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../redis";
import { User } from "../../types";

type Data = {
  user: User
}
type errorData = {
  error: string
}
export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse<Data | errorData>
  ) {
    const { user }= req.body
    const newUser = {
      ...user,
      createdAt: Date.now()
    }

    await client.hset("users", newUser.id, JSON.stringify(newUser))

    res.status(200).json({user: newUser})
}