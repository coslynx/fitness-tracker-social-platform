import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import clientPromise from '../utils/mongodb';
import { hash } from 'bcryptjs';

export default NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    Providers.Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your-email@example.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const res = await fetch(`${process.env.NEXTAUTH_URL}/api/auth`, {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' }
        });

        const user = await res.json();

        if (res.ok && user) {
          return user;
        } else {
          throw new Error(user.message || 'Login failed.');
        }
      }
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  pages: {
    signIn: '/login',
    signOut: '/api/auth/logout',
    error: '/api/auth/error',
    verifyRequest: '/api/auth/verify-request',
    newUser: null // Will disable the new account creation screen
  },
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;

      return session;
    },
    async signIn({ user, account, profile }) {
      if (account.provider === 'credentials') {
        // Hash password if needed
        const password = profile.password ? await hash(profile.password, 10) : null;
        // Save password to the user object
        user.password = password;
      }
      return true;
    }
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  database: process.env.DATABASE_URL,
});