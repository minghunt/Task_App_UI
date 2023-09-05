import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      _id: string,
      name: string,
      email: string,
      age: number,
      createdAt: string,
      updatedAt: string,
      __v: number
      ,
      token: string,
      iat: number,
      exp: number,
      jti: string
    },
    expires: string
  }
}