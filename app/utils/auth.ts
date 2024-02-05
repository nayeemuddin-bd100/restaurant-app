import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { NextAuthOptions, getServerSession } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/app/utils/prismadb";
import { User } from "next-auth";

declare module "next-auth" {
	interface Session {
		user: User & {
			isAdmin: boolean;
		};
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		isAdmin: boolean;
	}
}
export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	// default session strategy is "jwt", although we can declare it.
	session: {
		strategy: "jwt",
	},
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_ID as string,
			clientSecret: process.env.GITHUB_SECRET as string,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],

	callbacks: {
		async session({ session, token }) {
			if (token) {
				session.user.isAdmin = token.isAdmin;
			}
			return session;
		},

		async jwt({ token }) {
			const userInDb = await prisma.user.findUnique({
				where: { email: token.email! },
			});
			token.isAdmin = Boolean(userInDb?.isAdmin);
			return token;
		},
	},
};

export const getAuthSession = () => getServerSession(authOptions);
