import type { NextApiRequest, NextApiResponse } from "next";
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const { MONGODB_URI } = process.env;

type Data = {
  doc: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const client = await MongoClient.connect(MONGODB_URI!);
  const db = client.db("blog_test");
  const collection = db.collection("blog_posts");
  const documentId = "63f7c91cc5555cc68fd9c56e";
  const currentDate = new Date().toISOString();
  console.log("current date", currentDate);
  const updatedDoc = await collection.findOneAndUpdate(
    { _id: new ObjectId(documentId) },
    { $set: { title: "My Doc", content: currentDate } },
    { returnDocument: "after" }
  );
  client.close();
  res.status(200).json({ doc: updatedDoc });
}
