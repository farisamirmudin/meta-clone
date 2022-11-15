'use client'
import React, { useState } from 'react'
import { Message } from '../types'
import { v4 as uuid } from 'uuid'
import useSWR, {useSWRConfig} from 'swr'
import fetcher from '../utils/fetcher'

function ChatField() {
  const [input, setInput] = useState("")
  const {mutate} = useSWRConfig()
  const {data: messages} = useSWR<Message[]>("/api/getMessages", fetcher)
  const submitMessage = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const id = uuid()
    const message: Message = {
      id,
      message: input,
      createdAt: Date.now(),
      username: "Meta Bot",
      profilePic: "https://links.papareact.com/jne",
      email: "f@f.com"
    }
    setInput("")
    const uploadmessageToUpstash = () => 
    fetch("/api/submitMessage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({message})
    })
    const updatedMessages = [message, ...messages!]
    const option = { optimisticData: updatedMessages, rollbackOnError: true }
    await uploadmessageToUpstash()
    mutate("/api/getMessages", updatedMessages, option)
  }
  return (
    <div>
      <form
        onSubmit={submitMessage}
        className='flex gap-2 px-10 py-6 fixed bottom-0 w-full border-t border-gray-100 bg-white'
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)} placeholder='Enter message here...'
          className='flex-1 indent-2 border rounded focus:border-blue-400'
        />
        <button disabled={!input} className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50 disabled:cursor-not-allowed'>Send</button>
      </form>
    </div>
  )
}

export default ChatField