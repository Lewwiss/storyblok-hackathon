import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

const handler = NextAuth({
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        Credentials({
            name: "Credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, _req) {
                if (!credentials) return null;

                const { username, password } = credentials;

                if (username !== process.env.USERNAME || password !== process.env.PASSWORD) return null;

                return { id: '1', name: 'admin' };
            }
        })
    ],
    pages: {
        signIn: '/',
        signOut: '/',
        error: '/',
    }
});

export { handler as GET, handler as POST };
