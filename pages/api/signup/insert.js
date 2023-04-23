import { connectDB } from "@/util/database";
import bcrypt from "bcrypt";

export default async function Handler(req, res) {
  if (req.method === "POST") {
    try {
      const db = (await connectDB).db("next-test");
      const userCred = await db.collection("user_cred").find().toArray();
      const users = await db.collection("users").find().toArray();

      const encryptedPassword = await bcrypt.hash(
        JSON.parse(req.body).password,
        10,
      );

      const body = {
        name: JSON.parse(req.body).name,
        email: JSON.parse(req.body).email,
        password: encryptedPassword,
        role: "nomal",
      };

      const checkUserCred = userCred.some((user) => {
        return user?.email === body.email;
      });
      const checkUsers = users.some((user) => {
        return user?.email === body.email;
      });

      if (checkUserCred || checkUsers) {
        return res
          .status(200)
          .json({ success: false, data: "중복 된 아이디입니다." });
      }

      const result = await db.collection("user_cred").insertOne(body);

      res
        .status(200)
        .json({ success: true, data: "회원가입이 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  }
}
