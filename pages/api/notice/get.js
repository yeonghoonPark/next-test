import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const db = (await connectDB).db("next-test");
    const result = await db.collection("notice").find().toArray();

    res.status(200).json({ success: true, data: result });
  }
}
