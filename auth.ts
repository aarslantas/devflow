import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

import { IAccountDoc } from "./database/account.model";
import { api } from "./lib/api";
import { ActionResponse } from "./types/global";

// We'll check if the sign-in account type is credantials, if yes, then we 'll handle it the other way  around when doing email password-based authentication

// But if account type is not credentials, we'll call this new 'signin-with-oauth' app abd create oAuth accounts

export const { handlers, signIn, signOut, auth } =
  NextAuth({
    providers: [GitHub, Google],
    pages: {
      signIn: "/sign-in",
    },
    callbacks: {
      // async session({ session, token }) {
      //   session.user.id = token.sub as string;
      //   return session;
      // },
      // async jwt({ token, account }) {
      //   if (account) {
      //     const {
      //       data: existingAccount,
      //       success,
      //     } = (await api.accounts.getByProvider(
      //       account.type === "credentials"
      //         ? token.email!
      //         : account.providerAccountId
      //     )) as ActionResponse<IAccountDoc>;

      //     if (!success || !existingAccount) {
      //       return token;
      //     }

      //     const userId = existingAccount.userId;

      //     if (userId) {
      //       token.sub = userId.toString();
      //     }
      //   }
      //   return token;
      // },
      async signIn({ user, profile, account }) {
        if (account?.type === "credentials") {
          return true;
        }
        if (!account || !user) {
          return false;
        }

        const userInfo = {
          name: user.name,
          email: user.email,
          image: user.image,
          username:
            account.provider === "github"
              ? (profile?.login as string)
              : (user.name?.toLowerCase() as string),
        };

        console.log("userInfo", userInfo);

        const { success } =
          (await api.auth.oAuthSignIn({
            user: userInfo,
            provider: account.provider as
              | "github"
              | "google",
            providerAccountId:
              account.id as string,
          })) as ActionResponse;

        if (!success) {
          return false;
        }

        return true;
      },
    },
  });
