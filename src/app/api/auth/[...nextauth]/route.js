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
    async signIn({ account, profile, email, credentials }) {
      try {
        await connectToDB();

        // Check if the user is signing in with Google
        if (account.provider === 'google') {
          // Check if the user already exists
          const existingUser = await User.findOne({ email: email });
          if (existingUser) {
            // User exists, proceed with sign-in
            return true;
          } else {
            // User doesn't exist, create a new user document
            await User.create({
              email: email,
              // For Google sign-in, use the email as username
              username: email,
              // You may also save other profile information if needed
              // image: profile.picture,
            });
            return true;
          }
        } else {
          // Signing in with username and password
          // Here you can add your own logic to validate credentials
          // For simplicity, let's assume username and password are valid
          const { username, password } = credentials;

          // Basic validation for username and password
          if (!username || !password) {
            // Username or password is missing
            return false;
          }

          // Check if the user exists with the provided username
          const existingUser = await User.findOne({ username: username });
          if (!existingUser) {
            // User doesn't exist, create a new user document
            await User.create({
              username: username,
              password: password, // Remember to hash the password in production
              // You may also save other profile information if needed
            });
            return true;
          }

          // Check if the provided password matches the stored password
          // You may use a library like bcrypt for secure password hashing and comparison
          // For simplicity, we're comparing plaintext passwords
          if (existingUser.password !== password) {
            // Incorrect password
            return false;
          }

          // Username and password are valid, proceed with sign-in
          return true;
        }
      } catch (error) {
        console.error("Error while signing in:", error);
        return false;
      }
    }
    ,
    async signOut({ redirect }) {
      return signOut({ redirect });
    },
  }
})

export { handler as GET, handler as POST }