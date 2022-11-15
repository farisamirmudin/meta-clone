import React from 'react'
import { Message } from '../types'
import { AiOutlineUser } from 'react-icons/ai'

type Props = {
  message: Message
}
function MessageComponent({ message }: Props) {
  const isUser = true
  return (
    <div className={`flex items-start w-fit max-w-2xl xl:max-w-4xl ${isUser && 'ml-auto'}`}>
      <div className={`rounded-full bg-gray-100 p-2 ${isUser && 'order-2'}`}>
        <AiOutlineUser className='text-2xl'/>
      </div>
      <div>
        <p className={`text-[0.7rem] ${isUser ? 'text-blue-500 text-right' : 'text-red-400'}`}>{message.username}</p>
        <div className="flex items-end gap-2">
          <div className={`px-4 py-1 text-white ${isUser ? 'bg-blue-500 order-2' : 'bg-red-400'} rounded-lg`}>
          <p>{message.message}</p>
          </div>
          
          <p className={`text-sm italic text-gray-400 ${isUser && 'text-right'}`} >{new Date(message.createdAt).toLocaleString()}</p>
        </div>
      </div>
      
    </div>
  )
}

export default MessageComponent
