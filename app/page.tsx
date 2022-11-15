
import React from 'react'
import ChatField from './ChatField'
import MessageField from './MessageField'

async function HomePage() {
  const res = await fetch(`http://localhost:3000/api/getMessages`)
  const data = await res.json()
  return (
    <div>
      <MessageField initialMessages={data.messages}/>
      <ChatField />
    </div>
  )
}

export default HomePage