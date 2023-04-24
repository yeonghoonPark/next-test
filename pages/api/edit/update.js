import { connectDB } from "@/util/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  if (req.method === "PUT") {
    const session = await getServerSession(req, res, authOptions);
    const body = await JSON.parse(req.body);
    const db = (await connectDB).db("next-test");

    const obj = {
      title: body.title,
      content: body.content,
    };

    if (body?.role === "admin") {
      const result = await db.collection("notice").updateOne(
        {
          _id: new ObjectId(body._id),
        },
        { $set: obj },
      );

      return res.status(200).json({
        success: true,
        data: "관리자 권한으로 수정이 완료되었습니다.",
      });
    }

    if (session.user.email !== body.email) {
      return res
        .status(200)
        .json({ success: false, data: "작성자만 수정 가능합니다." });
    }

    const result = await db.collection("notice").updateOne(
      {
        _id: new ObjectId(body._id),
      },
      { $set: obj },
    );

    res.status(200).json({ success: true, data: "수정이 완료되었습니다." });
  }
}
