import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import DetailCard from "./DetailCard";

export default async function DetailPage(props) {
  const session = await getServerSession(authOptions);
  console.log("DetailPage컴포넌트 session = ", session);
  const db = (await connectDB).db("next-test");
  const data = await db
    .collection("notice")
    .findOne({ _id: new ObjectId(props.params._id) });

  return (
    <div className='container detail-page'>
      <h1 className='page-title'>Detail</h1>
      <div className='card-container'>
        <DetailCard data={data} session={session} />
      </div>
    </div>
  );
}
