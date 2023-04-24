import { connectDB } from "@/util/database";
import NoticeCard from "./NoticeCard";

export default async function NoticePage() {
  const db = (await connectDB).db("next-test");
  const data = await db.collection("notice").find().toArray();

  return (
    <div className='container notice-page'>
      <h1 className='page-title'>Notice</h1>
      <div className='card-container'>
        <NoticeCard data={data} />
      </div>
    </div>
  );
}
