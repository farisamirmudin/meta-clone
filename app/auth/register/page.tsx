'use client'
import React, { useState } from 'react'
import { User } from '../../../types'
import { v4 as uuid } from 'uuid'
import { redirect } from 'next/dist/server/api-utils'


const RegisterPage = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  })

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setInput(prev => ({...prev, [name]: value}))
  }

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()

    const user: User = {
      id: uuid(),
      createdAt: Date.now(),
      username: input.username,
      password: input.password
    }

    const res = await fetch('/api/addUser', {
        method: 'POST',
        body: JSON.stringify({user}),
        headers: {'Content-Type': 'application/json'}
    })
    const data = await res.json()
    if (res.ok) {
      console.log(data)
    } 
  }

  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md">
      <form onSubmit={handleSubmit}>
        <div className="htmlForm-group mb-6">
          <input type="input" name="username" value={input.username} onChange={handleChange} className="htmlForm-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="username"
            placeholder="Username" />
        </div>
        <div className="htmlForm-group mb-6">
          <input type="password" name="password" value={input.password} onChange={handleChange} className="htmlForm-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="password"
            placeholder="Password" />
        </div>
        
        <button type="submit" className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out" >Sign up</button>
      </form>
    </div>
  )
}

export default RegisterPage