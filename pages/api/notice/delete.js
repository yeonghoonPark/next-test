import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "DELETE") {
    try {
      const session = await getServerSession(req, res, authOptions);
      const body = await JSON.parse(req.body);
      const db = (await connectDB).db("next-test");

      // 관리자인지 유저인지
      if (body?.role === "admin") {
        const result = await db.collection("notice").deleteOne({
          _id: new ObjectId(body._id),
        });
        return res.status(200).json({
          success: true,
          data: "관리자 권한으로 수정이 완료되었습니다.",
        });
      }

      console.log(session.user.email, "세션유저이메일");
      console.log(body.email, "바디이메일");

      // 작성자와 유저가 동일한지
      if (session.user.email !== body.email) {
        return res
          .status(200)
          .json({ success: false, data: "작성자만 삭제 가능합니다." });
      }

      const result = await db.collection("notice").deleteOne({
        _id: new ObjectId(body._id),
      });

      res.status(200).json({ success: true, data: "삭제가 완료되었습니다." });
    } catch (err) {
      console.error(err);
    }
  }
}
