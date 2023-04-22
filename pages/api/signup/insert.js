import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function Handler(req, res) {
  if (req.method === "POST") {
    try {
      const encryptedPassword = await bcrypt.hash(req.body.password, 10);

      req.body.password = encryptedPassword;
      req.body.role = "normal";

      const db = (await connectDB).db("next-test");
      const result = await db.collection("user_cred").insertOne(req.body);

      res.status(200).redirect(302, "/");
    } catch (err) {
      console.error(err);
    }
  }
}
