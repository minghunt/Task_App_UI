import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { Login, Register_api } from "@/api";
const handler=NextAuth({
  // Configure one or more authentication providers

  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_ID as string,
        clientSecret: process.env.GOOGLE_SECRET as string, 
        }),
    // ...add more providers here 

    CredentialsProvider({
      name: "Credentials",
     
      credentials: {
        email: { label: "Username", type: "text"},
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        console.log(credentials);
        let data:any=await Login(credentials?.email,credentials?.password)
        console.log(data)

        let user={
          ...data.user,
          token:data.token
        }
        if (user) {
          // Any object returned will be saved in `user` property of the JWT
          return user
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          throw new Error("No user Found with Email Please Sign Up...!")
  
        }
      }
    })
  ],secret: process.env.NEXT_PUBLIC_SECRET,
  callbacks:{
    async jwt({token,user}:any) {
      return {...token,...user}
    },
    async session({session, token,user}:any) {
      session.user=token
      if (session.user.token===undefined){
        let res=await Login(token.email,token.email)
      session.user.token=res.token}
      return session
    },
    async signIn({user,profile}:any){
      if (user?.token)
        return true
      let newUser={
        username:profile?.name,
        email:profile?.email,
        password:profile?.email}
        await Register_api(newUser)
        return true
      }
  }
})
export {handler as GET, handler as POST}