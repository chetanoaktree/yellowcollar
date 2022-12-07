import NextAuth from "next-auth"
import InstagramProvider from "next-auth/providers/instagram";


export const authOptions = {  
  providers: [
    InstagramProvider({
      clientId: process.env.INSTAGRAM_CLIENT_ID,
      clientSecret: process.env.INSTAGRAM_CLIENT_SECRET
    })
  ],
  /*pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },*/
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true
    },
    async redirect({ url, baseUrl }) {
      return baseUrl
    },
    async session(props) { 
      //console.log("props", props)
      let { session, user, token }=props 
      session.accessToken = token;
      session.fasty = 1234;
      return session
    },
    async jwt({ token, user, account, profile, isNewUser }) {      
      return token
    }  
  }
}

export default NextAuth(authOptions)