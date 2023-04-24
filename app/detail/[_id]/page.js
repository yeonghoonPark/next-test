import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import DetailCard from "./DetailCard";

export default async function DetailPage(props) {
  const db = (await connectDB).db("next-test");
  const data = await db
    .collection("notice")
    .findOne({ _id: new ObjectId(props.params._id) });

  return (
    <div className='container detail-page'>
      <h1 className='page-title'>Detail</h1>
      <div className='card-container'>
        <DetailCard data={data} />
      </div>
    </div>
  );
}
