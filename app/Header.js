import LinkBtn from "./components/header/LinkBtn";
import SignBtn from "./components/header/SignBtn";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Header() {
  const session = await getServerSession(authOptions);
  console.log("Header컴포넌트 session = ", session);

  return (
    <header>
      <nav>
        <div className='left-menu'>
          <LinkBtn href={"/"}>Logo</LinkBtn>
          <LinkBtn href={"/notice"}>Notice</LinkBtn>
          {session && <LinkBtn href={"/write"}>Write</LinkBtn>}
        </div>
        <div className='right-menu'>
          {session && (
            <span style={{ marginRight: "1rem" }}>{session.user.email}</span>
          )}
          <SignBtn session={session} />
          <LinkBtn href='/signup'>SignUp</LinkBtn>
        </div>
      </nav>
    </header>
  );
}
