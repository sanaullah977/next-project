import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { getMongoClient } from "@/lib/mongoConnect";
import bcrypt from "bcryptjs";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required!");
        }
        const client = await getMongoClient();
        const db = client.db("project");
        console.log('credentials',credentials)
        
       
        const user = await db.collection("users").findOne({});
        console.log('user',user)
        if (!user) throw new Error("No user found with this email!");

       
        const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordCorrect) throw new Error("Invalid password!");

        return { id: user._id, name: user.name, email: user.email, image: user.image };
      },
    }),
  ],

  
  callbacks: {
    async signIn({ user, account }) {
     
      if (account.provider === "google") {
        try {
          const client = await getMongoClient();
          const db = client.db("NextEvent");

          
          const existingUser = await db.collection("users").findOne({ email: user.email });

          if (!existingUser) {
          
            await db.collection("users").insertOne({
              name: user.name,
              email: user.email,
              image: user.image,
              role: "user",
              createdAt: new Date(),
            });
          } else {
            
            await db.collection("users").updateOne(
              { email: user.email },
              { $set: { lastLogin: new Date() } }
            );
          }
        } catch (error) {
          console.log("Error saving user to DB:", error);
          return false; 
        }
      }
      return true; 
    },
    
    
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
      }
      return session;
    }
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: { signIn: "/login" },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };