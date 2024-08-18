import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"


export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        console.log("Check credentials ", credentials);

        let user = null
        // user = {
        //   _id: "string",
        //   username: "string",
        //   email: "string",
        //   isVerify: "boolean",
        //   type: "string",
        //   role: "string",
        // }

        if (!user) {
          throw new Error("User not found.")
        }

        return user
      },
    }),

  ],
  pages: {
    signIn: "/auth/login",
  },
})