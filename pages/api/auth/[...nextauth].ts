import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  providers: [
    CredentialsProvider({
      type: "credentials",
      credentials: {},
      async authorize(credentials, req) {
        const { username, password } = credentials as {
          username: string,
          password: string
        }
        const res = await fetch("/auth/getUsers", {
          method: 'GET',
        })
        const users = await res.json()
        if (res.ok && users) {
          console.log(users)
          return users
        }
        return null
      }
    })
  ],
  pages: {
    signIn: "/auth/signin",
  },
}

export default NextAuth(authOptions)