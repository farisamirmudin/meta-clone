import type { NextApiRequest, NextApiResponse } from "next";
import client from "../../redis";
import { User } from "../../types";

type Data = {
  users: User[]
}
type errorData = {
  error: string
}
export default async function handler (
  req: NextApiRequest, 
  res: NextApiResponse<Data | errorData>
  ) {
    if(req.method !== "GET"){
      throw new Error("invalid method")
    }
    const usersRes = await client.hvals('users')
    const users: User[] = usersRes.map(user => JSON.parse(user))

    res.status(200).json({users})
}