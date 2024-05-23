import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import axios from "axios";
import process from "next/dist/build/webpack/loaders/resolve-url-loader/lib/postcss";

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        try {
          // Make a POST request to your authentication endpoint
          // const response = await axios.post('http://bcie.spider.ws/public/api/' + 'login', { email: credentials.email, password: credentials.password });
          const response = await axios.post(process.env.NEXT_PUBLIC_API_PATH + 'login', { email: credentials.email, password: credentials.password });

          if (response.data) {
            // console.log('yyy', response);
            const user = {
              name: response?.data?.data?.name,
              email: response?.data?.data?.email,
              phone: response?.data?.data?.phone_number,
              token: response?.data?.data?._token,
              user_id: response.data?.data?.user?.user_id,
              role:response?.data?.data?.role,
            };
            return Promise.resolve(user);
          } else {

            const error = response.data?.message || 'Authentication failed';
            // Redirect to custom login page with error message as query parameter
            throw new Error(error);
          }
        } catch (error) {
          console.log(error);
          // console.error("Error occurred during authentication:", error);
          const errorMessage = error?.response?.data?.message || 'An unexpected error occurred';
          throw new Error(errorMessage);
        }
      },
    }),
  ],

  pages: {
    signIn: '/login',
    // error:'/login'
  },


  secret: process?.env?.NEXTAUTH_SECRET,
  // secret: 'dsasdasdasdasdasd',

  session: {
    jwt: true, // Enable JWT sessions
  },
  callbacks: {
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },
  },
  cookies: {
    secure: process.env.NODE_ENV === 'production', // Set secure flag in production
  },
});