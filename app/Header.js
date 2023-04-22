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
          <LinkBtn href={"/"}>Notice</LinkBtn>
          {session && <LinkBtn href={"/"}>Write</LinkBtn>}
        </div>
        <div className='right-menu'>
          <SignBtn session={session} />
          <LinkBtn href={"/signup"}>SignUp</LinkBtn>
        </div>
      </nav>
    </header>
  );
}
