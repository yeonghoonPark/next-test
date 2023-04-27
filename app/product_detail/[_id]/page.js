import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import ProductDetailCard from "./ProductDetailCard";

export default async function ProductDetail(props) {
  const db = (await connectDB).db("next-test");
  const data = await db
    .collection("product")
    .findOne({ _id: new ObjectId(props.params._id) });

  console.log(data, "데이터");

  return (
    <div className='container product_detail-page'>
      <h1 className='page-title'>Product Detail</h1>
      <div className='card-container'>
        <ProductDetailCard data={data} />
      </div>
    </div>
  );
}
