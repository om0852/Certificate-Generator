import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { signOut } from 'next-auth/react';


import User from '@/app/models/users';
import { connectToDB } from '@/app/utils/database';

const handleSignOut = async (req, res) => {
  try {
    await signOut({ redirect: { destination: '/logout', permanent: false }, req });
    res.status(302).end();
  } catch (error) {
    console.error('Error signing out:', error);
    res.status(500).json({ error: 'An error occurred while signing out' });
  }
};

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  ],
  callbacks: {
    async session({ session }) {
      // store the user id from MongoDB to session
      const sessionUser = await User.findOne({ email: session.user.email });
      session.user.id = sessionUser._id.toString();

      return session;
    },
    async signIn({ account, profile, user, credentials }) {
      try {
        await connectToDB();

        // check if user already exists
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new document and save user in MongoDB
        if (!userExists) {
          await User.create({
            email: profile.email,
            username: profile.name.replace(" ", "").toLowerCase(),
            image: profile.picture,
          })
        }

        return true
      } catch (error) {
        console.log("Error checking if user exists: ", error.message);
        return false
      }
    },
    async signOut({ redirect }) {
      return signOut({ redirect });
    },
  }
})

export { handler as GET, handler as POST }