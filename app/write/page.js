import WriteFrom from "./WriteFrom";

import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";

export default async function WritePage() {
  const session = await getServerSession(authOptions);
  console.log("WritePage컴포넌트 session = ", session);

  if (session) {
    return (
      <div className='container write-page'>
        <h1 className='page-title'>Write</h1>
        <WriteFrom author={session.user.name} email={session.user.email} />
      </div>
    );
  } else {
    return (
      <div className='container write-page'>
        <h1 className='page-title'>Write</h1>
        <p style={{ textAlign: "center" }}>로그인 후 이용해주세요</p>
      </div>
    );
  }
}
