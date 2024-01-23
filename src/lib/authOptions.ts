import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongoClient";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
    secret: process.env.AUTH_SECRET,
    providers: [
      GoogleProvider({
          clientId: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
      })
    ],
    adapter: MongoDBAdapter(clientPromise),
}