import NextAuth from "next-auth";
import Email from "next-auth/providers/email";
import Google from "next-auth/providers/google";

const providers = [];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  );
}

if (process.env.EMAIL_SERVER && process.env.EMAIL_FROM) {
  providers.push(
    Email({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM
    })
  );
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  providers,
  pages: {
    signIn: "/login"
  },
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async jwt({ token, profile }) {
      if (profile && "picture" in profile) token.picture = String(profile.picture ?? "");
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.image = (token.picture as string | undefined) ?? session.user.image;
      }
      return session;
    }
  }
});

