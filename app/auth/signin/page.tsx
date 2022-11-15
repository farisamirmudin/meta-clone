'use client'

import { useState } from "react"
import { signIn } from 'next-auth/react'
import { redirect } from "next/dist/server/api-utils"

const SignInPage = () => {
  const [input, setInput] = useState({
    username: "",
    password: ""
  })
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.target
    setInput(prev => ({...prev, [name]: value}))
  }
  const handleSubmit : React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault()
    const res = await signIn("credentials", {
      username: input.username,
      password: input.password,
      redirect: false
    })
  }


  return (
    <div className="block p-6 rounded-lg shadow-lg bg-white max-w-sm">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-6">
          <label htmlFor="emailField" className="form-label inline-block mb-2 text-gray-700">Username</label>
          <input type="text" name="username" value={input.username} onChange={handleChange} className="form-control
        block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="emailField" placeholder="Username" />
        </div>
        <div className="form-group mb-6">
          <label htmlFor="passwordField" className="form-label inline-block mb-2 text-gray-700">Password</label>
          <input type="password" name="password" value={input.password} onChange={handleChange} className="form-control block
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
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="passwordField"
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
      ease-in-out">Sign in</button>
        <p className="text-gray-800 mt-6 text-center">Not a member? <a href="/auth/register"
          className="text-blue-600 hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Register</a>
        </p>
      </form>
    </div>
  )
}

export default SignInPage