import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";

import EditForm from "./EditForm";

export default async function EditPage(props) {
  const session = await getServerSession(authOptions);
  console.log("EditPage컴포넌트 session", session);

  const db = (await connectDB).db("next-test");
  const data = await db
    .collection("notice")
    .findOne({ _id: new ObjectId(props.params._id) });

  return (
    <div className='container edit-page'>
      <h1 className='page-title'>Edit</h1>
      <EditForm data={data} session={session} />
    </div>
  );
}
