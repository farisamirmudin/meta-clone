'use client'
import React, { useEffect } from 'react'
import useSWR, {useSWRConfig} from 'swr'
import { clientPusher } from '../pusher'
import { Message } from '../types'
import fetcher from '../utils/fetcher'
import MessageComponent from './MessageComponent'

type Props = {
  initialMessages: Message[]
}

function MessageField({initialMessages}: Props) {
  const { mutate } = useSWRConfig()
  const {data: messages} = useSWR<Message[]>("/api/getMessages", fetcher)
  useEffect(() => {
    var channel = clientPusher.subscribe('messages')
    channel.bind('new-message', function(data: Message) {
      if (!messages){
        mutate("/api/getMessages")
      } else {
        const updatedMessages = [data, ...messages!]
        const option = { optimisticData: updatedMessages, rollbackOnError: true }
        mutate("/api/getMessages", updatedMessages, option)
      }
    })
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [])
  

  return (
    <div className='px-10 pt-4 pb-28 space-y-4'>
      {(messages || initialMessages).map(message => (
        <MessageComponent key={message.id} message={message} />
      ))}
    </div>
  )
}

export default MessageField