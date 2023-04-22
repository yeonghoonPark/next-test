import { connectDB } from "@/util/database";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

export const authOptions = {
  providers: [
    // session방식, CredentialsProvider
    CredentialsProvider({
      // 1. signIn() 실행시 폼 자동생성해주는 로직
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      // 2. 로그인 요청시 실행되는 코드
      async authorize(credentials) {
        const db = (await connectDB).db("next-test");
        const user = await db
          .collection("user_cred")
          .findOne({ email: credentials.email });

        if (!user) {
          console.log("해당 유저는 존재하지 않습니다.");
          return null;
        }

        const passwordCheck = await bcrypt.compare(
          credentials.password,
          user.password,
        );

        if (!passwordCheck) {
          console.log("비밀번호가 일치하지 않습니다.");
          return null;
        }
        return user;
      },
    }),

    GithubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),

    // issue = this document requires 'trustedscript' assignment.
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET,
    }),

    // issue = 아이콘을 불러오지 못하고 session이 빈칸으로 들어가는 문제점
    KakaoProvider({
      clientId: process.env.NEXT_PUBLIC_KAKAO_ID,
      clientSecret: process.env.NEXT_PUBLIC_KAKAO_SECRET,
    }),
  ],

  // 3. strategy설정 및 maxAge설정
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60,
  },

  // 4. callback
  callbacks: {
    // jwt생성할 때 실행되는 코드
    // 4-1. user변수는 DB의 유저정보에 담겨있고 token.user에 저장시 jwt에 들어감
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name;
        token.user.email = user.email;
        token.user.role = user.role;
      }
      return token;
    },
    // 4-2. user session이 조회될 때 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },

  // JWT생성시 쓰는 secret Key, JWT방식의 소셜로그인시 signIn, signOut메서드를 이용하려면 꼭 필요하다.
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,

  // mongodb adapter
  adapter: MongoDBAdapter(connectDB),
};

export default NextAuth(authOptions);
