import { connectDB } from "@/util/database";

export default async function handler(req, res) {
  console.log(req.body, "인서트바디");
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("next-test");
      const result = await db
        .collection("notice")
        .insertOne(JSON.parse(req.body));

      res.status(200).json({ success: true, data: JSON.parse(req.body) });
    } catch (err) {
      console.error(err);
    }
  }
}
